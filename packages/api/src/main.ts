import { ExceptionsFilter } from '@concepta/nestjs-exception';
import { SwaggerUiService } from '@concepta/nestjs-swagger-ui';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ServerConfigInterface } from './common/interfaces/server-config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const exceptionsFilter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new ExceptionsFilter(exceptionsFilter));

  const configService = app.get(ConfigService);

  const { cors, port, isSwaggerEnabled } =
    configService.get<ServerConfigInterface>('SERVER_CONFIG');

  if (isSwaggerEnabled) {
    const swaggerUiService = app.get(SwaggerUiService);

    swaggerUiService.builder().addBearerAuth();

    swaggerUiService.setup(app);
  }

  app.enableCors(cors);

  await app.listen(port);
}

bootstrap();
