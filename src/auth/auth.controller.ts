import { Body, Controller, InternalServerErrorException, Post, Query, Request } from '@nestjs/common';
import { SetCookies } from '@nestjsplus/cookies';
import { IdpProvider } from '../app.config';
import { AuthService } from './auth.service';
import TokenRequest from './dto/token.request';
import TokenResponse from './dto/token.response';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('oauth2/token')
  @SetCookies({ httpOnly: true })
  async token(@Request() req, @Body() tokenRequest: TokenRequest, @Query('idp') idp: IdpProvider): Promise<TokenResponse> {
    try {
      const tokens = await this.authService.token(idp, tokenRequest);
      req._cookies = [
        {
          name: 'access_token',
          value: tokens.access_token,
          options: {
            sameSite: true,
            path: '/'
          },
        },
        {
          name: 'idp',
          value: 'google',
          options: {
            sameSite: true,
            path: '/'
          },
        },        
      ];
      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
