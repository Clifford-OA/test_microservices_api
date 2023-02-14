import { DatabaseContextInterceptor } from '@app/database/db-context/db-context.interceptor';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [
        MikroOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                entities: [],
                dbName: configService.get('POSTGRES_DB'),
                user: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                type: 'postgresql',
                autoLoadEntities: true,
                allowGlobalContext: true,
            }),
        }),
    ],
    // providers: [
    //     {
    //         provide: APP_INTERCEPTOR,
    //         useClass: DatabaseContextInterceptor
    //       }
    // ],
    exports: [MikroOrmModule]
})
export class DatabaseModel { }
