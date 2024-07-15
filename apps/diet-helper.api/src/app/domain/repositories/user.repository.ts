import { User } from "@domain/entities";

export interface IUserRepository {
  create(user: Pick<User, 'name' | 'email' | 'password'>): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
