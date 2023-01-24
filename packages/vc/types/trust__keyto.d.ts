declare module '@trust/keyto' {

  type SerializableFormat = 'jwk' | 'pem' | 'blk';
  type KeySelector = 'public' | 'private';
  type PEMKeySelector = 'public_pkcs1' | 'public_pkcs8' | 'private_pkcs1' | 'private_pkcs8';

  export interface JWK {
    // JWKの中身は定義されていない
  }

  export class InvalidOperationError extends Error {}
  export class OperationNotSupportedError extends Error {}

  export class Key {
    constructor(key: object, options: {
      kty: string,
      format: SerializableFormat,
      selector: KeySelector | PEMKeySelector,
      crv?: string,
      oid?: string
    });
    kty: string;
    format: SerializableFormat;
    selector: KeySelector | PEMKeySelector;
    crv?: string;
    oid?: string;
    key: object;
    parseKey(key: object): object;
  }

  export function from(key: object | string, format: SerializableFormat): Key;
  export function toJwk(selector: KeySelector | PEMKeySelector): JWK;
}