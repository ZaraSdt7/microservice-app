import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService {
private logger: any;
constructor(private config: ConfigService) {
const env = this.config.get('NODE_ENV') || 'development';
const transportList: any[] = [];


// console always useful for development
transportList.push(new transports.Console());


if (env === 'development') {
transportList.push(new transports.File({ filename: 'logs/dev.log' }));
} else {

transportList.push(new transports.File({ filename: 'logs/prod.log' }));
}


this.logger = createLogger({
level: this.config.get('LOG_LEVEL') || 'info',
format: format.combine(format.timestamp(), format.json()),
transports: transportList,
});
}


log(message: string, meta?: any) {
this.logger.info(message, meta);
}
error(message: string, meta?: any) {
this.logger.error(message, meta);
}
warn(message: string, meta?: any) {
this.logger.warn(message, meta);
}
debug(message: string, meta?: any) {
this.logger.debug(message, meta);
}
}