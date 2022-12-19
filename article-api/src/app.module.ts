import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./auth/auth.module";
import {ArticleModule} from "./article/article.module";
import {SoundtrackModule} from "./soundtrack/soundtrack.module";

@Module({
  imports: [AuthModule, ArticleModule, SoundtrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
