import { v4 as uuidv4 } from 'uuid';

import { UnsignedCertficate, SignedCertficate, IIssuer } from './';

import type { IUnsignedCertficate, ISignedCertficate, IHolder } from './';

// import type { BlockcertsV3 } from '@blockcerts/cert-verifier-js';

export function CertificateFactory() {
  const createUnsignedCertificate = (
    issuer: IIssuer,
    holder: IHolder,
  ): UnsignedCertficate => {
    //
    const created_at = new Date().toISOString();
    const issuerProfile = issuer.service?.find((service) => {
      return service.type === 'IssuerProfile';
    });

    if (issuerProfile === undefined || issuerProfile === null) {
      throw new Error('IssuerProfile is not found.');
    }

    const json: IUnsignedCertficate = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/blockcerts/v3',
      ],
      id: `urn:uuid:${uuidv4()}`,
      type: ['VerifiableCredential', 'BlockcertsCredential'],
      issuer: issuerProfile.serviceEndpoint,
      issuanceDate: created_at,
      credentialSubject: {
        id: holder.ethereumAddress,
        name: holder.name,
      },
    };

    return new UnsignedCertficate(json);
  };

  const createSignedCertificate = (
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

    // rome-ignore lint/correctness/noUnreachable: <`1660529dbca913d3f7b9b1c579851646591939ce`時点の実装だと70行目の `throw Error` が必ず実行されるので `return SignedCertificate(json)` に辿り着かない。要修正>
    return new SignedCertficate(json);
  };

  return { createSignedCertificate, createUnsignedCertificate };
}
