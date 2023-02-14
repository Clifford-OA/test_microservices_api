import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { RegisterUserDto } from './models/dtos';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('getHello')
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern('register')
  registerUserController(userData: RegisterUserDto) {
    return this.userService.registerUser(userData)
  }
}
