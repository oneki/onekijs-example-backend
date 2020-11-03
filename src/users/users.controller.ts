import { Controller, Get, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Cookies } from '@nestjsplus/cookies';
import { IdpProvider } from '../app.config';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('userinfo')
  async userInfo(
    @Cookies('access_token') accessToken?: string,
    @Cookies('idp') idp?: IdpProvider,
  ): Promise<any> {
    if (!accessToken) {
      throw new UnauthorizedException();
    } else {
      try {
        return this.usersService.userInfo(accessToken, idp)
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
