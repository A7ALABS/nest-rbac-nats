import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService as NestConfigService } from '@nestjs/config';
import ConfigService from './config.service';
import { AppService } from './app.service';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AccessControlModule } from 'nest-access-control';
import { JwtModule } from '@nestjs/jwt';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: config.get('auth').transport,
          options: { servers: config.get('auth').servers
          }
        }),
    },
  ],
})
export class AppModule {}
