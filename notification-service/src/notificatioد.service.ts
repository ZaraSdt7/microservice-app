import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification-service.dto';
import { ResponseBuilder } from './common/utils/response-builder';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);


  async sendNotification(
    dto: CreateNotificationDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      this.logger.log(`Sending ${dto.type} notification to ${dto.recipient}`);
      await new Promise((resolve) => setTimeout(resolve, 300)); // mock delay

      return ResponseBuilder.success(
        `Notification sent to ${dto.recipient}`,
      );
    } catch (error) {
      this.logger.error(' Error sending notification', error instanceof Error ? error.stack : 'Unknown error');
      throw new InternalServerErrorException('Error sending notification');
    }
  }

  @EventPattern('task.created')
  async handleTaskCreated(@Payload() data: any) {
    try {
      this.logger.verbose(`Received task.created event: ${JSON.stringify(data)}`);

      await new Promise((resolve) => setTimeout(resolve, 500));
      this.logger.log(`Sent task notification to ${data.userEmail}`);

      return ResponseBuilder.success(
        `Notification processed for ${data.userEmail}`,
      );
    } catch (error) {
      this.logger.error('Error processing task.created event', error instanceof Error ? error.stack : 'Unknown error');
      throw new InternalServerErrorException('Error handling notification event');
    }
  }
}
