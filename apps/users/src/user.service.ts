import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from './models/dtos';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs'
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>
  ) { }

  private hashPassword(password: string) {
    return bcrypt.hash(password, 5);
  }

  getHello(): string {
    return 'Hello from Users!';
  }

  async registerUser(inputs: RegisterUserDto): Promise<any> {
    let user = await this.userRepository.findOne({ email: inputs.email });
    if (user)
      throw new BadRequestException('Email already exists')
    this.logger.log(`creating user : ${inputs.email}`)

    user = this.userRepository.create({
      ...inputs, password: await this.hashPassword(inputs.password)
    })

    // persist user in DB and generate api tokens
   await this.userRepository.persistAndFlush(user)
   return user;
    
  }

  async loginUser(input: { email: string, password: string }) {
    const user = await this.userRepository.findOne({ email: input.email })
    if (user) {
      const isMatch = await bcrypt.compare(input.password, user.password)
      if (isMatch) {
        this.logger.log(`user looged in: ${input.email}`)
      }
    }
    throw new BadRequestException('Invalid Credentials')
  }


}
