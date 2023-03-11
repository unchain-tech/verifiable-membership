/**
 * setup script
 */
import * as fs from 'fs';
import env from 'dotenv';

import { v4 as uuidv4 } from 'uuid';
import target from './target.json';
import signed_credential_skelton from './signed_credential.skelton.json';
import unsigned_credential_skelton from './unsigned_credential.skelton.json';

env.config();
const dotenv = process.env;

/**
 * gurad
 */
if (require.main !== module) throw new Error('This script is not a module');
if (typeof dotenv.ISSUER_ETH_ADDRESS_KEY !== 'string') {
  throw new Error('ISSUER_PRIVATE_KEY is not defined');
}
if (typeof dotenv.ISSUER_PRIVATE_KEY !== 'string') {
  throw new Error('ISSUER_PRIVATE_KEY is not defined');
}

/**
 * credential.json
 */

const unsigned_credential_template = unsigned_credential_skelton;

unsigned_credential_template.credentialSubject.id = dotenv.ISSUER_DDO_ID;
unsigned_credential_template.issuer = dotenv.ISSUER_PROFILE_HOST_URL;
unsigned_credential_template.issuanceDate = new Date().toISOString();

target.members.forEach((member) => {
  const unsigned_credential = unsigned_credential_template;

  unsigned_credential.id = `urn:uuid:${uuidv4()}`;
  unsigned_credential.metadata = JSON.stringify({
    title: '',
    description: '',
  });

  fs.writeFileSync(
    `./dist/unsigned_credential.${member.name}.json`,
    JSON.stringify(unsigned_credential, null, 2),
  );
});
