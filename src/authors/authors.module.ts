import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    providers: [AuthorsService],
    exports: [AuthorsService, TypeOrmModule],
})
export class AuthorsModule {}
