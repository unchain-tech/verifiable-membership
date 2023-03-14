
# memo<!-- omit in toc -->

https://community.blockcerts.org/t/introducing-smart-contracts-to-blockcerts/2362


---

- [準備](#準備)
  - [cert-isserのインストール](#cert-isserのインストール)
- [issuerの作成](#issuerの作成)
- [証明書の発行](#証明書の発行)

# 準備

## cert-isserのインストール

試した環境はubuntu 20.04, python 3.9.13です. pyenvを使っている場合は.python-versionに基づいて自動で切り替わります。

```bash
yarn run setup:cert-issuer

or

git clone https://github.com/blockchain-certificates/cert-issuer.git -b v3.3.0 .tmp/cert-issuer 
cd .tmp/cert-issuer
python setup.py experimental --blockchain=ethereum install
```

# issuerの作成

github hosting する場合の例 -> https://github.com/nc163/.well-known

1. issuer の did document, profile を作成

```bash
yarn run setup:issuer
```

# 証明書の発行


```bash
yarn run devnet
yarn run grant:devnet
```


