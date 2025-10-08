import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user-service.module';
import { JwtStrategy } from './guard/jwt.strategy';



@Module({
imports: [
PassportModule.register({ defaultStrategy: 'jwt' }),
JwtModule.registerAsync({
useFactory: () => ({
secret: process.env.JWT_SECRET || 'super-secret-key',
signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '15m' },
}),
}),
UserModule,
],
providers: [AuthService, JwtStrategy],
controllers: [AuthController],
exports: [AuthService],
})
export class AuthModule {}

