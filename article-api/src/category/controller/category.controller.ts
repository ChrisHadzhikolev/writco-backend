import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { HttpResponseInterceptor } from '../../interceptors/http-response.interceptor';
import { ArticleExceptionInterceptor } from '../../interceptors/article-exception.interceptor';

@Controller('category')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(HttpResponseInterceptor)
@UseInterceptors(ArticleExceptionInterceptor)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get('all')
  async getAllCategories() {}

  @Get(':id')
  async getCategory() {}

  @Post('')
  async createCategory() {}

  @Put(':id')
  async editCategory() {}
}
