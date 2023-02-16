import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ResponseInterceptor } from './response.interceptor';

@Module({
  imports: [
    CommonModule
  ],
  controllers: [GatewayController],
  providers: [GatewayService, {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor
  }],
})
export class GatewayModule { }
