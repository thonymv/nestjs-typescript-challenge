import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

async function bootstrap() {
  try {
    console.log('Bootstrap start');
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
      }),
    );

    console.log('NestJS application created');

    const config = new DocumentBuilder()
      .setTitle('nestjs-typescript-challenge')
      .setDescription(
        'This challenge uses Nest.js as its framework to implement three API Rest endpoints (agents, customers and orders) with passportjs authentication.',
      )
      .addTag('Auth')
      .addTag('Agents')
      .addTag('Customers')
      .addTag('Orders')
      .addBearerAuth()
      .addServer('/dev')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    console.log('Swagger setup complete');

    await app.init();
    console.log('Application initialized');

    const expressApp = app.getHttpAdapter().getInstance();
    console.log('Express app instance obtained');
    return serverlessExpress({ app: expressApp });
  } catch (error) {
    console.error('Error during bootstrap:', error);
    throw error;
  }
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('Handler invoked with event:', JSON.stringify(event));
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
