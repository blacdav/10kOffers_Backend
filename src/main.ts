import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://10k-offers-web-app.vercel.app', 'https://10koffers.com'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cookie',
      'x-client-type',
      'x-paystack-signature',
      'x-paystack-timestamp',
      'x-paystack-event'
    ],
    credentials: true
  })
  app.use(cookieParser());
  app.setGlobalPrefix('/api/v1');
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
