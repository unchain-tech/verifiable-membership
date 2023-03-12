import { CertIssuerProfile, Issuer } from './';
import { jwk_to_ethereum_address } from './jwk_to_ethereumAddress';

import type { ICertIssuerProfile, IIssuer } from './';

export function CertIssuerProfileFactory() {
  /**
   *
   * @param id
   * @param privateKey
   * @param serviceEP
   * @returns
   */
  const simple = (
    hostUrl: string,
    issuer: Issuer,
    name: string,
    options: {
      description?: string;
      email?: string;
      url?: string;
    } = {},
  ): CertIssuerProfile => {
    if (issuer.verificationMethod === undefined) {
      throw new Error('Issuer does not have a verificationMethod property');
    }
    const publicKeyJwk = issuer.verificationMethod[0].publicKeyJwk;
    const ethereum_address = jwk_to_ethereum_address(publicKeyJwk);

    const json: ICertIssuerProfile = {
      '@context': [
        'https://w3id.org/openbadges/v2',
        'https://w3id.org/blockcerts/v3',
      ],
      id: hostUrl,
      type: 'Profile',
      name,
      publicKey: [
        {
          id: `ecdsa-koblitz-pubkey:0x${ethereum_address}`,
          created: new Date().toISOString(),
        },
      ],
    };
    Object.assign(json, options);

    return new CertIssuerProfile(json);
  };


  return simple;
}