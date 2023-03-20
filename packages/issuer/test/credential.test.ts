import { Certificate } from '@blockcerts/cert-verifier-js/dist/verifier-node.js';
import CertificateDefinition from './fixture/0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC.json';

async function main() {
  //console.log(CertificateDefinition);
  const certificate = new Certificate(CertificateDefinition);
  await certificate.init();

  console.log(certificate);
}

main();
