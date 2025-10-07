import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'user/entities/user.entity';


@Controller('auth')
export class AuthController {
private readonly logger = new Logger(AuthController.name);
constructor(private readonly authService: AuthService) {}


@Post('login')
@HttpCode(HttpStatus.OK)
async login(@Body() dto: LoginDto) {
this.logger.log(`login attempt: ${dto.email}`);
const user = await this.authService.validateUser(dto.email, dto.password);
if (!user) {
return { statusCode: HttpStatus.UNAUTHORIZED, message: 'Invalid credentials' };
}
return this.authService.login(user as UserEntity);
}
}