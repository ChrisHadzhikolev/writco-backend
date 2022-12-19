import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RatingModule } from './rating/rating.module';
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [RatingModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
