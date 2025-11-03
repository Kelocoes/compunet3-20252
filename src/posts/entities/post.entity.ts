import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ length: 100, nullable: true })
    category: string;

    @Column({ type: 'int', default: 0 })
    views: number;

    @Column({ type: 'int', default: 0 })
    likes: number;

    @Column({ default: true })
    isPublished: boolean;

    @Column({ type: 'date', nullable: true })
    publishedDate: Date;

    @Column({ type: 'simple-array', nullable: true })
    tags: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Author, (author) => author.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'authorId' })
    author: Author;

    @Column()
    authorId: number;
}
