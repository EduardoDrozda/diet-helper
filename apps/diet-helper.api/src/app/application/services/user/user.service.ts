import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';
import { IUserService } from '@application/services/user';
import { User } from '@domain/entities';
import { IUserRepository } from '@domain/repositories';
import { USER_REPOSITORY } from '@infrastructure/repositories/user';
import { BadRequestException, Inject } from '@nestjs/common';

export const USER_SERVICE = Symbol('UserService');

export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
  ) {}

  async create(data: CreateUserDTO): Promise<GetUserDTO> {
    const user = await this.findByEmail(data.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const { name, email, password } = data;

    const { id, created_at, updated_at } = await this.userRepository.create({
      name,
      email,
      password,
    });

    return { id, name, email, created_at, updated_at };
  }

  async findById(id: string): Promise<GetUserDTO> {
    const { email, name, created_at, updated_at } =
      await this.userRepository.findById(id);

    return { id, email, name, created_at, updated_at };
  }

  private async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
