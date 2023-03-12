import { v4 as uuidv4 } from 'uuid';

import { UnsignedCertficate, SignedCertficate, IIssuer } from './';

import type { IUnsignedCertficate, ISignedCertficate } from './';

export function CertficateFactory() {
  const unsignedCertficate = (
    issuer: IIssuer,
    holderDid: string,
  ): UnsignedCertficate => {
    //
    const created_at = new Date().toISOString();

    const json: IUnsignedCertficate = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/blockcerts/v3',
      ],
      id: `urn:uuid:${uuidv4()}`,
      type: ['VerifiableCredential', 'BlockcertsCredential'],
      issuer: issuer.id,
      issuanceDate: created_at,
      credentialSubject: {
        id: holderDid,
      },
    };

    return new UnsignedCertficate(json);
  };

  const signedCertficate = (
    issuer: IIssuer,
    holderDid: string,
  ): SignedCertficate => {
    const created_at = new Date().toISOString();

    const json: ISignedCertficate = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/blockcerts/v3',
      ],
      id: `urn:uuid:${uuidv4()}`,
      type: ['VerifiableCredential', 'BlockcertsCredential'],
      issuer: issuer.id,
      issuanceDate: created_at,
      credentialSubject: {
        id: holderDid,
      },
      proof: {
        type: 'MerkleProof2019',
        created: created_at,
        proofValue: '0x00000000',
        proofPurpose: 'assertionMethod',
        verificationMethod:
          'did:web:blockcerts-20230113.storage.googleapis.com#key-1',
      },
    };

    throw new Error('Not implemented');

    return new SignedCertficate(json);
  };

  return { unsignedCertficate, signedCertficate };
}