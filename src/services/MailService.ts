import sgMail     from '@sendgrid/mail'
import handlebars from 'handlebars'
import fs         from 'fs'
import path       from 'path'

export class MailService{

  public sendMail(to:string, subject:string, name:string, token:string, accType:string){

    const emailTemplate = fs.readFileSync(path.join(__dirname, "../../templates/recover.hbs"), "utf-8")
    const template = handlebars.compile(emailTemplate)
    const msgBody = (template({
      name,
      token,
      accType
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

  public sendMailReport(to:string, descricao:string, name:string,idAnuncio:string,profile:string,title:string){

    const emailTemplate = fs.readFileSync(path.join(__dirname, "../../templates/report.hbs"), "utf-8")
    const template = handlebars.compile(emailTemplate)
    const msgBody = (template({
      name,
      idAnuncio,
      profile,
      title,
      descricao
    }))

    sgMail.setApiKey(process.env.MAIL_KEY)

    const msg = {
      to,
      from: 'meoagent.no.reply@gmail.com',
      subject:'denúncia',
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
  
  public verifyAccount(to:string, subject:string, name:string, token:string, accType:string){

    const emailTemplate = fs.readFileSync(path.join(__dirname, "../../templates/verify.hbs"), "utf-8")
    const template = handlebars.compile(emailTemplate)
    const msgBody = (template({
      name,
      token,
      accType
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
