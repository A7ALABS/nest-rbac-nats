import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService as NestConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AccessControlModule } from 'nest-access-control';
import { JwtModule } from '@nestjs/jwt';
import { roles } from './app.roles';
import ConfigService from './config.service';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [NestConfigService],
      useFactory: async () => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
      }),
    }),
    AccessControlModule.forRoles(roles),
  
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
