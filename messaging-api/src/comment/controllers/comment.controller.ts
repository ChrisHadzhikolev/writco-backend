import {
  Controller,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { hasRole } from '../../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { HttpResponseInterceptor } from '../../interceptors/http-response.interceptor';
import { MessagingExceptionInterceptor } from '../../interceptors/messaging-exception.interceptor';

@hasRole('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comments')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(HttpResponseInterceptor)
@UseInterceptors(MessagingExceptionInterceptor)
export class CommentController {
  constructor(
  ) {}
}
