import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking.module';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingModule,
    {
      transport: Transport.TCP,
      options: {
        port:  Number(process.env.BOOKINGPORT),
      },
    },
  );
  await app.listen();
}
bootstrap();
