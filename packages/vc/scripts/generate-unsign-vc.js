/**
 * generate unsigned VCs Script
 */

const fs = require("fs")
const path = require("path")
const uuidv4 = require("uuid").v4

/**
 * 出力先フォルダ
 */
const OUPUT_UNSIGNED_VC_DIR = path.join(
    __dirname,
    "../data/work/unsigned_certificates/"
);

/**
 * VC用サンプル画像フォルダ
 */
const VC_IMAGE_PATH = path.join(
    __dirname,
    "../assets/vc-img/sample.svg"
);

// 各種定数(ここは柔軟に入れ替えられるようにしてあげる必要あり)
const UUID_PREFIX = "arn:uuid:"
const MEMBER_ID = "9415"
const WALLET_ADDRESS = "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072"
const ISSUER_DID = "https://blockcerts-20230113.storage.googleapis.com/profile.json"

const TITLE = "UNCHAIN Membership VC";
const DESCRIPTION = "これは、UNCHAINエントリー用のメンバーシップVCです。";
const DESCRIPTION_JP = "This is a membership VC for UNCHAIN.";

/**
 * VCのテンプレ
 */
const TEMPLATE_VC = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/blockcerts/v3",
    ],
    type: [
        "VerifiableCredential",
        "BlockcertsCredential"
    ],
    credentialSubject: {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21"
    }
}

/**
 * generateVC function
 * @returns 
 */
const generateVC = () => {
    // issue date
    var ISSUANCE_DATE = `${new·Date().toISOString().split("Z")[0].split(".")[0]}Z`

    // meta data
    const metadataBody = {
      title: TITLE,
      description: DESCRIPTION,
      descriptionJp: DESCRIPTION_JP,
    }
    // VC data
    const vc = Object.assign({}, TEMPLATE_VC);

    vc.id = `${UUID_PREFIX}${MEMBER_ID}`
    vc.issuer = `${ISSUER_DID}`
    vc.issuanceDate = `${ISSUANCE_DATE}`
    vc.metadata = JSON.stringify(metadataBody)
    vc.display = {
      contentMediaType: "image/svg+xml",
      contentEncoding: "base64",
      content: fs.readFileSync(VC_IMAGE_PATH).toString("base64"),
    }
    vc.nonce = uuidv4()
    vc.credentialSubject = {
      id: `did:ethr:${WALLET_ADDRESS}`,
    }

    return vc;
};

/**
 * main function
 */
const main = async () => {
    // call generateVC function
    const vc = generateVC();

    const fileName = "sample.json";
    const filePath = path.join(OUPUT_UNSIGNED_VC_DIR, fileName);

    fs.writeFileSync(filePath, JSON.stringify(vc));
};

main()
  .then((_) => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  });
