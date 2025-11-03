import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}

    async findAll(): Promise<Post[]> {
        return this.postsRepository.find({
            relations: ['author'],
        });
    }

    async findOne(id: number): Promise<Post> {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['author'],
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        return post;
    }

    async findByAuthor(authorId: number): Promise<Post[]> {
        return this.postsRepository.find({
            where: { authorId },
            relations: ['author'],
        });
    }

    async findByCategory(category: string): Promise<Post[]> {
        return this.postsRepository.find({
            where: { category },
            relations: ['author'],
        });
    }

    async create(postData: Partial<Post>): Promise<Post> {
        const post = this.postsRepository.create(postData);
        return this.postsRepository.save(post);
    }

    async update(id: number, postData: Partial<Post>): Promise<Post> {
        const post = await this.findOne(id);
        Object.assign(post, postData);
        return this.postsRepository.save(post);
    }

    async remove(id: number): Promise<void> {
        const post = await this.findOne(id);
        await this.postsRepository.remove(post);
    }

    async getPublishedPosts(): Promise<Post[]> {
        return this.postsRepository.find({
            where: { isPublished: true },
            relations: ['author'],
            order: { publishedDate: 'DESC' },
        });
    }

    async incrementViews(id: number): Promise<Post> {
        const post = await this.findOne(id);
        post.views += 1;
        return this.postsRepository.save(post);
    }

    async incrementLikes(id: number): Promise<Post> {
        const post = await this.findOne(id);
        post.likes += 1;
        return this.postsRepository.save(post);
    }

    async searchByTag(tag: string): Promise<Post[]> {
        return this.postsRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .where(':tag = ANY(post.tags)', { tag })
            .getMany();
    }
}
