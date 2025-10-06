import { IsEmail, IsOptional, MinLength } from 'class-validator';


export class UpdateUserDto {
@IsOptional()
name?: string;


@IsOptional()
@IsEmail()
email?: string;


@IsOptional()
@MinLength(8)
password?: string;
}