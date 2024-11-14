// Module
import nodemailer from 'nodemailer'

// Variables
const { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_FROM, MAIL_PORT, MAIL_SECURE } =
  process.env

// Class
class Mailer {
  constructor() {
    if (!Mailer.instance) {
      this.transporter = null
      Mailer.instance = this
    }
    return Mailer.instance
  }

  // Configura el transportista de Nodemailer
  async initTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT || 587, // Default a 587 si no se especifica
        secure: MAIL_SECURE === 'false', // Usar TLS o SSL según el valor
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
        // Opcional: Configuración de TLS/SSL (si es necesario)
        tls: {
          rejectUnauthorized: false,
        },
      })

      await this.transporter.verify()

      console.log('> [NODE]  Nodemailer transporter ready  |  [SOURCE]  ')
    } catch (error) {
      console.error(
        `> [NODE]  Error:Failed to configure Nodemailer transporter  |  [REASON]  ${error.message}`
      )
    }
  }

  // Envia un correo
  async sendMail(options) {
    if (!this.transporter) {
      throw new Error('> [App]  Error:Transporter is not configured.')
    }

    if (!options) {
      throw new Error('> [App]  Error:No email options provided.')
    }

    options = {
      from: MAIL_FROM,
      ...options,
    }

    return this.transporter.sendMail(options, async (err, inf) => {
      if (err) {
        const response = inf ? inf.response : 'No response available'
        throw new Error(
          `> [App]  Error: ${err.message}  |  [RESPONSE]  ${response}`
        )
      }
      console.log(`> [App]  Email sent  |  [RESPONSE]  ${inf.response}`)
    })
  }
}

// Singleton
let mailerInstance = null

const initMailer = async () => {
  if (!mailerInstance) {
    mailerInstance = new Mailer()
    await mailerInstance.initTransporter()
    Object.freeze(mailerInstance)
  }
  return mailerInstance
}

export { mailerInstance as default, initMailer }
