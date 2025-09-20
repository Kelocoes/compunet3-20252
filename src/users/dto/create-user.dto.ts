import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    passwordHash: string;

    @IsString()
    bio: string;

    @IsString()
    roleName: string;
}
