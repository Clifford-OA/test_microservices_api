import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseService } from './database.service';
import { DatabaseContextInterceptor } from './db-context/db-context.interceptor';

@Module({
  imports: [
    MikroOrmModule
  ],
  providers: [DatabaseService, {
    provide: APP_INTERCEPTOR,
    useClass: DatabaseContextInterceptor,
  }],
  exports: [DatabaseService],
})
export class DatabaseModule {}
