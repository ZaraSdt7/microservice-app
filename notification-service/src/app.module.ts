import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from './notificatioد.service';
import { NotificationController } from './notification.controller';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class AppModule {}
