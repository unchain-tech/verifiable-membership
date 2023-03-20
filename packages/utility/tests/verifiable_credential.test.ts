import { Certificate } from '@blockcerts/cert-verifier-js';
import {
  IssuerFactory,
  CertIssuerProfileFactory,
  CertificateFactory,
} from '@utility';

import type { IHolder } from '@utility';
import { holders } from './fixture/holder.json';

test('check', async () => {
  const createIssuer = IssuerFactory();
  const createProfile = CertIssuerProfileFactory();
  const { createUnsignedCertificate } = CertificateFactory();
  const holder: IHolder = holders[0];

  const id = 'did:web:example.com';
  const ethereumaddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  const privateKey =
    'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  const issuer = createIssuer(id, privateKey);
  const profile = createProfile(
    'https://example.com/profile.json',
    issuer,
    'example',
  );

  let certificateUnsigned = createUnsignedCertificate(
    issuer.rawDocument,
    holder,
  );

  let certificate = new Certificate(certificateUnsigned.rawDocument);
  await certificate.init();
});
