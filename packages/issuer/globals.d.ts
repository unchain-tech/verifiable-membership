declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';

    readonly ISSUER_ETH_ADDRESS_KEY: string;
    readonly ISSUER_PRIVATE_KEY: string;
    readonly ISSUER_DDO_ID: string;
    readonly ISSUER_PROFILE_HOST_URL: string;
  }
}