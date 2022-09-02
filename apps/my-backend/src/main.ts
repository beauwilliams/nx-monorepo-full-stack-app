/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationError } from 'class-validator';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  /* app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints)
        );
        return new BadRequestException(errorMessages.toString());
      },
      forbidUnknownValues: true,
    })
  ); */
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Server is running on: http://localhost:${port}/${globalPrefix}`,
    `🚀 Graphql playground is running on: http://localhost:${port}/graphiql`
  );
}

bootstrap();
