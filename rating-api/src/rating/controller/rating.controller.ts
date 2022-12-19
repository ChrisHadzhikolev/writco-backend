import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { HttpResponseInterceptor } from '../../interceptors/http-response.interceptor';
import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post, Put,
  UseFilters, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RatingExceptionInterceptor } from '../../interceptors/rating-exception.interceptor';
import { Rating } from '../../database/entities/rating.entity';
import { RatingService } from '../service/rating.service';
import { RatingValue } from '../models/ratingValue.dto';
import {Role} from "../../auth/enumerator/roles.enum";
import {JwtAuthGuard} from "../../auth/guards/jwt.guard";
import {hasRole} from "../../auth/decorators/role.decorator";
import {RolesGuard} from "../../auth/guards/roles.guard";

@Controller('rating')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(HttpResponseInterceptor)
@UseInterceptors(RatingExceptionInterceptor)
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @hasRole(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  async createRating(@Body() data) {
    return await this.ratingService.create(data.id, data.userId, data.rating);
  }

  @hasRole(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('')
  async changeRating(@Body() data) {
    console.log('data', data);
    return await this.ratingService.changeRating(
      data.id,
      data.userId,
      data.rating,
    );
  }

  @hasRole(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('userRating')
  async getUserRating(@Body() data) {
    return await this.ratingService.getUserRating(data.id, data.userId);
  }

  @hasRole(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('ratingCount')
  async getRatingCount(@Body() data): Promise<RatingValue> {
    return await this.ratingService.getRatingValue(data.id);
  }
}
