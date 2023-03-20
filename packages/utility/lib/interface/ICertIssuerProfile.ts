// import type { JsonLDContext } from '@blockcerts/cert-verifier-js';

// export declare type CertIssuerProfileContext = [
//   'https://w3id.org/openbadges/v2',
//   'https://w3id.org/blockcerts/v3',
// ] &
//   JsonLDContext;

export interface ICertIssuerProfile {
  '@context': [
    'https://w3id.org/openbadges/v2',
    'https://w3id.org/blockcerts/v3',
  ];
  id: string;
  type: 'Profile';
  name: string;
  url?: string;
  email?: string;
  image?: string;
  publicKey?: ICertIssuerProfilePublicKey[];
}

export interface ICertIssuerProfilePublicKey {
  id: string;
  created?: string;
}
