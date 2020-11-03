import { Injectable } from '@nestjs/common';
import axios from 'axios';
import config, { IdpProvider } from '../app.config';

@Injectable()
export class UsersService {
  async userInfo(accessToken: string, idp: IdpProvider = 'google') {
    const idpConfig = config()[idp];
    const url = idpConfig.userinfoEndpoint;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;    
  }

}
