import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { Cookies } from '@nestjsplus/cookies';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('userinfo')
  async userInfo(
    @Cookies('username') username?: string
  ): Promise<any> {
    if (!username) {
      throw new UnauthorizedException();
    } else {
      return {
        username
      }
    }
  }
}
