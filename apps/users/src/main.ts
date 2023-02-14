import { NestFactory } from '@nestjs/core';
import { UserModel } from './user.module';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModel,
    {
      transport: Transport.TCP,
      options: {
        port:  Number(process.env.TESTPORT),
      },
    },
  );
  await app.listen();
}
bootstrap();
