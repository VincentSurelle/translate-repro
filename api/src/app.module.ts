import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { I18nModule, I18nJsonParser, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'hello',
      redis: {
        host: 'translation_redis_1',
        port: 6379,
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: join(__dirname, '..', 'i18n'),
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
      ]
    }),
    ClientsModule.register([
      {
        name: 'hello', transport: Transport.TCP, options: {
          host: 'translation_tcp_1'
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
