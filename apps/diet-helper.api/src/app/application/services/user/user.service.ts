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

    const { id } = await this.userRepository.create(data);

    const { name, email } = data;

    return { id, name, email };
  }

  async findById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
