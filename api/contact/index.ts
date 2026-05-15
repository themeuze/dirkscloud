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

type MailLanguage = 'nl' | 'en'

type ContactBody = {
  name?: string
  email?: string
  message?: string
  company?: string
  phone?: string
  requestType?: string
  language?: string
}

type ContactFields = {
  name: string
  email: string
  message: string
  requestType: string
  requestTypeLabel: string
  company: string
  phone: string
  language: MailLanguage
}

type SendResult =
  | { ok: true; messageId: string }
  | { ok: false; messageId?: string; error: unknown }

const SENDER_ADDRESS = 'donotreply@dirkscloud.nl'
const ADMIN_RECIPIENT = 'mdirks@dirkscloud.nl'

const VALID_REQUEST_TYPES = [
  'Cloud Migratie',
  'Security Audit',
  'Azure Advies / Consultancy',
  'Infrastructure as Code',
  'Algemene Vraag',
] as const

const REQUEST_TYPE_LABELS: Record<MailLanguage, Record<string, string>> = {
  nl: {
    'Cloud Migratie': 'Cloud Migratie',
    'Security Audit': 'Security Audit',
    'Azure Advies / Consultancy': 'Azure Advies / Consultancy',
    'Infrastructure as Code': 'Infrastructure as Code',
    'Algemene Vraag': 'Algemene Vraag',
  },
  en: {
    'Cloud Migratie': 'Cloud Migration',
    'Security Audit': 'Security Audit',
    'Azure Advies / Consultancy': 'Azure Advisory / Consultancy',
    'Infrastructure as Code': 'Infrastructure as Code',
    'Algemene Vraag': 'General Inquiry',
  },
}

const mailCopy = {
  nl: {
    notProvided: 'Niet opgegeven',
    notApplicable: 'N.v.t.',
    confirmationSubject: 'Ontvangstbevestiging — Dirks Cloud Engineering',
    adminSubject: (requestType: string, name: string) => `[${requestType}] Contactaanvraag — ${name}`,
    adminHeading: 'Nieuw contactformulier',
    adminTagline: 'Dirks Cloud Engineering — dirkscloud.nl',
    labels: {
      name: 'Naam',
      email: 'E-mail',
      company: 'Bedrijfsnaam',
      phone: 'Telefoonnummer',
      requestType: 'Type aanvraag',
      message: 'Bericht',
    },
    confirmation: {
      title: 'Ontvangstbevestiging — Dirks Cloud Engineering',
      greeting: (name: string) => `Beste ${name},`,
      intro: 'Hartelijk dank voor uw contactaanvraag via <strong>dirkscloud.nl</strong>.',
      body: (requestType: string) =>
        `Wij hebben uw gegevens en de interesse in <strong>${requestType}</strong> in goede orde ontvangen. Maurits Dirks zal uw bericht persoonlijk beoordelen en binnen 24 uur contact met u opnemen om de verdere details te bespreken.`,
      summaryTitle: 'Samenvatting aanvraag:',
      summarySubject: 'Onderwerp',
      summaryOrganization: 'Organisatie',
      summaryMessage: 'Bericht',
      closing: 'Met vriendelijke groet,',
      signature: 'Dirks Cloud Engineering',
    },
  },
  en: {
    notProvided: 'Not provided',
    notApplicable: 'N/A',
    confirmationSubject: 'Confirmation — Dirks Cloud Engineering',
    adminSubject: (requestType: string, name: string) => `[${requestType}] Contact request — ${name}`,
    adminHeading: 'New contact form submission',
    adminTagline: 'Dirks Cloud Engineering — dirkscloud.nl',
    labels: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      phone: 'Phone',
      requestType: 'Request type',
      message: 'Message',
    },
    confirmation: {
      title: 'Confirmation — Dirks Cloud Engineering',
      greeting: (name: string) => `Dear ${name},`,
      intro: 'Thank you for contacting us via <strong>dirkscloud.nl</strong>.',
      body: (requestType: string) =>
        `We have received your details and your interest in <strong>${requestType}</strong>. Maurits Dirks will personally review your message and contact you within 24 hours to discuss the next steps.`,
      summaryTitle: 'Request summary:',
      summarySubject: 'Subject',
      summaryOrganization: 'Organization',
      summaryMessage: 'Message',
      closing: 'Kind regards,',
      signature: 'Dirks Cloud Engineering',
    },
  },
} as const

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function parseLanguage(value: string | undefined): MailLanguage {
  return value === 'en' ? 'en' : 'nl'
}

