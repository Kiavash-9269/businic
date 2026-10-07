import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  json,
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { SafeExceptionFilter } from './common/safe-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const config = app.get(ConfigService);
  const nodeEnv = config.get<string>('nodeEnv') ?? 'development';
  const port = config.get<number>('port') ?? 3001;
  const frontendOrigin = config.get<string>('frontendOrigin') ?? '';
  const trustProxy = config.get<boolean>('trustProxy') ?? false;

  const origins = frontendOrigin
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (trustProxy) {
    const expressApp = app.getHttpAdapter().getInstance() as Express;
    expressApp.set('trust proxy', 1);
  }

  app.use(helmet());
  app.use(json({ limit: '32kb' }));

  if (nodeEnv === 'production') {
    app.use((req: Request, res: Response, next: NextFunction) => {
      const startedAt = Date.now();
      res.on('finish', () => {
        logger.log(
          `${req.method} ${req.url} ${res.statusCode} ${Date.now() - startedAt}ms`,
        );
      });
      next();
    });
  }

  app.useGlobalFilters(new SafeExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin:
      nodeEnv === 'production' ? origins : origins.length > 0 ? origins : true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });

  app.enableShutdownHooks();

  await app.listen(port, '0.0.0.0');

  logger.log(`Application started (${nodeEnv}) on port ${port}`);
  if (nodeEnv === 'production') {
    logger.log(`Allowed origins: ${origins.join(', ')}`);
    logger.log(`Trust proxy: ${trustProxy ? 'enabled' : 'disabled'}`);
  }
}

void bootstrap();
