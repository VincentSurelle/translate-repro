import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppProcessor } from './app.processor';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import { join } from 'path';

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
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppProcessor],
})
export class AppModule { }
