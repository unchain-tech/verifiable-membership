
import type { IHolder } from './interface';

/**
 * 証明書受け取る人
 */
export class Holder {
  public name: string;
  public ethereumAddress: string;

  constructor(json: IHolder) {
    this.name = json.name;
    this.ethereumAddress = json.ethereumAddress;
  }

  public toJSON(): IHolder {
    return {
      name: this.name,
      ethereumAddress: this.ethereumAddress,
    };
  }
}
