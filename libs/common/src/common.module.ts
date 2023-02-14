import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonService } from './common.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      { name: 'AUTH_SERVICE', transport: Transport.TCP, options: { port: Number(process.env.AUTHPORT) } },
      { name: 'BOOKING_SERVICE', transport: Transport.TCP, options: { port: Number(process.env.BOOKINGPORT) } },
      { name: 'USERS_SERVICE', transport: Transport.TCP, options: { port: Number(process.env.TESTPORT) } },
    ]),

  ],
  providers: [CommonService],
  exports: [CommonService, ClientsModule],
})
export class CommonModule { }

