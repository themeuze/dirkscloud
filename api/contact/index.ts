import type { HttpRequest } from '@azure/functions'
import { EmailClient } from '@azure/communication-email'

type AzureFunctionContext = {
  log: {
    (...args: unknown[]): void
    error: (...args: unknown[]) => void
  }
  res?: {
    status?: number
    headers?: Record<string, string>
    body?: unknown
  }
}

type ContactBody = {
  name?: string
  email?: string
  subject?: string
  message?: string
  company?: string
}

type ContactFields = {
  name: string
  email: string
  subject: string
  message: string
  company?: string
}

const SENDER_ADDRESS = 'donotreply@dirkscloud.nl'
const RECIPIENT_ADDRESS = 'mdirks@dirkscloud.nl'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildHtml(data: ContactFields): string {
  const companyRow = data.company
    ? `<tr><td style="padding:8px 12px;font-weight:600;color:#475569">Bedrijf</td><td style="padding:8px 12px">${escapeHtml(data.company)}</td></tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="nl">
  <body style="margin:0;padding:24px;font-family:Segoe UI,Helvetica,Arial,sans-serif;background:#f8fafc;color:#0f172a">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px">
      <tr>
        <td style="padding:20px 24px;border-bottom:1px solid #e2e8f0">
          <h1 style="margin:0;font-size:18px;color:#0078d4">Nieuw contactformulier</h1>
          <p style="margin:8px 0 0;font-size:14px;color:#64748b">Dirks Cloud Engineering — dirkscloud.nl</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px 24px">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;line-height:1.5">
            <tr><td style="padding:8px 12px;font-weight:600;color:#475569">Naam</td><td style="padding:8px 12px">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:600;color:#475569">E-mail</td><td style="padding:8px 12px"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding:8px 12px;font-weight:600;color:#475569">Onderwerp</td><td style="padding:8px 12px">${escapeHtml(data.subject)}</td></tr>
            ${companyRow}
            <tr><td style="padding:8px 12px;font-weight:600;color:#475569;vertical-align:top">Bericht</td><td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(data.message)}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function parseBody(req: HttpRequest): ContactBody {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body) as ContactBody
  }
  return (req.body ?? {}) as ContactBody
}

function parseContactFields(body: ContactBody): ContactFields | null {
  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const subject = body.subject?.trim() ?? ''
  const message = body.message?.trim() ?? ''
  const company = body.company?.trim()

  if (!name || !email || !subject || !message) {
    return null
  }

  return { name, email, subject, message, company: company || undefined }
}

function formatError(error: unknown): string {
  if (error && typeof error === 'object') {
    const err = error as Record<string, unknown> & {
      message?: string
      code?: string
      statusCode?: number
      body?: unknown
      response?: { status?: number; bodyAsText?: string; parsedBody?: unknown }
    }

    return JSON.stringify(
      {
        message: err.message ?? String(error),
        code: err.code,
        statusCode: err.statusCode,
        body: err.body,
        responseStatus: err.response?.status,
        responseBody: err.response?.parsedBody ?? err.response?.bodyAsText,
      },
      null,
      2,
    )
  }

  return String(error)
}

const httpTrigger = async function (context: AzureFunctionContext, req: HttpRequest): Promise<void> {
  try {
    const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING
    if (!connectionString) {
      context.log.error(
        'COMMUNICATION_SERVICES_CONNECTION_STRING is missing. Configure it in Azure Static Web App application settings.',
      )
      context.res = { status: 500, body: { error: 'Email service is not configured' } }
      return
    }

    const fields = parseContactFields(parseBody(req))
    if (!fields) {
      context.log.error('Invalid request body. Required fields: name, email, subject, message.')
      context.res = { status: 500, body: { error: 'Invalid request payload' } }
      return
    }

    context.log(
      `Preparing ACS email — sender: ${SENDER_ADDRESS}, recipient: ${RECIPIENT_ADDRESS}, subject: ${fields.subject}`,
    )

    const emailClient = new EmailClient(connectionString)
    const poller = await emailClient.beginSend({
      senderAddress: SENDER_ADDRESS,
      content: {
        subject: fields.subject,
        html: buildHtml(fields),
      },
      recipients: {
        to: [{ address: RECIPIENT_ADDRESS }],
      },
      replyTo: [{ address: fields.email, displayName: fields.name }],
    })

    const result = await poller.pollUntilDone()

    if (result.status !== 'Succeeded') {
      context.log.error(
        `ACS email failed — status: ${result.status}, messageId: ${result.id ?? 'n/a'}, error: ${JSON.stringify(result.error ?? null)}`,
      )
      context.res = { status: 500, body: { error: 'Failed to send email' } }
      return
    }

    context.log(
      `ACS email sent — messageId: ${result.id}, sender: ${SENDER_ADDRESS}, recipient: ${RECIPIENT_ADDRESS}`,
    )

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { success: true, messageId: result.id },
    }
  } catch (error) {
    context.log.error(`Contact function exception: ${formatError(error)}`)
    context.res = { status: 500, body: { error: 'Internal server error' } }
  }
}

export = httpTrigger
