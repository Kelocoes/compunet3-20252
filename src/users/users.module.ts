import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [AuthModule, TypeOrmModule.forFeature([User]), LoggerModule],
})
export class UsersModule {}
