import type { IDidDocument } from './';
import type { IDidDocumentPublicKey as DidPublicKey } from '@decentralized-identity/did-common-typescript';

/**
 * Class for performing various DID document operations.
 */
export class DidDocument {
  /**
   * Returns the DID within the key ID given.
   * @param keyId A fully-qualified key ID. e.g. 'did:example:abc#key1'
   * @example 'did:example:abc#key1' returns 'did:example:abc'
   */
  public static getDidFromKeyId(keyId: string): string {
    const didLength = keyId.indexOf('#');
    const did = keyId.substr(0, didLength);
    return did;
  }

  /** Url of the @context for this document */
  public context: string[];

  /** The DID to which this DID Document pertains. */
  public id: string;

  /** Array of public keys associated with the DID */
  public publicKey: DidPublicKey[];

  /** The raw document returned by the resolver. */
  public rawDocument: IDidDocument;

  constructor(json: IDidDocument) {
    for (let field of ['@context', 'id']) {
      if (!(field in json)) {
        throw new Error(`${field} is required`);
      }
    }

    this.rawDocument = json;
    this.context =
      typeof json['@context'] === 'string'
        ? [json['@context']]
        : json['@context'];
    this.id = json.id;
    this.publicKey = this.parsePublicKeyDetails(json.publicKey || []);
  }

  /**
   * Gets the matching public key for a given key id
   *
   * @param id fully qualified key id
   */
  public getPublicKey(id: string): DidPublicKey | undefined {
    return this.publicKey.find((item) => item.id === id);
  }

  /**
   * Returns all of the service endpoints contained in this DID Document.
   */
  public getServices() {
    return this.rawDocument.service || [];
  }

  /**
   * Returns all of the service endpoints matching the given type.
   *
   * @param type The type of service(s) to query.
   */
  public getServicesByType(type: string) {
    return this.getServices().filter((service) => service.type === type);
  }

  /**
   * Parses the `publicKey` array in the DID document and ensures that the key IDs are
   * fully-qualified.
   *
   * @param publicKeyDefinitions The `publicKey` array from the DID document.
   */
  private parsePublicKeyDetails(publicKeyDefinitions: DidPublicKey[]) {
    return publicKeyDefinitions.map((key) => {
      let id = key.id;

      if (!id.includes('#')) {
        id = `${this.id}#${id}`;
      } else if (id.indexOf('#') === 0) {
        id = this.id + id;
      }

      return Object.assign({}, key, { id });
    });
  }
}