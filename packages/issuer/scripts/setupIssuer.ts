import * as fs from 'fs';
import { IssuerFactory, CertIssuerProfileFactory } from 'utility';

import { validateRequiredEnvVarsType } from './util/requiredVarsValid';

const requiredVars = [
  'ISSUER_DDO_ID',
  'ISSUER_PRIVATE_KEY',
  'ISSUER_DDO_SERVICE_EP',
  'ISSUER_PROFILE_HOST_URL',
  'ISSUER_PROFILE_NAME',
];
const sanitizedEnv = validateRequiredEnvVarsType(requiredVars);

const createIssuer = IssuerFactory();
const issuer = createIssuer(
  sanitizedEnv.ISSUER_DDO_ID,
  sanitizedEnv.ISSUER_PRIVATE_KEY,
  sanitizedEnv.ISSUER_DDO_SERVICE_EP,
);

const createProfile = CertIssuerProfileFactory();
const profile = createProfile(
  sanitizedEnv.ISSUER_PROFILE_HOST_URL,
  issuer,
  sanitizedEnv.ISSUER_PROFILE_NAME,
);

console.log(` # did.json
  ${JSON.stringify(issuer.rawDocument, null, 2)}`);
console.log(` # profile.json
    ${JSON.stringify(profile.rawDocument, null, 2)}`);

fs.writeFileSync(
  './dist/did.json',
  JSON.stringify(issuer.rawDocument, null, 2),
);

fs.writeFileSync(
  './dist/profile.json',
  JSON.stringify(profile.rawDocument, null, 2),
);
