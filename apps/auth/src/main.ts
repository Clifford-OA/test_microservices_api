import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';

// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(process.env.AUTHPORT),
      },
    },
  );

  // const config = new DocumentBuilder().setTitle('Demo Application')
  //   .setDescription("Demo API Application")
  //   .setVersion('v1')
  //   .addTag('books')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen();
}
bootstrap();
