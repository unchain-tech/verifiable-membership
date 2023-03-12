import keyto from '@trust/keyto';

import { Issuer } from './';

import type { IIssuer } from './';

export function IssuerFactory() {
  /**
   *
   * @param id
   * @param privateKey
   * @param serviceEP
   * @returns
   */
  const simple = (
    id: string,
    privateKey: string,
    serviceEP?: string,
  ): Issuer => {
    const json: IIssuer = {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/jws-2020/v1',
      ],
      id,
      verificationMethod: [
        {
          id: `${id}#key-0`,
          type: 'EcdsaSecp256k1VerificationKey2019',
          controller: id,
          publicKeyJwk: keyto.from(privateKey, 'blk').toJwk('public'),
        },
      ],
    };
    if (serviceEP) {
      Object.assign(json, {
        service: [
          {
            id: `${id}#issuer-profile`,
            type: 'IssuerProfile',
            serviceEndpoint: serviceEP,
          },
        ],
      });
    }

    return new Issuer(json);
  };

  return simple;
}