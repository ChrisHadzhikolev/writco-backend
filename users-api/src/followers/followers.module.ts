import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersController } from './controller/followers.controller';
import { FollowersService } from './service/followers.service';
import { AuthModule } from '../auth/auth.module';
import { Follower } from '../database/entities/followers.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follower]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  providers: [FollowersService],
  controllers: [FollowersController],
  exports: [FollowersService],
})
export class FollowersModule {}
