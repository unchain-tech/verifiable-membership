import * as fs from 'fs';
import env from 'dotenv';
import { IssuerFactory, CertIssuerProfileFactory } from 'utility';

env.config();
const dotenv = process.env;

const createIssuer = IssuerFactory();
const createProfile = CertIssuerProfileFactory();

const issuer_id = dotenv.ISSUER_DDO_ID;
const issuer_pk = dotenv.ISSUER_PRIVATE_KEY;
const service_ep = dotenv.ISSUER_DDO_SERVICE_EP;
const profile_host = dotenv.ISSUER_PROFILE_HOST_URL;
const profile_name = dotenv.ISSUER_PROFILE_NAME;

if (typeof issuer_id !== 'string')
  throw new Error('ISSUER_DDO_ID is not defined');
if (typeof issuer_pk !== 'string')
  throw new Error('ISSUER_PRIVATE_KEY is not defined');
if (typeof profile_host !== 'string')
  throw new Error('ISSUER_PROFILE_HOST_URL is not defined');
if (typeof profile_name !== 'string')
  throw new Error('ISSUER_PROFILE_NAME is not defined');

const issuer = createIssuer(issuer_id, issuer_pk, service_ep);
const profile = createProfile(profile_host, issuer, profile_name);

fs.writeFileSync(
  './dist/did.json',
  JSON.stringify(issuer.rawDocument, null, 2),
);

fs.writeFileSync(
  './dist/profile.json',
  JSON.stringify(profile.rawDocument, null, 2),
);