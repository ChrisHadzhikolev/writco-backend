import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Soundtrack } from '../../database/entities/soundtrack.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Soundtrack)
    private readonly soundtrackRepository: Repository<Soundtrack>,
  ) {}
}
