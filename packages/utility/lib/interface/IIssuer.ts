import type { IDidDocument } from '../@decentralized-identity/did-common-typescript';

// cert-isser用
export interface IIssuer extends IDidDocument {
  verificationMethod?: IVerificationMethodDescriptor[];
}

/**
 * https://www.w3.org/TR/did-core/#verification-method-properties
 */
export interface IVerificationMethodDescriptor {
  id: string;
  controller: string;
  type: string;

  publicKeyJwk?: {
    crv: string;
    x: string;
    y: string;
    kty: string;
  };
  publicKeyMultibase?: string;
}
