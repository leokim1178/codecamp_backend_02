import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarModelModule } from './apis/car/carModel/carModel.module';
import { CarTypeModule } from './apis/car/carType/carType.module';
import { CarCustomModule } from './apis/car/carCustom/carCustom.module';
import { CarImgModule } from './apis/car/carImg/carImg.module';

import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PaymentModule } from './apis/payment/payment.module';

import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

@Module({
    imports: [
        CarModelModule,
        CarCustomModule,
        CarTypeModule,
        CarImgModule,
        //==========CarModules=======//
        AuthModule,
        PaymentModule,
        UserModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => ({ req, res }),
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'my-database',
            port: 3306,
            username: 'root',
            password: '1178',
            database: 'main-project-docker',
            entities: [__dirname + '/apis/**/**/*.entity.*'],
            synchronize: true,
            logging: true,
            retryAttempts: 30,
            retryDelay: 5000
        }),
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            url: 'redis://my-redis:6379',
            isGlobal: true,
        }),
    ],
})
export class AppModule {}
