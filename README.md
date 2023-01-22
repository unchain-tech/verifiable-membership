# UNCHAIN membership

## Workspaces

```
packages
   |__ client
   |__ contract
   |__ vc
```

You can access the respective yarn commands via

```
yarn workspace [workspace_name] [workspace_command]
```

## Linting & Formatting

Uses [rome](https://rome.tools/). Config in `/rome.json`.

## Precommit hooks

Uses [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks). Config in `/.lintstagedrc.js`.

Initialize with

```
yarn simple-git-hooks
```

## Client

- Next.js v13
- TailwindCSS v3
- Jest

## Contract

- Hardhat
- Solhint

## Referrences

1. [Blockcerts](https://www.blockcerts.org/)
2. [IPFS にファイルを保存してそれをブラウザに表示＋ Blockcerts 検証](https://akutsu0521.medium.com/ipfs%E3%81%AB%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E4%BF%9D%E5%AD%98%E3%81%97%E3%81%A6%E3%81%9D%E3%82%8C%E3%82%92%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AB%E8%A1%A8%E7%A4%BA-blockcerts%E6%A4%9C%E8%A8%BC-4c5cdc967a83)
3. [Blockcerts(GitHub)](https://github.com/blockchain-certificates)
4. [Introducing Blockcerts](https://www.youtube.com/watch?v=5wAyS1e_hOo)
5. [blockcerts-verifier](https://github.com/blockchain-certificates/blockcerts-verifier)
6. [Blockcerts と連動した NFT コントラクト](https://polygonscan.com/address/0xe51496841cd6050a6c17b81b721e60044017ee79#code)
7. [CIT Credentials v1.0](https://opensea.io/assets/matic/0xe51496841cd6050a6c17b81b721e60044017ee79/121)
8. [cert-tools](https://github.com/blockchain-certificates/cert-tools)
9. [cert-issuer](https://github.com/blockchain-certificates/cert-issuer)
10. [cert-schema](https://github.com/blockchain-certificates/cert-schema)
11. [Blockcerts Guide For Absolute Beginners (2021)](https://elamlaquighita.medium.com/blockcerts-guide-for-absolute-beginners-2021-1491a087dcc5)
12. [blockcerts-verifier-js](https://github.com/blockchain-certificates/cert-verifier-js)
13. [Block Explorer](https://www.blockchain.com/explorer)
14. [bitaddress](https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html?testnet=true)
15. [Bitcoin Address Generator](https://blockchain-academy.hs-mittweida.de/bitcoin-address-generator/)
16. [Blockcert Complete Project Step by Step](https://community.blockcerts.org/t/blockcert-complete-project-step-by-step/83)
17. [【Zenn】Blockcerts について調べる](https://zenn.dev/tatsuyasusukida/scraps/67bc1139e5410e#comment-6616e80c13f0b4)
18. [【Zenn】Blockcerts 勉強会〜千葉工業大学の NFT 学修証明書の裏側〜](https://zenn.dev/sakazuki_xyz/articles/eventreport-blockcerts)
19. [【Zenn】ブロックチェーンベースの証明書を検証する blockcerts-verifier の紹介](https://zenn.dev/sakazuki_xyz/articles/blockcerts-verifier)
20. [【Github】nft-vc](https://github.com/pitpa/nft-vc)
21. [【Zenn】Blockcerts を使って Ethereum ブロックチェーン証明書を発行する方法](https://zenn.dev/tatsuyasusukida/articles/issuing-ethereum-certificates-using-blockcerts)
22. [Terraform Docs](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
23. [BlockCerts® Core API](https://team.iam.api.blockcerts.com/docs/index.html)
24. [【Github】digitalcredentials/vc](https://github.com/digitalcredentials/vc)
25. [【Qita】TypeScript で型定義ファイル( d.ts )がないときの対処法](https://qiita.com/Nossa/items/726cc3e67527e896ed1e)
26. [【Qita】超初心者 TypeScript メモ](https://qiita.com/k_hoso/items/a8b9de1f5f6b2b93b4f7)
