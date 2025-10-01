import { Injectable } from '@nestjs/common';
import { CreateNotificationServiceDto } from './dto/create-notification-service.dto';
import { UpdateNotificationServiceDto } from './dto/update-notification-service.dto';

@Injectable()
export class NotificationServiceService {
  create(createNotificationServiceDto: CreateNotificationServiceDto) {
    return 'This action adds a new notificationService';
  }

  findAll() {
    return `This action returns all notificationService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationService`;
  }

  update(id: number, updateNotificationServiceDto: UpdateNotificationServiceDto) {
    return `This action updates a #${id} notificationService`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationService`;
  }
}
