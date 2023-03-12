import { IssuerFactory } from '@utility';

test('check', () => {
  const create = IssuerFactory();

  const id = 'did:web:example.com';
  const privateKey =
    'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  const issuer = create(id, privateKey);
});

test('check', () => {
  const create = IssuerFactory();

  const id = 'did:web:example.com';
  const privateKey =
    'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  const serviceEndpoint = 'https://example.com/profile.json';

  const issuer = create(id, privateKey, serviceEndpoint);
});

