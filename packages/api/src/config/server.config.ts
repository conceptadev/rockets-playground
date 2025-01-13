import { registerAs } from '@nestjs/config';
import { ServerConfigInterface } from '../common/interfaces/server-config.interface';

export const serverConfig = registerAs(
  'SERVER_CONFIG',
  (): ServerConfigInterface => ({
    environment: process.env?.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3001),
    cors: {
      origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : 'http://localhost:3000',
    },
    isSwaggerEnabled: process.env.SWAGGER_ENABLED === 'true',
  }),
);
