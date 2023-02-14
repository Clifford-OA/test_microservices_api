import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello() {
    return this.gatewayService.getHello();
  }

  @Get('auth')
  getAuth() {
    return this.gatewayService.getHelloFromAuth();
  }

  @Post('register')
  registerUserController(@Body() userData){
    return this.gatewayService.registerUser(userData)
  }
}
