import { Injectable, Query, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult, Like } from 'typeorm';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUsers(query: {id: number, user_name: string, sort: "ASC" | 1 | "DESC" | -1, limit: number, page_number: number}): Promise<{users: Users[], total_record_count: number, total_page_count: number}> {
    let limit = 5;
    let offset = 1;
    const conditions = {};

    if(query.limit) limit = query.limit;
    if(query.page_number) offset = query.page_number;
    if(query.id) conditions["id"] = query.id;
    if(query.user_name) conditions["user_name"] = Like(`%${query.user_name}`);

    const [users, total_record_count] = await this.usersRepository.findAndCount({
      select: ['id', 'user_name', 'password'],
      where: conditions,
      order: {
        id: query.sort
      },
      take: limit,
      skip: (offset - 1) * limit
    })
    return {
      users,
      total_record_count,
      total_page_count: Math.ceil(total_record_count / limit),
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