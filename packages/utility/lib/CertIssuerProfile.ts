import { ICertIssuerProfile, ICertIssuerProfilePublicKey } from './interface';

/**
 * 証明書発行体の情報
 */
export class CertIssuerProfile {
  public context: string[];
  public id: string;
  public name: string;
  public url?: string;
  public email?: string;
  public image?: string;
  public publicKey?: ICertIssuerProfilePublicKey[];

  public rawDocument: ICertIssuerProfile;

  constructor(json: ICertIssuerProfile) {
    for (let field of ['@context', 'id']) {
      if (!(field in json)) {
        throw new Error(`${field} is required`);
      }
    }

    this.context = json['@context'];
    this.id = json.id;
    this.name = json.name;
    this.url = json.url;
    this.email = json.email;
    this.image = json.image;
    this.publicKey = json.publicKey;

    this.rawDocument = json;
  }
}
