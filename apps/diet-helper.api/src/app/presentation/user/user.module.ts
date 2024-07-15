import { Module } from '@nestjs/common';
import { UserController } from './controllers/user';
import { USER_SERVICE, UserService } from '@application/services/user';
import {
  USER_REPOSITORY,
  UserRepository,
} from '@infrastructure/repositories/user';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
