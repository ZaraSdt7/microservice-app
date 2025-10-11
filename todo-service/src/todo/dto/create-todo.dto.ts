import { IsNotEmpty, IsUUID, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Write documentation' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Prepare Swagger and Postman docs' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'b12345f0-12d3-4a56-b789-abcdef123456' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
