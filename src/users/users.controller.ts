import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    InternalServerErrorException,
    Header,
    Headers,
    ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { GetUserParams } from './dto/getUserParams.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', ParseIntPipe) id: GetUserParams['id']) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseIntPipe) id: GetUserParams['id'],
        @Body() updateUserDto: UpdateUserDto,
    ) {
        try {
            return await this.usersService.update(id, updateUserDto);
        } catch (error) {
            throw new InternalServerErrorException('Failed to update user', {
                cause: error,
                description:
                    'An error occurred while updating the user in the database.',
            });
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.usersService.remove(+id);
    }

    @Get('test/info')
    @HttpCode(HttpStatus.AMBIGUOUS)
    @Header('Custom-Header', 'CustomHeaderValue')
    test(@Headers('Content-Type') contentType: string) {
        console.log('Content-Type:', contentType);
        return 'Test endpoint';
    }
}
