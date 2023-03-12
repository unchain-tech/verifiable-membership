import {
  ISignedCertficate,
  IUnsignedCertficate,
  ICredentialSubject,
  IProof,
} from './interface';

/**
 *
 */
export class UnsignedCertficate {
  public context: string[];
  public id: string;
  public type: string[];
  public issuer: string;
  public issuanceDate: string;
  public credentialSubject: ICredentialSubject;

  public rawDocument: IUnsignedCertficate;

  constructor(json: IUnsignedCertficate) {
    for (let field of ['@context', 'id']) {
      if (!(field in json)) {
        throw new Error(`${field} is required`);
      }
    }

    this.context = json['@context'];
    this.id = json.id;
    this.type = json.type;
    this.issuer = json.issuer;
    this.issuanceDate = json.issuanceDate;
    this.credentialSubject = json.credentialSubject;

    this.rawDocument = json;
  }
}

export class SignedCertficate extends UnsignedCertficate {
  public proof: IProof;

  constructor(json: ISignedCertficate) {
    super(json);

    this.proof = json.proof;
  }
}