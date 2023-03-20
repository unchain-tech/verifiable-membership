import { Resolver } from 'did-resolver';
import ethr from 'ethr-did-resolver';
import web from 'web-did-resolver';

const resolverFactory = () => {
  const create = (infuraProjectId: string) => {
    const resolver = new Resolver({
      ...web.getResolver(),
      ...ethr.getResolver({ infuraProjectId }),
    });

    return resolver;
  };

  return create;
};

export default resolverFactory;