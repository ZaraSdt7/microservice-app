import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user-service.service';
import { UserEntity } from 'user/entities/user.entity';



@Injectable()
export class AuthService {
private readonly logger = new Logger(AuthService.name);
constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}


async validateUser(email: string, pass: string) {
try {
const user = await this.userService.findByEmailWithPassword(email);
if (!user) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
// Compare the provided password with the stored hashed password
const match = await bcrypt.compare(pass, user.password);
if (!match) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
const { password, ...result } = user as UserEntity;
return result;
} catch (error) {
this.logger.error('validateUser failed', error);
throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
}
}


async login(user: UserEntity) {
const payload = { sub: user.id, email: user.email, role: user.role };
const accessToken = this.jwtService.sign(payload);
return {
accessToken,
expiresIn: process.env.JWT_EXPIRES_IN || '15m',
};
}
}