import { AuthRecoverySettingsInterface } from '@concepta/nestjs-auth-recovery/dist/interfaces/auth-recovery-settings.interface';
import { registerAs } from '@nestjs/config';
import { formatTokenUrl } from '../common/utils/format-token-url.util';

export const authRecoveryConfig = registerAs(
  'AUTH_RECOVERY_CONFIG',
  (): AuthRecoverySettingsInterface => ({
    email: {
      from: process.env?.NODEMAILER_FROM_EMAIL ?? 'no-reply@conceptatech.com',
      baseUrl: process.env?.AUTH_URL_RESET_PASSWORD ?? '',
      tokenUrlFormatter: formatTokenUrl,
      templates: {
        recoverLogin: {
          fileName: `${__dirname}/../${
            process.env?.NODEMAILER_TEMPLATE_PATH ?? 'assets/templates/email'
          }/recover-login.template.hbs`,
          subject: 'Login Recovery',
        },
        recoverPassword: {
          fileName: `${__dirname}/../${
            process.env?.NODEMAILER_TEMPLATE_PATH ?? 'assets/templates/email'
          }/recover-password.template.hbs`,
          subject: 'Password Recovery',
        },
        passwordUpdated: {
          fileName: `${__dirname}/../${
            process.env?.NODEMAILER_TEMPLATE_PATH ?? 'assets/templates/email'
          }/password-updated-successfully.template.hbs`,
          subject: 'Password Updated Successfully',
        },
      },
    },
    otp: {
      assignment: 'userOtp',
      category: 'auth-recovery',
      type: 'uuid',
      expiresIn: '1h',
    },
  }),
);
