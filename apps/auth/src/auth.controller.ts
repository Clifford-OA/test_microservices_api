import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('authHello')
  getHello() {
    return this.authService.getHello();
  }

  @MessagePattern('register')
  register(userInputs) {
    return this.authService.registerUser(userInputs)
  }
}
