import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';
import { IUserService, USER_SERVICE } from '@application/services/user';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() data: CreateUserDTO): Promise<GetUserDTO> {
    return await this.userService.create(data);
  }
}
