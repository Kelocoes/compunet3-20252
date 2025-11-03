import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,
    ) {}

    async findAll(): Promise<Author[]> {
        return this.authorsRepository.find({
            relations: ['posts'],
        });
    }

    async findOne(id: number): Promise<Author> {
        const author = await this.authorsRepository.findOne({
            where: { id },
            relations: ['posts'],
        });

        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }

        return author;
    }

    async findByEmail(email: string): Promise<Author> {
        const author = await this.authorsRepository.findOne({
            where: { email },
            relations: ['posts'],
        });

        if (!author) {
            throw new NotFoundException(`Author with email ${email} not found`);
        }

        return author;
    }

    async create(authorData: Partial<Author>): Promise<Author> {
        const author = this.authorsRepository.create(authorData);
        return this.authorsRepository.save(author);
    }

    async update(id: number, authorData: Partial<Author>): Promise<Author> {
        const author = await this.findOne(id);
        Object.assign(author, authorData);
        return this.authorsRepository.save(author);
    }

    async remove(id: number): Promise<void> {
        const author = await this.findOne(id);
        await this.authorsRepository.remove(author);
    }

    async getActiveAuthors(): Promise<Author[]> {
        return this.authorsRepository.find({
            where: { isActive: true },
            relations: ['posts'],
        });
    }

    async getAuthorsByCountry(country: string): Promise<Author[]> {
        return this.authorsRepository.find({
            where: { country },
            relations: ['posts'],
        });
    }
}
