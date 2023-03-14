import type {
  IDidDocumentPublicKey,
  IDidDocumentServiceDescriptor,
} from '@decentralized-identity/did-common-typescript';

/**
 * Interface describing the expected shape of a Decentralized Identity Document.
 */
export interface IDidDocument {
  /** The standard context for DID Documents. */
  '@context':
    | 'https://www.w3.org/ns/did/v1'
    | ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/jws-2020/v1'];
  /** The DID to which this DID Document pertains. */
  id: string;
  /** Array of public keys associated with the DID. */
  publicKey?: IDidDocumentPublicKey[];
  /** Array of services associated with the DID. */
  service?: IDidDocumentServiceDescriptor[];
  /** Array of authentication methods. */
  authentication?: (string | object)[];
}
