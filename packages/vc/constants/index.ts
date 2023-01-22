import * as path from 'path';


/**
 * VC用サンプル画像フォルダ
 */
export const VC_IMAGE_PATH = path.join(__dirname, '../assets/vc-img/sample.svg');

// 各種定数(ここは柔軟に入れ替えられるようにしてあげる必要あり)
export const UUID_PREFIX = 'arn:uuid:';
export const MEMBER_ID = '9415';
export const WALLET_ADDRESS = '0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072';
export const ISSUER_DID = 'https://blockcerts-20230113.storage.googleapis.com/profile.json';

export const TITLE = 'UNCHAIN Membership VC';
export const DESCRIPTION = 'これは、UNCHAINエントリー用のメンバーシップVCです。';
export const DESCRIPTION_JP = 'This is a membership VC for UNCHAIN.';

export const CONTROLLER = 'did:web:blockcerts-20230113.storage.googleapis.com';

/**
 * VCのテンプレ
 */
export const TEMPLATE_VC = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/blockcerts/v3',
  ],
  type: ['VerifiableCredential', 'BlockcertsCredential'],
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
  },
};

/**
 * Profileドキュメントのテンプレ
 * その他必要な要素： id, name, url, email, publickey
 */
export const TEMPLATE_PROFILE = {
  '@context': [
    'https://w3id.org/openbadges/v2',
    'https://w3id.org/blockcerts/v3'
  ],
  type: 'Profile',
}

/**
 * DIDドキュメントのテンプレ
 * その他必要な要素、id, service, verificationMethod
 */
export const TEMPLATE_DID = {
  '@context': ['https://www.w3.org/ns/did/v1'],
}