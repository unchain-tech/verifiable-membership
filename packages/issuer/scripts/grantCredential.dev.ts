import * as fs from 'fs';
import { CertificateFactory } from 'utility';
import type { IIssuer, IHolder, IUnsignedCertficate } from 'utility';

import { validateRequiredEnvVarsType } from './util/requiredVarsValid';

import issuer from '@config/did.json';
import { holders } from '@config/holder.json';

const requiredVars = [
  'ISSUER_DDO_ID',
  'ISSUER_PRIVATE_KEY',
  'ISSUER_DDO_SERVICE_EP',
  'ISSUER_PROFILE_HOST_URL',
  'ISSUER_PROFILE_NAME',
];
const sanitizedEnv = validateRequiredEnvVarsType(requiredVars);

const { createUnsignedCertificate } = CertificateFactory();

const unsignedCertificates: IUnsignedCertficate[] = [];
holders.forEach((holder: IHolder) => {
  const unsignedCertificate = createUnsignedCertificate(issuer, holder);
  unsignedCertificates.push(unsignedCertificate.rawDocument);
});

unsignedCertificates.forEach((unsignedCertificate: IUnsignedCertficate) => {
  console.log(` # ${unsignedCertificate.credentialSubject.id}.json
    ${JSON.stringify(unsignedCertificate, null, 2)}`);
  fs.writeFileSync(
    `./dist/unsigned_certificates/${unsignedCertificate.credentialSubject.id}.json`,
    JSON.stringify(unsignedCertificate, null, 2),
  );
});