function buildAdminLeadHtml(data: ContactFields): string {
  const copy = mailCopy[data.language]
  const line = (label: string, value: string) =>
    `<p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#334155"><strong>${label}:</strong> ${value}</p>`

  const optionalValue = (value: string) => {
    const trimmed = value.trim()
    return trimmed ? escapeHtml(trimmed) : copy.notProvided
  }

  const sections = [
    line(copy.labels.name, escapeHtml(data.name)),
    line(copy.labels.email, `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`),
    line(copy.labels.company, optionalValue(data.company)),
    line(copy.labels.phone, optionalValue(data.phone)),
    line(copy.labels.requestType, escapeHtml(data.requestTypeLabel)),
    `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#334155"><strong>${copy.labels.message}:</strong></p>
     <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
  ].join('')

  return `<!DOCTYPE html>
<html lang="${data.language}">
  <body style="margin:0;padding:24px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f8fafc;color:#333">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #eee;padding:20px;border-radius:8px">
      <h2 style="margin:0 0 16px;font-size:18px;color:#0078d4">${copy.adminHeading}</h2>
      <p style="margin:0 0 20px;font-size:13px;color:#64748b">${copy.adminTagline}</p>
      ${sections}
    </div>
  </body>
</html>`
}

function buildConfirmationHtml(data: ContactFields): string {
  const copy = mailCopy[data.language].confirmation
  const companyDisplay = data.company.trim() ? escapeHtml(data.company) : mailCopy[data.language].notApplicable

  return `<!DOCTYPE html>
<html lang="${data.language}">
  <body style="margin:0;padding:24px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f8fafc;color:#333">
    <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;max-width:600px;border:1px solid #eee;padding:20px;background:#fff;border-radius:8px">
      <h2 style="color:#0078d4;margin-top:0">${copy.title}</h2>
      <p>${copy.greeting(escapeHtml(data.name))}</p>
      <p>${copy.intro}</p>
      <p>${copy.body(escapeHtml(data.requestTypeLabel))}</p>
      <div style="background-color:#f4f4f4;padding:15px;border-radius:5px;margin:20px 0">
        <h4 style="margin-top:0">${copy.summaryTitle}</h4>
        <ul style="list-style:none;padding:0;margin:0">
          <li style="margin-bottom:8px"><strong>${copy.summarySubject}:</strong> ${escapeHtml(data.requestTypeLabel)}</li>
          <li style="margin-bottom:8px"><strong>${copy.summaryOrganization}:</strong> ${companyDisplay}</li>
          <li><strong>${copy.summaryMessage}:</strong><br /><span style="white-space:pre-wrap">${escapeHtml(data.message)}</span></li>
        </ul>
      </div>
      <p>${copy.closing}</p>
      <p><strong>${copy.signature}</strong></p>
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
  const language = parseLanguage(body.language)

  if (!name || !email || !message || !requestType || !isValidRequestType(requestType)) {
    return null
  }

  const requestTypeLabel = REQUEST_TYPE_LABELS[language][requestType] ?? requestType

  return { name, email, message, requestType, requestTypeLabel, company, phone, language }
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
        'Invalid request body. Required: name, email, message, requestType (valid option). Optional: company, phone, language.',
      )
      context.res = { status: 500, body: { error: 'Invalid request payload' } }
      return
    }

    const copy = mailCopy[fields.language]
    const adminSubject = copy.adminSubject(fields.requestTypeLabel, fields.name)
    const confirmationSubject = copy.confirmationSubject

    context.log(
      `Preparing dual ACS emails — language: ${fields.language}, sender: ${SENDER_ADDRESS}, admin: ${ADMIN_RECIPIENT}, customer: ${fields.email}, requestType: ${fields.requestTypeLabel}`,
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
          subject: confirmationSubject,
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
      `Both ACS emails sent successfully — language: ${fields.language}, adminMessageId: ${leadResult.messageId}, confirmationMessageId: ${confirmationResult.messageId}, admin: ${ADMIN_RECIPIENT}, customer: ${fields.email}`,
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
