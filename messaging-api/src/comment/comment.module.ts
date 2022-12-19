import { Module } from '@nestjs/common';
import { Comment } from '../database/entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CommentController} from "./controllers/comment.controller";
import {CommentService} from "./service/comment.service";

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentService],
    controllers: [CommentController],
    exports: [],
})
export class CommentModule {}
