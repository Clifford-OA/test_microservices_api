import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from 'apps/users/src/user.entity';
import { firstValueFrom } from 'rxjs';
import { ApiTokenDto } from './dtos';

@Injectable()
export class AuthService {
  private readonly jwtRefreshSecret: string;
  
  private readonly configService = new ConfigService();

  constructor(
    private readonly jwtService: JwtService,
    @Inject('USERS_SERVICE') private userClient: ClientProxy,
    // configService: ConfigService
  ) {
    this.jwtRefreshSecret = this.configService.get('JWT_REFRESH_SECRET');
  }

  getHello() {
    return 'Hello from auth service'
  }



  async registerUser (userRegisterInputs): Promise<any>{
    try{
      const createdUser = await firstValueFrom(this.userClient.send<UserEntity>('register', userRegisterInputs))
      if(createdUser){
        return await this.generateTokens(createdUser.id)
      }
    } catch(e){
      throw new Error('could not send userClient register request')
    }
  }



  private async generateTokens(userId: string): Promise<ApiTokenDto> {
    // Generate access and refresh token
    const payload = { sub: userId }
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h'
    })
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '2h',
      secret: this.jwtRefreshSecret
    })

    return { accessToken, refreshToken }
  }

  generateTokenHandler(userId: string) {
    return this.generateTokens(userId)
  }

}
