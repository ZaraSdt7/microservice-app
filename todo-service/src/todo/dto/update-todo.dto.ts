import { IsOptional, IsString, IsIn, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({ example: 'Update documentation', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiProperty({ example: 'Added more examples', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'in_progress', enum: ['pending', 'in_progress', 'done'], required: false })
  @IsOptional()
  @IsIn(['pending', 'in_progress', 'done'])
  status?: string;
}
