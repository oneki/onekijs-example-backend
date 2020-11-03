export type IdpProvider = 'google';

interface AuthProviderConfig {
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  userinfoEndpoint: string;
}

interface AuthConfig {
  google: AuthProviderConfig;
}


export default (): AuthConfig => {
  const config: AuthConfig = {
    google: {
      tokenEndpoint: process.env.GOOGLE_TOKEN_ENDPOINT,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      userinfoEndpoint: process.env.GOOGLE_USERINFO_ENDPOINT,
    },
  };
  return config;
};
