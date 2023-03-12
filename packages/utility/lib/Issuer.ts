import {
  DidDocument,
  IDidDocument,
} from './@decentralized-identity/did-common-typescript';

import type { IIssuer, IVerificationMethodDescriptor } from './interface';

/**
 * 証明書発行体
 */
export class Issuer extends DidDocument {
  public verificationMethod: IVerificationMethodDescriptor[];

  constructor(json: IIssuer | IDidDocument) {
    super(json);
    json = json as IIssuer;
    this.verificationMethod = (json as IIssuer).verificationMethod || [];
  }

  getVerificationMethods() {
    return (this.rawDocument as IIssuer).verificationMethod;
  }
}
