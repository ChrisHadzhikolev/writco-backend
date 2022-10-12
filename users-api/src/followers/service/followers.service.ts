import { Injectable, NotImplementedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from '../../database/entities/followers.entity';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,
  ) {}

  async newFollower(followerId, followedId): Promise<Follower> {
    return await this.followerRepository.save({
      userId: followedId,
      followerId: followerId,
      followTime: new Date(),
    });
  }

  async unFollow(followerId, followedId): Promise<Follower> {
    return await this.followerRepository.findOne({
      where: { userId: followedId, followerId: followerId },
    });
  }

  async followersCount(userId): Promise<{ userId: string; count: number }> {
    return {
      userId: userId,
      count: await this.followerRepository.count({ where: { userId: userId } }),
    };
  }
}
