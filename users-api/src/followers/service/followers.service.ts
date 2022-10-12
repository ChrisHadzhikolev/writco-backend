import {Injectable, NotImplementedException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../auth/enum/roles.enum';
import { AuthService } from '../../auth/service/auth.service';
import {Follower} from "../../database/entities/followers.entity";

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly userRepository: Repository<Follower>,
    private authService: AuthService,
  ) {}

  async newFollower(followerId, followedId): Promise<Follower> {
    throw new NotImplementedException('');
  }

  async unFollow(followerId, followedId): Promise<Follower> {
    throw new NotImplementedException('');
  }

  async followersCount(userId): Promise<{ userId: string; count: number }> {
    throw new NotImplementedException('');
  }
}
