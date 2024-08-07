import { User } from '@domain/entities';
import { IUserRepository } from '@domain/repositories';
import { knex } from '@infrastructure/database';
import { Knex } from 'knex';

export const USER_REPOSITORY = Symbol('UserRepository');

export class UserRepository implements IUserRepository {
  private readonly knex: Knex;

  constructor() {
    this.knex = knex;
  }

  async create(user: Pick<User, 'name' | 'email' | 'password'>): Promise<any> {
    const [{ id }] = await this.knex('users').insert(user).returning('id');

    return {
      ...user,
      id,
    };
  }

  async findById(id: string): Promise<User | null> {
    return this.knex('users').where('id', id).first();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.knex('users').where('email', email).first();
  }
}
