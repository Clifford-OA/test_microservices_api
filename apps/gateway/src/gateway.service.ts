import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService {

  constructor(
    @Inject('USERS_SERVICE') private client: ClientProxy,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy
  ) { }
  getHello() {
    return this.client.send('getHello', '');
  }

  getHelloFromAuth() {
    return this.authClient.send('authHello', '');
  }

  registerUser(inputs) {
    return this.authClient.send('register', inputs)
  }
}
