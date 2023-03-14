const {
  Certificate,
} = require('@blockcerts/cert-verifier-js/dist/verifier-node.js');
const certificateDefinition = require('./fixture/0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC.json');

async function main() {
  // console.log(certificateDefinition);
  const certificate = new Certificate(certificateDefinition);
  await certificate.init();

  console.log(certificate);
}

main();