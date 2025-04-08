import { IEmailService } from "../interfaces/IEmailService";
import nodemailer from 'nodemailer';

export class EmailService implements IEmailService {
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to, 
      subject,
      text, 
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Email could not be sent.');
    }
  }
}
