import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';

import * as Joi from 'joi';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './user.entity';
import { CommonModule } from '@app/common';
import { DatabaseModule } from '@app/database';
import { DatabaseModel } from './models/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseContextInterceptor } from '@app/database/db-context/db-context.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forFeature([UserEntity]),
    CommonModule,
    DatabaseModel
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModel {}
