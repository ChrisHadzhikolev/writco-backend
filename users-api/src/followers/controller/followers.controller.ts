import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { hasRole } from '../../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { HttpResponseInterceptor } from '../../interceptors/http-response.interceptor';
import { UsersExceptionInterceptor } from '../../interceptors/users-exception.interceptor';
import { Follower } from '../../database/entities/followers.entity';
import { FollowersService } from '../service/followers.service';
import { UserService } from '../../users/service/users.service';

@hasRole('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('followers')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(HttpResponseInterceptor)
@UseInterceptors(UsersExceptionInterceptor)
export class FollowersController {
  constructor(
    private followersService: FollowersService,
    private usersService: UserService,
  ) {}

  @Get('count')
  async followersCount(
    @Body() body,
  ): Promise<{ userId: string; count: number }> {
    if (!body || body.userId === '') {
      throw new BadRequestException('No user id provided');
    }
    this.usersService.find(body.userId).then((res) => {
      if (!res) {
        throw new NotFoundException('User not found');
      }
    });
    const result = await this.followersService.followersCount(body.userId);
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  //Details expects user that follows and user that is followed
  @Post()
  async newFollower(@Body() details): Promise<Follower> {
    if (!details || !details.followerId || !details.followedId) {
      throw new BadRequestException('No user id provided');
    }
    this.usersService.find(details.followedId).then((res) => {
      if (!res) {
        throw new NotFoundException('User not found');
      } else if (res.restricted) {
        throw new NotAcceptableException('User is banned');
      }
    });
    const newFollow = await this.followersService.newFollower(
      details.followerId,
      details.followedId,
    );
    if (newFollow) {
      delete newFollow.id;
      return newFollow;
    } else {
      throw new NotFoundException();
    }
  }

  @Put()
  async unFollow(@Body() details): Promise<Follower> {
    if (!details || !details.followerId || !details.followedId) {
      throw new BadRequestException('No user id provided');
    }
    this.usersService.find(details.followedId).then((res) => {
      if (!res) {
        throw new NotFoundException('User not found');
      }
    });
    const unFollow = await this.followersService.unFollow(
      details.followerId,
      details.followedId,
    );
    if (unFollow) {
      delete unFollow.id;
      return unFollow;
    } else {
      throw new NotFoundException();
    }
  }
}
