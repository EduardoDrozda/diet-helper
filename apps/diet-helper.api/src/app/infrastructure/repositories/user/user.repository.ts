import { User } from '@domain/entities';
import { IUserRepository } from '@domain/repositories';

export const USER_REPOSITORY = Symbol('UserRepository');

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async create(user: Pick<User, 'name' | 'email' | 'password'>): Promise<User> {
    const newUser = {
      ...user,
      id: String(this.users.length + 1),
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    this.users.push(newUser);

    return newUser;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}
