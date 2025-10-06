import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user-service.module';



@Module({
imports: [
ConfigModule.forRoot({ isGlobal: true }),
TypeOrmModule.forRoot({
type: 'postgres',
host: process.env.DB_HOST || 'localhost',
port: parseInt(process.env.DB_PORT || '5432', 10),
username: process.env.DB_USER || 'postgres',
password: process.env.DB_PASS || 'postgres',
database: process.env.DB_NAME || 'todo_user_service',
entities: [__dirname + '/**/*.entity{.ts,.js}'],
synchronize: process.env.TYPEORM_SYNC === 'true', // only for dev
logging: false,
}),
UserModule,
AuthModule,
],
})
export class AppModule {}