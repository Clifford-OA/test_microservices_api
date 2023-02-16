import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ApiSuccessResponse } from './decorators/api-success-response.decorator';
import { UserDto, RegisterOutput } from './dtos/user.dto';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello() {
    return this.gatewayService.getHello();
  }

  @ApiSuccessResponse(RegisterOutput)
  @Get('auth')
  getAuth() {
    return this.gatewayService.getHelloFromAuth();
  }

  @Post('register')
  @ApiSuccessResponse(RegisterOutput, 201)
  registerUserController(@Body() userData: UserDto){
    return this.gatewayService.registerUser(userData)
  }
}
