import * as fs from 'fs';
import * as path from 'path';
import { 
    TEMPLATE_DID,
    ISSUER_DID,
    CONTROLLER
} from '../constants';
import JWK from '../hosting/jwk.json';

/**
 * Type DID info
 */
type DID = {
    '@context': string[];
    id?: string;
    service?: {
        id: string;
        type: string;
        serviceEndpoint: string;
    };
    verificationMethod? : {
        id: string;
        controller: string;
        type: string;
        publicKeyxJwk?: string;
    }; 
};

/**
 * output directory
 */
const OUPUT_UNSIGNED_DID_DIR = path.join(
    __dirname,
    '../hosting/'
);

/**
 * generate Did info function
 */
const generateDid = ():DID => {
    // did data
    const did: DID = Object.assign({}, TEMPLATE_DID);

    // service data
    const service = {
        id: '#issuer-profile',
        type: 'IssuerProfile',
        serviceEndpoint: `${ISSUER_DID}`
    };

    // verificationMethod data
    const verificationMethod = {
        id: '#key-1',
        controller: `${CONTROLLER}`,
        type: 'EcdsaSecp256k1VerificationKey2019',
        publicKeyJwk: {
            kty: JWK.kty,
            crv: JWK.crv,
            x: JWK.x,
            y: JWK.y
        }
    };

    // add did info
    did.id = CONTROLLER;
    did.service = service;
    did.verificationMethod = verificationMethod;

    return did;
};

/**
 * main function
 */
const main = async (): Promise<void> => {
    // call generateVC function
    const did = generateDid();
  
    const fileName: string = 'did.json';
    const filePath: string = path.join(OUPUT_UNSIGNED_DID_DIR, fileName);
  
    fs.writeFileSync(filePath, JSON.stringify(did));
};
  
main()
    .then((_) => {
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  