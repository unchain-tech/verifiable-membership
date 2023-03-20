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
    const authkey = `${id}#key-1`;
    const json: IIssuer = {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/jws-2020/v1',
      ],
      id,
      verificationMethod: [
        {
          id: authkey,
          type: 'EcdsaSecp256k1VerificationKey2019',
          controller: id,
          publicKeyJwk: keyto.from(privateKey, 'blk').toJwk('public'),
        },
      ],
      authentication: [authkey],
    };
    if (serviceEP) {
      Object.assign(json, {
        service: [
          {
            id: `${id}#service-1`,
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