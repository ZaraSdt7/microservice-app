import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);


  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }


  async create(createUserDto: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    try {
      const { email, name, password } = createUserDto;


      const existing = await this.userRepo.findOne({ where: { email } });
      if (existing) {
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      }


      const salt = await bcrypt.genSalt(12);
      const hashed = await bcrypt.hash(password, salt);


      const user = this.userRepo.create({ name, email, password: hashed });
      const saved = await this.userRepo.save(user);

      const { password: _pw, ...result } = saved as unknown as UserEntity;
      return result;
    } catch (error) {
      this.logger.error('create user failed', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findAll(): Promise<Omit<UserEntity, 'password'>[]> {
    try {
      const users = await this.userRepo.find();
      return users.map((user: any) => {
        const { password, ...rest } = user as unknown as UserEntity;
        return rest;
      });
    } catch (error) {
      this.logger.error('findAll failed', error );
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findById(id: string): Promise<Omit<UserEntity, 'password'>> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      const { password, ...rest } = user as unknown as UserEntity;
      return rest;
    } catch (error) {
      this.logger.error('findById failed', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<Omit<UserEntity, 'password'>> {
try {
const user = await this.userRepo.findOne({ where: { id }, select: ['id', 'email', 'name', 'role', 'password'] });
if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);


if (dto.email && dto.email !== user.email) {
const exists = await this.userRepo.findOne({ where: { email: dto.email } });
if (exists) throw new HttpException('Email already in use', HttpStatus.CONFLICT);
}


if (dto.password) {
const salt = await bcrypt.genSalt(12);
user.password = await bcrypt.hash(dto.password, salt);
}


user.name = dto.name ?? user.name;
user.email = dto.email ?? user.email;


const updated = await this.userRepo.save(user);
const { password: _pw, ...result } = updated as any;
return result;
} catch (error) {
this.logger.error('update failed', error as any);
if (error instanceof HttpException) throw error;
throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
}
}


async remove(id: string): Promise<void> {
try {
const res = await this.userRepo.delete(id);
if (res.affected === 0) {
throw new HttpException('User not found', HttpStatus.NOT_FOUND);
}
} catch (error) {
this.logger.error('remove failed', error as any);
if (error instanceof HttpException) throw error;
throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
}
}


async findByEmailWithPassword(email: string): Promise<UserEntity | null> {
// used by auth service - returns password selected explicitly
try {
const user = await this.userRepo.findOne({ where: { email }, select: ['id', 'email', 'password', 'name', 'role'] });
return user ?? null;
} catch (error) {
this.logger.error('findByEmailWithPassword failed', error);
throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
}
}
}