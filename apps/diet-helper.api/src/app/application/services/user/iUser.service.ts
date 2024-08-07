import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';
import { User } from '@domain/entities';

export interface IUserService {
  create(data: CreateUserDTO): Promise<GetUserDTO>;
  findById(id: string): Promise<GetUserDTO>;
}
