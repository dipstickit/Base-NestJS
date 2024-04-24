import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepo.save(createUserDto);
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepo.findOne({ where: { id: id } });
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepo.update(id, updateUserDto);
    }
}