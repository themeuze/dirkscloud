import type { HttpRequest } from '@azure/functions'
import { EmailClient } from '@azure/communication-email'

type ContactPayload = {
  name?: string
  email?: string
  company?: string
  message?: string
}

type FunctionContext = {
  res?: {
    status?: number
    headers?: Record<string, string>
    body?: unknown
  }
}

const RECIPIENT = 'mdirks@dirkscloud.nl'
const DEFAULT_SENDER = 'donotreply@dirkscloud.nl'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildHtml(data: Required<Pick<ContactPayload, 'name' | 'email' | 'message'>> & { company?: string }): string {
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
          <p style="margin:8px 0 0;font-size:14px;color:#64748b">Dirks Cloud Engineering website</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px 24px">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;line-height:1.5">
            <tr><td style="padding:8px 12px;font-weight:600;color:#475569">Naam</td><td style="padding:8px 12px">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:600;color:#475569">E-mail</td><td style="padding:8px 12px"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
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

const httpTrigger = async function (context: FunctionContext, req: HttpRequest): Promise<void> {
  try {
    const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING
    if (!connectionString) {
      console.error('COMMUNICATION_SERVICES_CONNECTION_STRING is not configured')
      context.res = { status: 500, body: { error: 'Email service is not configured' } }
      return
    }

    const senderAddress = process.env.ACS_SENDER_ADDRESS ?? DEFAULT_SENDER
    const payload = parseBody(req)

    const name = payload.name?.trim() ?? ''
    const email = payload.email?.trim() ?? ''
    const message = payload.message?.trim() ?? ''
    const company = payload.company?.trim()

    if (!name || !email || !message) {
      context.res = { status: 400, body: { error: 'Missing required fields: name, email, message' } }
      return
    }

    const emailClient = new EmailClient(connectionString)
    const poller = await emailClient.beginSend({
      senderAddress,
      content: {
        subject: `Contactaanvraag: ${name}`,
        html: buildHtml({ name, email, message, company }),
      },
      recipients: {
        to: [{ address: RECIPIENT }],
      },
      replyTo: [{ address: email, displayName: name }],
    })

    const result = await poller.pollUntilDone()

    if (result.status !== 'Succeeded') {
      console.error('ACS email send failed:', {
        status: result.status,
        error: result.error,
        id: result.id,
      })
      context.res = { status: 502, body: { error: 'Failed to send email' } }
      return
    }

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { success: true },
    }
  } catch (error) {
    const err = error as { code?: string; statusCode?: number; message?: string }
    console.error('Contact function error:', {
      code: err.code,
      statusCode: err.statusCode,
      message: err.message,
      error,
    })
    context.res = { status: 500, body: { error: 'Internal server error' } }
  }
}

export = httpTrigger
