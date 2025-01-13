import { IsIn, IsOptional, IsString } from 'class-validator';

export class DatabaseConfigSchema {
  @IsString()
  DATABASE_URL: string;

  @IsOptional()
  @IsIn(['true', 'false'], {
    message: 'DATABASE_SSL must be either "true" or "false"',
  })
  DATABASE_SSL: string;
}
