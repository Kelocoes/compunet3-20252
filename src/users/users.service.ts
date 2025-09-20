import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from '../auth/services/roles.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    RoleNotFoundException,
    UserNotFoundException,
} from '../common/exceptions';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private rolesService: RolesService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const role = await this.rolesService.findByName(createUserDto.roleName);
        if (!role) {
            throw new RoleNotFoundException(createUserDto.roleName);
        }

        const newUser = this.userRepository.create({
            ...createUserDto,
            role,
        });
        return await this.userRepository.save(newUser);
    }

    findAll() {
        return this.userRepository.find();
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const userExist = await this.userRepository.findOne({ where: { id } });
        if (!userExist) {
            throw new UserNotFoundException(id, 'P20250');
        }
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.userRepository.delete(id);
        if (!result.affected || result.affected === 0) {
            throw new UserNotFoundException(id);
        }
    }
}
