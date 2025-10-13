import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from './notification.enum';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
export class CreateNotificationDto {
  @ApiProperty({ example: 'email', enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsString()
  recipient: string;

  @ApiProperty({ example: 'Your task has been updated successfully!' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ example: 'System', required: false })
  @IsOptional()
  @IsString()
  sender?: string;
}

