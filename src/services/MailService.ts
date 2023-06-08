import sgMail     from '@sendgrid/mail'
import handlebars from 'handlebars'
import fs         from 'fs'
import path       from 'path'

export class MailService{

  public sendMail(to:string, subject:string, name:string, token:string){

    const emailTemplate = fs.readFileSync(path.join(__dirname, "../templates/recover.hbs"), "utf-8")
    const template = handlebars.compile(emailTemplate)
    const msgBody = (template({
      name,
      token
    }))

    sgMail.setApiKey(process.env.MAIL_KEY)

    const msg = {
      to,
      from: 'meoagent.no.reply@gmail.com',
      subject,
      html: msgBody
    }

    sgMail.send(msg)
      .then(() => {

        console.log('Email sent')
      
      })
      .catch((err) => {

        console.log(err)
      
      })
  
  }

}