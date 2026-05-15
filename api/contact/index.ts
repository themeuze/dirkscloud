import type { HttpRequest } from '@azure/functions'
import { EmailClient } from '@azure/communication-email'

type ContactPayload = {
  naam?: string
  name?: string
  email?: string
  onderwerp?: string
  subject?: string
  bericht?: string
  message?: string
  bedrijfsnaam?: string
  company?: string
}

type ContactFields = {
  name: string
  email: string
  subject: string
  message: string
  company?: string
}

type FunctionContext = {
  res?: {
    status?: number
    headers?: Record<string, string>
    body?: unknown
  }
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
  const company = data.company?.trim()
  const companyRow = company
    ? `<tr><td style="padding:8px 12px;font-weight:600;color:#475569">Bedrijf</td><td style="padding:8px 12px">${escapeHtml(company)}</td></tr>`
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

function parseBody(req: HttpRequest): ContactPayload {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body) as ContactPayload
  }
  return (req.body ?? {}) as ContactPayload
}

function normalizePayload(payload: ContactPayload): ContactFields | null {
  const name = (payload.naam ?? payload.name)?.trim() ?? ''
  const email = payload.email?.trim() ?? ''
  const message = (payload.bericht ?? payload.message)?.trim() ?? ''
  const subject =
    (payload.onderwerp ?? payload.subject)?.trim() ||
    (name ? `Contactaanvraag: ${name}` : 'Contactaanvraag via dirkscloud.nl')
  const company = (payload.bedrijfsnaam ?? payload.company)?.trim()

  if (!name || !email || !message) {
    return null
  }

  return { name, email, subject, message, company: company || undefined }
}

function serializeError(error: unknown): Record<string, unknown> {
  const output: Record<string, unknown> = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  }

  if (error && typeof error === 'object') {
    const err = error as Record<string, unknown> & {
      code?: string
      statusCode?: number
      details?: unknown
      body?: unknown
      response?: {
        status?: number
        bodyAsText?: string
        parsedBody?: unknown
      }
    }

    if (err.code) output.code = err.code
    if (err.statusCode) output.statusCode = err.statusCode
    if (err.details) output.details = err.details
    if (err.body) output.body = err.body

    if (err.response) {
      output.responseStatus = err.response.status
      output.responseBody = err.response.parsedBody ?? err.response.bodyAsText
    }

    try {
      output.serialized = JSON.parse(
        JSON.stringify(error, Object.getOwnPropertyNames(error as object)),
      )
    } catch {
      output.serialized = String(error)
    }
  }

  return output
}

const httpTrigger = async function (context: FunctionContext, req: HttpRequest): Promise<void> {
  try {
    const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING
    if (!connectionString) {
      console.error(
        'COMMUNICATION_SERVICES_CONNECTION_STRING is not configured',
        JSON.stringify({ senderAddress: SENDER_ADDRESS, recipientAddress: RECIPIENT_ADDRESS }, null, 2),
      )
      context.res = { status: 500, body: { error: 'Email service is not configured' } }
      return
    }

    const fields = normalizePayload(parseBody(req))
    if (!fields) {
      context.res = {
        status: 400,
        body: { error: 'Missing required fields: naam/name, email, bericht/message' },
      }
      return
    }

    console.log(
      'ACS email send starting:',
      JSON.stringify(
        {
          senderAddress: SENDER_ADDRESS,
          recipientAddress: RECIPIENT_ADDRESS,
          replyTo: fields.email,
          subject: fields.subject,
        },
        null,
        2,
      ),
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
      console.error(
        'ACS email send failed (full):',
        JSON.stringify(
          {
            senderAddress: SENDER_ADDRESS,
            recipientAddress: RECIPIENT_ADDRESS,
            status: result.status,
            messageId: result.id,
            error: result.error,
          },
          null,
          2,
        ),
      )
      context.res = { status: 502, body: { error: 'Failed to send email' } }
      return
    }

    console.log(
      'ACS email sent successfully:',
      JSON.stringify(
        {
          senderAddress: SENDER_ADDRESS,
          recipientAddress: RECIPIENT_ADDRESS,
          messageId: result.id,
          status: result.status,
        },
        null,
        2,
      ),
    )

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { success: true, messageId: result.id },
    }
  } catch (error) {
    console.error(
      'Contact function error (full):',
      JSON.stringify(
        {
          senderAddress: SENDER_ADDRESS,
          recipientAddress: RECIPIENT_ADDRESS,
          error: serializeError(error),
        },
        null,
        2,
      ),
    )
    context.res = { status: 500, body: { error: 'Internal server error' } }
  }
}

export = httpTrigger
