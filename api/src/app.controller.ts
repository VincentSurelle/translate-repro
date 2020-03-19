import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { I18nService } from 'nestjs-i18n';
import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService, private readonly i18n: I18nService, @Inject('hello') private readonly client: ClientProxy) { }

  @Get('bull/:name')
  async callBull(@Param('name') name: string): Promise<string> {
    await this.appService.callBull(name);
    return await this.i18n.translate('BULL_SENT', {
      args: {
        name
      }
    });
  }

  @Get('tcp/:name')
  async callTcp(@Param('name') name: string): Promise<string> {
    await this.client.send({ cmd: 'hello' }, name).toPromise()
    return await this.i18n.translate('TCP_SENT', {
      args: {
        name
      }
    });
  }
}
