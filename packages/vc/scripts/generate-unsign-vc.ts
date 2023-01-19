import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  DESCRIPTION,
  DESCRIPTION_JP,
  ISSUER_DID,
  MEMBER_ID,
  TEMPLATE_VC,
  TITLE,
  UUID_PREFIX,
  VC_IMAGE_PATH,
  WALLET_ADDRESS,
} from '../constants';

type VC = {
  '@context': string[];
  type: string[];
  id?: string;
  issuer?: string;
  issuanceDate?: string;
  metadata?: string;
  display?: {
    contentMediaType?: string;
    contentEncoding?: string;
    content?: string;
  };
  nonce?: string;
  credentialSubject: {
    id: string;
  };
};

/**
 * 出力先フォルダ
 */
const OUPUT_UNSIGNED_VC_DIR = path.join(
  __dirname,
  '../data/work/unsigned_certificates/'
);

/**
 * generateVC function
 * @returns
 */
const generateVC = () => {
  // issue date
  const ISSUANCE_DATE: string = `${
    new Date()
      .toISOString()
      .split('Z')[0]
      .split('.')[0]
  }Z`;

  // meta data
  const metadataBody = {
    title: TITLE,
    description: DESCRIPTION,
    descriptionJp: DESCRIPTION_JP,
  };
  // VC data
  const vc: VC = Object.assign({}, TEMPLATE_VC);

  vc.id = `${UUID_PREFIX}${MEMBER_ID}`;
  vc.issuer = `${ISSUER_DID}`;
  vc.issuanceDate = `${ISSUANCE_DATE}`;
  vc.metadata = JSON.stringify(metadataBody);
  vc.display = {
    contentMediaType: 'image/svg+xml',
    contentEncoding: 'base64',
    content: fs.readFileSync(VC_IMAGE_PATH).toString('base64'),
  };
  vc.nonce = uuidv4();
  vc.credentialSubject = {
    id: `did:ethr:${WALLET_ADDRESS}`,
  };

  return vc;
};

const main = async (): Promise<void> => {
  // call generateVC function
  const vc = generateVC();

  const fileName: string = 'sample.json';
  const filePath: string = path.join(OUPUT_UNSIGNED_VC_DIR, fileName);

  fs.writeFileSync(filePath, JSON.stringify(vc));
};

main()
  .then((_) => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
