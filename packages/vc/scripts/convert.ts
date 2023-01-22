import * as fs from 'fs';

const keyto = require('@trust/keyto');

if (require.main === module) {
  main();
}

/**
 * main method
 */
async function main() {
  const file = process.argv[2];
  const blk = fs.readFileSync(file, 'utf-8');
  const jwk = keyto.from(blk, 'blk').toJwk('public');

  console.log(`result:${JSON.stringify(jwk, null, 2)}`);
  await fs.writeFileSync( "./hosting/jwk.json" , JSON.stringify(jwk, null, 2));
}