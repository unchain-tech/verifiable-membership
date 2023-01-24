import * as fs from 'fs';
import * as path from 'path';
import { 
    TEMPLATE_PROFILE,
    ISSUER_DID,
    WALLET_ADDRESS
} from '../constants';

/**
 * Profile Type
 */
type Profile = {
    '@context': string[];
    type: string;
    id?: string;
    name?: string;
    url?: string;
    email?: string;
    publicKey?: {
        id: string;
    };
  };

/**
 * output directory
 */
const OUPUT_UNSIGNED_PROFILE_DIR = path.join(
    __dirname,
    '../hosting/'
);

/**
 * generate Profile info function
 */
const generateProfile = (): Profile => {
    // profile data
    const profile: Profile = Object.assign({}, TEMPLATE_PROFILE);

    // add peofile data
    profile.id = ISSUER_DID;
    profile.name = 'mashharuki';
    profile.url = 'https://www.resume.id/haru28675#_=_';
    profile.email = 'blockcerts@gmail.com';
    profile.publicKey = {
        id: `ecdsa-koblitz-pubkey:${WALLET_ADDRESS}`,
    };

    return profile;
};

/**
 * main function
 */
const main = async (): Promise<void> => {
    // call generateVC function
    const profile = generateProfile();
  
    const fileName: string = 'profile.json';
    const filePath: string = path.join(OUPUT_UNSIGNED_PROFILE_DIR, fileName);
  
    fs.writeFileSync(filePath, JSON.stringify(profile));
};
  
main()
    .then((_) => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
