import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationServiceService } from './notification-service.service';
import { CreateNotificationServiceDto } from './dto/create-notification-service.dto';
import { UpdateNotificationServiceDto } from './dto/update-notification-service.dto';

@Controller()
export class NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) {}

  @MessagePattern('createNotificationService')
  create(@Payload() createNotificationServiceDto: CreateNotificationServiceDto) {
    return this.notificationServiceService.create(createNotificationServiceDto);
  }

  @MessagePattern('findAllNotificationService')
  findAll() {
    return this.notificationServiceService.findAll();
  }

  @MessagePattern('findOneNotificationService')
  findOne(@Payload() id: number) {
    return this.notificationServiceService.findOne(id);
  }

  @MessagePattern('updateNotificationService')
  update(@Payload() updateNotificationServiceDto: UpdateNotificationServiceDto) {
    return this.notificationServiceService.update(updateNotificationServiceDto.id, updateNotificationServiceDto);
  }

  @MessagePattern('removeNotificationService')
  remove(@Payload() id: number) {
    return this.notificationServiceService.remove(id);
  }
}
