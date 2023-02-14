import { Options } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './user.entity';

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  entities: [UserEntity],
  type: 'postgresql',
  dbName: configService.get('POSTGRES_DB'),
  user: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
};

export default MikroOrmConfig;
