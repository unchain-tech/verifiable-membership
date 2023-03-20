import { IssuerFactory, CertIssuerProfileFactory } from '@utility';
import { assert } from 'console';

test('check', () => {
  const createIssuer = IssuerFactory();
  const createProfile = CertIssuerProfileFactory();

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
  expect(profile.publicKey).not.toBeUndefined();
  if (profile.publicKey === undefined) {
    assert();
    return;
  }

  expect(profile.publicKey).toHaveLength(1);

  const result = profile.publicKey[0].id.replace('ecdsa-koblitz-pubkey:', '');
  expect(result.toLowerCase()).toBe(ethereumaddress.toLowerCase());
});

