import { Injectable, Query, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUsers(query: {sort: "ASC" | 1 | "DESC" | -1, limit: number, page_number: number}): Promise<{users: Users[], total_record_count: number, total_page_count: number}> {
    const offset = (query.page_number - 1) * query.limit;
    const [users, total_record_count] = await this.usersRepository.findAndCount({
      select: ['id', 'password'],
      order: {
        id: query.sort
      },
      take: query.limit,
      skip: offset
    })
    return {
      users,
      total_record_count,
      total_page_count: 1111,
    }
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