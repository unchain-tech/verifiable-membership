declare namespace NodeJS {
  // 環境変数名の定義
  interface ProcessEnv {
    /** 現在の Node.js 実行環境 */
    readonly NODE_ENV: 'development' | 'production' | 'test';

    readonly ISSUER_ETH_ADDRESS_KEY: string;
    readonly ISSUER_PRIVATE_KEY: string;
    readonly ISSUER_DDO_ID: string;
    readonly ISSUER_PROFILE_HOST_URL: string;
  }
}