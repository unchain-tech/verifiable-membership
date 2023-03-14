import { IssuerFactory, CertificateFactory, IHolder } from '@utility';

import { holders } from './fixture/holder.json';



test('check', () => {
  const create = IssuerFactory();
  const id = 'did:web:example.com';
  const privateKey =
    'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  const issuer = create(id, privateKey);

  const holder: IHolder = holders[0];

  const { createUnsignedCertificate } = CertificateFactory();
  const unsignedCertficate = createUnsignedCertificate(
    issuer.rawDocument,
    holder,
  );
});






