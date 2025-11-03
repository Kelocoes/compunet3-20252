import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [PostsService],
    exports: [PostsService, TypeOrmModule],
})
export class PostsModule {}
