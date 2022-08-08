import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUsers(): Promise<Users[]> {
    return await this.usersRepository.find({
      take: 1,
      skip: 0
    })
  }

  async getUser(userId: number): Promise<Users> {
    return await this.usersRepository.findOne(userId);
  }

  async createUser(user: Users): Promise<InsertResult> {
    return await this.usersRepository.insert(user);
  }

  async updateUser(id: number, user: Users): Promise<UpdateResult> {
    return await this.usersRepository.update(id, user);
  }
  
  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}