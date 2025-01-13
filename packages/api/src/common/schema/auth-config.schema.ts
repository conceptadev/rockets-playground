import { IsString } from 'class-validator';

export class AuthConfigSchema {
  @IsString()
  AUTH_URL_RESET_PASSWORD: string;
}
