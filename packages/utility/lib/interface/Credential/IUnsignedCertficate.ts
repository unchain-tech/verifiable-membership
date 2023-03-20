import { ICredentialSubject } from './ICredentialSubject';

export interface IUnsignedCertficate {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/blockcerts/v3',
  ];
  id: string;
  type: ['VerifiableCredential', 'BlockcertsCredential'];
  issuer: string;
  issuanceDate: string;
  credentialSubject: ICredentialSubject;
}
