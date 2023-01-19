import * as fs from 'fs';
import * as keyto from '@trust/keyto';

if (require.main === module) {
  main();
}

/**
 * main method
 */
function main() {
  const file = process.argv[2];
  const blk = fs.readFileSync(file, 'utf-8');
  const key = keyto.from(blk, 'blk');
  const jwk = keyto.toJwk('public');

  console.log(JSON.stringify(jwk, null, 2));
}
