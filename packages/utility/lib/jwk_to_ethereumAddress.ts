import keyto from '@trust/keyto';
import secp256k1 from 'secp256k1';
import { ec } from 'elliptic';
import { keccak256 } from 'js-sha3';

/**
 * https://community.blockcerts.org/t/how-to-convert-my-eth-wallet-address-into-a-valid-did-format/3219
 * @param publicKeyJwk
 */
export const jwk_to_ethereum_address = (publicKeyJwk) => {
  const uncompressedPublicKey = keyto
    .from(publicKeyJwk, 'jwk')
    .toString('blk', 'public');
  const compressed = secp256k1.publicKeyConvert(
    Buffer.from(uncompressedPublicKey, 'hex'),
    true,
  );
  const publicKeyHex = Buffer.from(compressed).toString('hex');

  // referred to publicKeyUInt8ArrayFromJwk
  let publicKeyBuffer = Buffer.from(publicKeyHex, 'hex');
  let padding = 32 - publicKeyBuffer.length;
  while (padding > 0) {
    publicKeyBuffer = Buffer.concat([
      Buffer.from('00', 'hex'),
      publicKeyBuffer,
    ]);
    padding--;
  }

  // referred to computeEthereumAddressFromPublicKey
  const publicKeyString = publicKeyBuffer.toString('hex');
  const ellipticCurve = new ec('secp256k1');
  const decodedPublicKey = ellipticCurve.keyFromPublic(publicKeyString, 'hex');
  const publicKeyUncompressed = decodedPublicKey
    .getPublic()
    .encode('hex')
    .slice(2);
  const address = keccak256(Buffer.from(publicKeyUncompressed, 'hex')).slice(
    64 - 40,
  );
  return address.toLowerCase();
};