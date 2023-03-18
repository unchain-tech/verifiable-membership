import { Resolver } from 'did-resolver';
import ethr from 'ethr-did-resolver';
import web from 'web-did-resolver';

const resolver = new Resolver({
  ...web.getResolver(),
  ...ethr.getResolver({
    rpcUrl: 'http://127.0.0.1:8545/',
    chainId: 5,
    registry: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  }),
});

// resolver.resolve();

