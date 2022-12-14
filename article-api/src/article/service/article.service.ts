import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../database/entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private dataSource: DataSource,
  ) {}

  async create(article: Article) {
    return await this.articleRepository.save(article);
  }

  async getArticleValue(articleId) {

  }

  async getUserRating(params) {

  }

  async createArticleRating(params) {

  }

  async changeRating(params) {

  }

  async getArticleById(id: string) {
    return await this.articleRepository.findOne({ where: { id: id } });
  }

  async getAllPublic() {
    return await this.articleRepository.find({ where: { isPrivate: false } });
  }

  async getAll(id: string) {
    return await this.articleRepository.find({ where: { authorId: id } });
  }

  async updateArticle(id: string, article: Article) {
    return await this.articleRepository.update(id, article);
  }

  async setArticlePrivacy(id: string) {
    const articleObj = await this.articleRepository.findOne({ where: { id: id } });
    articleObj.isPrivate = !articleObj.isPrivate;
    return await this.articleRepository.save(articleObj);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async deleteArticleById(id: string): Promise<boolean> {
    await this.articleRepository
      .delete(id)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
