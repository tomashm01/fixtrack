import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mailcatcher',
      port: Number(process.env.MAIL_PORT) || 1025,
      secure: false
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: process.env.MAIL_FROM || 'admin@gmail.com',
      to,
      subject,
      html
    };

    return this.transporter.sendMail(mailOptions);
  }
}
