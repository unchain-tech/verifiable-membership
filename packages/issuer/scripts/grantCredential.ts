import * as fs from 'fs';
import { validateRequiredEnvVarsType } from './util/requiredVarsValid';

const requiredVars = [
  'ISSUER_ETH_ADDRESS_KEY',
  'ISSUER_PRIVATE_KEY',
  'ISSUER_DDO_SERVICE_EP',
  'ISSUER_PROFILE_HOST_URL',
  'ISSUER_PROFILE_NAME',
];
const sanitizedEnv = validateRequiredEnvVarsType(requiredVars);

fs.writeFileSync(
  './conf/.cert-issuer-pk',
  JSON.stringify(sanitizedEnv.ISSUER_PRIVATE_KEY, null, 2),
);

fs.writeFileSync(
  './conf/.cert-issuer.devnet.conf',
  `
issuing_address=${sanitizedEnv.ISSUER_ETH_ADDRESS_KEY}
verification_method=did:web:nc163.github.io:.well-known#key-1
usb_name=.
key_file=./config/.cert-issuer-pk

unsigned_certificates_dir=./dist/unsigned_certificates
blockchain_certificates_dir=./dist/blockchain_certificates
work_dir=./dist/work

# hardhat側でchain id 5を指定してるからこれでok
chain=ethereum_goerli
goerli_rpc_url=http://127.0.0.1:8545/

no_safe_mode
`,
);