import {
Post,
Body,
Get,
Param,
Patch,
Delete,
UseGuards,
Req,
HttpCode,
HttpStatus,
Logger,
Controller,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserService } from './user-service.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';


@Controller('users')
export class UserController {
private readonly logger = new Logger(UserController.name);
constructor(private readonly userService: UserService) {}


@Post('register')
@HttpCode(HttpStatus.CREATED)
async register(@Body() dto: CreateUserDto) {
this.logger.log(`register attempt: ${dto.email}`);
return this.userService.create(dto);
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Get()
async getAll() {
return this.userService.findAll();
}


@UseGuards(JwtAuthGuard)
@Get(':id')
async getById(@Param('id') id: string) {
return this.userService.findById(id);
}


@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
return this.userService.update(id, dto);
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Delete(':id')
async remove(@Param('id') id: string) {
return this.userService.remove(id);
}
}