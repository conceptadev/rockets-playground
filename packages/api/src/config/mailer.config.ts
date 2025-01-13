import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { registerAs } from '@nestjs/config';

export const mailerConfig = registerAs(
  'MAILER_CONFIG',
  (): MailerOptions => ({
    transport: {
      host: process.env?.MAILGUN_SMTP_SERVER ?? 'smtp.mailgun.org',
      port: process.env?.MAILGUN_SMTP_PORT
        ? Number(process.env?.MAILGUN_SMTP_PORT)
        : 587,
      auth: {
        user: process.env?.MAILGUN_SMTP_LOGIN ?? '',
        pass: process.env?.MAILGUN_SMTP_PASSWORD ?? '',
      },
    },
    defaults: {
      from: process.env?.NODEMAILER_FROM_EMAIL ?? 'no-reply@conceptatech.com',
    },
    template: {
      dir: `${__dirname}/../${
        process.env?.NODEMAILER_TEMPLATE_PATH ?? 'assets/templates/email'
      }`,
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
);
