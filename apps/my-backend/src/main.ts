/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import type { FastifyCookieOptions } from '@fastify/cookie';
import fastifyRateLimit from '@fastify/rate-limit';
import cookie from '@fastify/cookie';
import helmet from 'helmet';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const port = process.env.PORT || 3333;
  const globalPrefix = 'api';
  const isProduction = process.env.NODE_ENV === 'production';
  const developmentContentSecurityPolicy = {
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://unpkg.com/'],
    },
  };

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  await app.register(fastifyRateLimit, {
    global: true,
    max: 100,
    timeWindow: '1 minute',
    errorResponseBuilder: function (_, context) {
      return {
        code: 429,
        error: 'Too Many Requests',
        message: `I only allow ${context.max} requests per ${context.after} to this Website. Try again soon.`,
        date: Date.now(),
        expiresIn: context.ttl, // milliseconds
      };
    },
  });

  app.register(cookie, {
    secret: process.env.MY_COOKIE_KEY,
    parseOptions: {},
  } as FastifyCookieOptions);

  //NOTE: This is not production grade CORS setup yet
  app.enableCors({
    origin: true,
    credentials: true,
  });

  //NOTE: This is not production grade http headers policies yet, but close to it
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : developmentContentSecurityPolicy,
    })
  );

  await app.listen(port);
  Logger.log(
    `🚀 Server is running on: http://localhost:${port}/${globalPrefix}`,
    `🚀 Graphql endpoint is running on: http://localhost:${port}/graphql`,
    `🚀 Graphql playground is running on: http://localhost:${port}/graphiql`
  );
}

bootstrap();
