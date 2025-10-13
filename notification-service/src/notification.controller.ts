import { Controller, Post,  Logger, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification-service.dto';
import { NotificationService } from './notificatioد.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Send a notification to a user' })
  @ApiResponse({
    status: 201,
    description: 'Notification sent successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Error sending notification',
  })
  async send(@Body() dto: CreateNotificationDto) {
    this.logger.log(`API request to send notification: ${dto.recipient}`);
    return this.notificationService.sendNotification(dto);
  }
}
