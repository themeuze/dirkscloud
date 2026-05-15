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
  message?: string
  company?: string
  phone?: string
  requestType?: string
}

type ContactFields = {
  name: string
  email: string
  message: string
  requestType: string
  company: string
  phone: string
}

type SendResult =
  | { ok: true; messageId: string }
  | { ok: false; messageId?: string; error: unknown }

const SENDER_ADDRESS = 'donotreply@dirkscloud.nl'
const ADMIN_RECIPIENT = 'mdirks@dirkscloud.nl'
const CONFIRMATION_SUBJECT = 'Ontvangstbevestiging — Dirks Cloud Engineering'
const NOT_PROVIDED = 'Niet opgegeven'

const VALID_REQUEST_TYPES = [
  'Cloud Migratie',
  'Security Audit',
  'Azure Advies / Consultancy',
  'Infrastructure as Code',
  'Algemene Vraag',
] as const

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function displayOptional(value: string | undefined): string {
  const trimmed = value?.trim() ?? ''
  return trimmed ? escapeHtml(trimmed) : NOT_PROVIDED
}

function buildAdminLeadHtml(data: ContactFields): string {
  const line = (label: string, value: string) =>
    `<p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#334155"><strong>${label}:</strong> ${value}</p>`

  const sections = [
    line('Naam', escapeHtml(data.name)),
    line('E-mail', `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`),
    line('Bedrijfsnaam', displayOptional(data.company)),
    line('Telefoonnummer', displayOptional(data.phone)),
    line('Type aanvraag', escapeHtml(data.requestType)),
    `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#334155"><strong>Bericht:</strong></p>
     <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
  ].join('')

  return `<!DOCTYPE html>
<html lang="nl">
  <body style="margin:0;padding:24px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f8fafc;color:#333">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #eee;padding:20px;border-radius:8px">
      <h2 style="margin:0 0 16px;font-size:18px;color:#0078d4">Nieuw contactformulier</h2>
      <p style="margin:0 0 20px;font-size:13px;color:#64748b">Dirks Cloud Engineering — dirkscloud.nl</p>
      ${sections}
    </div>
  </body>
</html>`
}

function buildConfirmationHtml(data: ContactFields): string {
  const companyDisplay = data.company.trim() ? escapeHtml(data.company) : 'N.v.t.'

  return `<!DOCTYPE html>
<html lang="nl">
  <body style="margin:0;padding:24px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f8fafc;color:#333">
    <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;max-width:600px;border:1px solid #eee;padding:20px;background:#fff;border-radius:8px">
      <h2 style="color:#0078d4;margin-top:0">Ontvangstbevestiging — Dirks Cloud Engineering</h2>
      <p>Beste ${escapeHtml(data.name)},</p>
      <p>Hartelijk dank voor uw contactaanvraag via <strong>dirkscloud.nl</strong>.</p>
      <p>Wij hebben uw gegevens en de interesse in <strong>${escapeHtml(data.requestType)}</strong> in goede orde ontvangen. Maurits Dirks zal uw bericht persoonlijk beoordelen en binnen 24 uur contact met u opnemen om de verdere details te bespreken.</p>
      <div style="background-color:#f4f4f4;padding:15px;border-radius:5px;margin:20px 0">
        <h4 style="margin-top:0">Samenvatting aanvraag:</h4>
        <ul style="list-style:none;padding:0;margin:0">
          <li style="margin-bottom:8px"><strong>Onderwerp:</strong> ${escapeHtml(data.requestType)}</li>
          <li><strong>Organisatie:</strong> ${companyDisplay}</li>
        </ul>
      </div>
      <p>Met vriendelijke groet,</p>
      <p><strong>Dirks Cloud Engineering</strong></p>
    </div>
  </body>
</html>`
}

function parseBody(req: HttpRequest): ContactBody {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body) as ContactBody
  }
  return (req.body ?? {}) as ContactBody
}

function isValidRequestType(value: string): boolean {
  return VALID_REQUEST_TYPES.includes(value as (typeof VALID_REQUEST_TYPES)[number])
}

function parseContactFields(body: ContactBody): ContactFields | null {
  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const message = body.message?.trim() ?? ''
  const requestType = body.requestType?.trim() ?? ''
  const company = body.company?.trim() ?? ''
  const phone = body.phone?.trim() ?? ''

  if (!name || !email || !message || !requestType || !isValidRequestType(requestType)) {
    return null
  }

  return { name, email, message, requestType, company, phone }
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
      context.log.error(
        'Invalid request body. Required: name, email, message, requestType (valid option). Optional: company, phone.',
      )
      context.res = { status: 500, body: { error: 'Invalid request payload' } }
      return
    }

    const adminSubject = `[${fields.requestType}] Contactaanvraag — ${fields.name}`

    context.log(
      `Preparing dual ACS emails — sender: ${SENDER_ADDRESS}, admin: ${ADMIN_RECIPIENT}, customer: ${fields.email}, requestType: ${fields.requestType}`,
    )

    const emailClient = new EmailClient(connectionString)

    const [leadResult, confirmationResult] = await Promise.all([
      sendEmail(emailClient, {
        senderAddress: SENDER_ADDRESS,
        content: {
          subject: adminSubject,
          html: buildAdminLeadHtml(fields),
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
      `Both ACS emails sent successfully — adminMessageId: ${leadResult.messageId}, confirmationMessageId: ${confirmationResult.messageId}, requestType: ${fields.requestType}, admin: ${ADMIN_RECIPIENT}, customer: ${fields.email}`,
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
