import { IsUrl } from 'class-validator';

export class SentryConfigSchema {
  @IsUrl()
  SENTRY_DSN: string;
}
