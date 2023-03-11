
# memo<!-- omit in toc -->

https://community.blockcerts.org/t/introducing-smart-contracts-to-blockcerts/2362


---

- [準備](#準備)
  - [cert-isserのインストール](#cert-isserのインストール)
- [issuerの作成](#issuerの作成)
- [証明書の発行](#証明書の発行)

# 準備

## cert-isserのインストール

試した環境はubuntu 20.04, python 3.6.15です

```bash
git clone https://github.com/blockchain-certificates/cert-issuer.git -b v3.3.0 .tmp/cert-issuer 
cd .tmp/cert-issuer
python setup.py experimental --blockchain=ethereum install
```
これで cert-issuer がインストールされます。

```bash
$ cert-issuer 
usage: cert-issuer [-h] [-c MY_CONFIG] --issuing_address ISSUING_ADDRESS
                   --verification_method VERIFICATION_METHOD --usb_name
                   USB_NAME --key_file KEY_FILE
                   [--unsigned_certificates_dir UNSIGNED_CERTIFICATES_DIR]
                   [--signed_certificates_dir SIGNED_CERTIFICATES_DIR]
                   [--blockchain_certificates_dir BLOCKCHAIN_CERTIFICATES_DIR]
                   [--work_dir WORK_DIR] [--max_retry MAX_RETRY]
                   [--chain CHAIN] [--safe_mode] [--no_safe_mode]
                   [--dust_threshold DUST_THRESHOLD] [--tx_fee TX_FEE]
                   [--batch_size BATCH_SIZE]
                   [--satoshi_per_byte SATOSHI_PER_BYTE] [--bitcoind]
                   [--no_bitcoind] [--gas_price GAS_PRICE]
                   [--gas_limit GAS_LIMIT]
                   [--etherscan_api_token ETHERSCAN_API_TOKEN]
                   [--ethereum_rpc_url ETHEREUM_RPC_URL]
                   [--ropsten_rpc_url ROPSTEN_RPC_URL]
                   [--goerli_rpc_url GOERLI_RPC_URL]
                   [--sepolia_rpc_url SEPOLIA_RPC_URL]
                   [--blockcypher_api_token BLOCKCYPHER_API_TOKEN]
                   [--context_urls CONTEXT_URLS [CONTEXT_URLS ...]]
                   [--context_file_paths CONTEXT_FILE_PATHS [CONTEXT_FILE_PATHS ...]]
cert-issuer: error: the following arguments are required: --issuing_address, --verification_method, --usb_name, --key_file
```

# issuerの作成

github hosting する場合の例 -> https://github.com/nc163/.well-known

```bash
yarn run create-issuer
```

1. did document を作成
2. profile.json の作成

```bash
yarn run create-issuer
``` -->

# 証明書の発行

1. TBD

