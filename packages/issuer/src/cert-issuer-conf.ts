import fs from 'fs';
import { Buffer } from 'buffer';
import env from 'dotenv';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';

env.config();
const dotenv = process.env;

const ISSUER_PRIVATE_KEY = dotenv['ISSUER_PRIVATE_KEY']?.toString();
const JSON_RPC_URL = dotenv['JSON_RPC_URL']?.toString();

if (typeof ISSUER_PRIVATE_KEY !== 'string') {
  throw new Error('ISSUER_PRIVATE_KEY is not defined');
}

const bip32 = BIP32Factory(ecc);

/**
 * see https://github.com/blockchain-certificates/cert-issuer/blob/v3.3.0/docs/ethereum_configuration.md
 *
 */

// This should hold the Hex string of the BIP32 derived private key, generated from your own seed, prefixed by 0x.
const privateKey = Buffer.from(ISSUER_PRIVATE_KEY, 'hex');
const BIP32Key = bip32.fromPrivateKey(privateKey).toBase58();
const cert_issuer_pk = `0x${BIP32Key}`;

// ['ethereum_goerli', 'ethereum_sepolia', 'ethereum_mainnet']
dotenv['CHAIN_ID'];

const cert_issuer_conf = `
# issuer の Ethereumアドレス
issuing_address=${dotenv['ISSUER_ETH_ADDRESS']?.toString()}

#
verification_method=${'did:web:nc163.github.io:.well-known#key-1'}

usb_name=.

# .cert-issuer-pkを作成して、issuerの秘密鍵をBIP32で保存
key_file=./.cert-issuer-pk

unsigned_certificates_dir=./cert-issuer/unsigned_certificates
blockchain_certificates_dir=./cert-issuer/blockchain_certificates
work_dir=./cert-issuer/work

chain=ethereum_goerli
goerli_rpc_url=https://eth-goerli.g.alchemy.com/v2/####

no_safe_mode
`;
/** TODO: migrate from Goerli to Sepolia */
