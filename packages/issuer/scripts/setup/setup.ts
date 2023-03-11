/**
 * setup script
 */
import * as fs from 'fs';
import env from 'dotenv';

import { ethereum_pk_to_jwk } from '@issuer/ethereum_pk_to';
import profile_skelton from "./profile.skelton.json"
import ddo_skelton from "./did.skelton.json"
import signed_credential_skelton from "./signed_credential.skelton.json"
import unsigned_credential_skelton from "./unsigned_credential.skelton.json"

env.config();
const dotenv = process.env;

/**
 * gurad
 */
if(require.main != module) throw new Error('This script is not a module');
if(typeof dotenv.ISSUER_ETH_ADDRESS_KEY != "string") { throw new Error('ISSUER_PRIVATE_KEY is not defined'); }
if(typeof dotenv.ISSUER_PRIVATE_KEY != "string") { throw new Error('ISSUER_PRIVATE_KEY is not defined'); }


/**
 * did.json
 */
const ddo = ddo_skelton
const public_jwk = ethereum_pk_to_jwk(dotenv.ISSUER_PRIVATE_KEY)


ddo.id = dotenv.ISSUER_DDO_ID
ddo.verificationMethod[0].id = "#key-1"
ddo.verificationMethod[0].controller = ""
ddo.verificationMethod[0].type = "EcdsaSecp256k1VerificationKey2019"
// ddo.service.authentication.puth()
// ddo.service.assertionMethod.puth()
// ddo.service.keyAgreement.puth()
ddo.service[0].id = dotenv.ISSUER_DDO_SERVICE_ID
ddo.service[0].type = dotenv.ISSUER_DDO_SERVICE_TYPE
ddo.service[0].serviceEndpoint = dotenv.ISSUER_DDO_SERVICE_EP
Object.assign(ddo.verificationMethod[0].publicKeyJwk, public_jwk)

fs.writeFileSync("./dist/did.json", JSON.stringify(ddo, null, 2));


/**
 * profile.json
 */
const prifle = profile_skelton
prifle.id = dotenv.ISSUER_PROFILE_HOST_URL
if (typeof dotenv.ISSUER_PROFILE_NAME === "string" ) prifle.name = dotenv.ISSUER_PROFILE_NAME
if (typeof dotenv.ISSUER_PROFILE_DESCRIPTION === "string" ) prifle.description = dotenv.ISSUER_PROFILE_DESCRIPTION
if (typeof dotenv.ISSUER_PROFILE_EMAIL === "string" ) prifle.email = dotenv.ISSUER_PROFILE_EMAIL
if (typeof dotenv.ISSUER_PROFILE_URL === "string" ) prifle.url = dotenv.ISSUER_PROFILE_URL

prifle.publicKey[0].id = 'ecdsa-koblitz-pubkey:' + dotenv.ISSUER_ETH_ADDRESS_KEY;
prifle.publicKey[0].created = new Date().toISOString();


fs.writeFileSync("./dist/profile.json", JSON.stringify(prifle, null, 2));

// 環境変数からプロジェクトルートのdistにファイルを作成するようする


/**
 * credential.json
 */

const unsigned_credential = unsigned_credential_skelton
unsigned_credential.credentialSubject.id = dotenv.ISSUER_DDO_ID
unsigned_credential.issuer = dotenv.ISSUER_PROFILE_HOST_URL
unsigned_credential.issuanceDate = new Date().toISOString();

