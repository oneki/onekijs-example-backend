import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import authConfig, { IdpProvider } from '../app.config';
import * as qs from 'query-string';
import TokenRequest from './dto/token.request';
import TokenResponse from './dto/token.response';

@Injectable()
export class AuthService {
  async token(
    idpProvider: IdpProvider,
    tokenRequest: TokenRequest,
  ): Promise<TokenResponse> {
    const idpConfig = authConfig()[idpProvider];
    const url = idpConfig.tokenEndpoint;
    const data = qs.stringify({
      grant_type: tokenRequest.grant_type,
      code: tokenRequest.code,
      redirect_uri: tokenRequest.redirect_uri,
      code_verifier: tokenRequest.code_verifier,
    });
    const response = await axios.post<
      TokenResponse,
      AxiosResponse<TokenResponse>
    >(url, data, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      auth: {
        username: idpConfig.clientId,
        password: idpConfig.clientSecret,
      },
    });

    return response.data;
  }
}
