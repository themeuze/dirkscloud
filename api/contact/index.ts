import type { HttpRequest } from '@azure/functions'
import { EmailClient, type EmailMessage } from '@azure/communication-email'

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

type SendResult =
  | { ok: true; messageId: string }
  | { ok: false; messageId?: string; error: unknown }

const SENDER_ADDRESS = 'donotreply@dirkscloud.nl'
const ADMIN_RECIPIENT = 'mdirks@dirkscloud.nl'
const CONFIRMATION_SUBJECT = 'Bedankt voor je bericht aan Dirks Cloud Engineering'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildLeadHtml(data: ContactFields): string {
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

function buildConfirmationHtml(data: ContactFields): string {
  return `<!DOCTYPE html>
<html lang="nl">
  <body style="margin:0;padding:24px;font-family:Segoe UI,Helvetica,Arial,sans-serif;background:#f8fafc;color:#0f172a">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px">
      <tr>
        <td style="padding:24px">
          <p style="margin:0 0 16px;font-size:14px;color:#64748b">Dirks Cloud Engineering</p>
          <h1 style="margin:0 0 20px;font-size:20px;color:#0078d4">Bedankt voor uw bericht</h1>
          <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155">
            Beste ${escapeHtml(data.name)},
          </p>
          <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155">
            Hartelijk dank voor uw bericht. Ik heb uw aanvraag over <strong>${escapeHtml(data.subject)}</strong> in goede orde ontvangen.
          </p>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#334155">
            Ik neem zo snel mogelijk contact met u op — doorgaans binnen één werkdag.
          </p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#64748b">
            Met vriendelijke groet,<br />
            <strong style="color:#0f172a">M. Dirks</strong><br />
            Dirks Cloud Engineering
          </p>
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

async function sendEmail(client: EmailClient, message: EmailMessage): Promise<SendResult> {
  try {
    const poller = await client.beginSend(message)
    const result = await poller.pollUntilDone()

    if (result.status !== 'Succeeded') {
      return { ok: false, messageId: result.id, error: result.error ?? { status: result.status } }
    }

    return { ok: true, messageId: result.id }
  } catch (error) {
    return { ok: false, error }
  }
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
      `Preparing dual ACS emails — sender: ${SENDER_ADDRESS}, admin: ${ADMIN_RECIPIENT}, customer: ${fields.email}`,
    )

    const emailClient = new EmailClient(connectionString)

    const [leadResult, confirmationResult] = await Promise.all([
      sendEmail(emailClient, {
        senderAddress: SENDER_ADDRESS,
        content: {
          subject: fields.subject,
          html: buildLeadHtml(fields),
        },
        recipients: {
          to: [{ address: ADMIN_RECIPIENT }],
        },
        replyTo: [{ address: fields.email, displayName: fields.name }],
      }),
      sendEmail(emailClient, {
        senderAddress: SENDER_ADDRESS,
        content: {
          subject: CONFIRMATION_SUBJECT,
          html: buildConfirmationHtml(fields),
        },
        recipients: {
          to: [{ address: fields.email, displayName: fields.name }],
        },
      }),
    ])

    if (!leadResult.ok) {
      context.log.error(
        `Admin lead email failed — error: ${formatError(leadResult.error)}, messageId: ${leadResult.messageId ?? 'n/a'}`,
      )
      context.res = { status: 500, body: { error: 'Failed to send email' } }
      return
    }

    if (!confirmationResult.ok) {
      context.log.error(
        `Customer confirmation email failed (lead was sent) — adminMessageId: ${leadResult.messageId}, error: ${formatError(confirmationResult.error)}, confirmationMessageId: ${confirmationResult.messageId ?? 'n/a'}`,
      )
      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          success: true,
          messageId: leadResult.messageId,
          confirmationSent: false,
        },
      }
      return
    }

    context.log(
      `Both ACS emails sent successfully — adminMessageId: ${leadResult.messageId}, confirmationMessageId: ${confirmationResult.messageId}, admin: ${ADMIN_RECIPIENT}, customer: ${fields.email}`,
    )

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {
        success: true,
        messageId: leadResult.messageId,
        confirmationMessageId: confirmationResult.messageId,
        confirmationSent: true,
      },
    }
  } catch (error) {
    context.log.error(`Contact function exception: ${formatError(error)}`)
    context.res = { status: 500, body: { error: 'Internal server error' } }
  }
}

export = httpTrigger
