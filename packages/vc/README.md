# VC発行手順

### 事前準備

1. `keys/key_file.txt`にMetaMaskの秘密鍵を格納すること
2. バケット名を決めておくこと

### JWK形式の公開鍵情報を生成する。

```bash
yarn convert
```

生成された内容を`did.json`の`publicKeyJwk`のところに貼り付ける。

### GCPにバケットを作成し、そこにファイルを格納する。

```bash
yarn create:bucket
``` 

```bash
google_storage_bucket.my_bucket: Creating...
google_storage_bucket.my_bucket: Creation complete after 2s [id=blockcerts-20230113]
google_storage_bucket_iam_binding.public_rule: Creating...
google_storage_bucket_object.profile: Creating...
google_storage_bucket_object.did: Creating...
google_storage_bucket_object.did: Creation complete after 1s [id=blockcerts-20230113-.well-known/did.json]
google_storage_bucket_object.profile: Creation complete after 1s [id=blockcerts-20230113-profile.json]
google_storage_bucket_iam_binding.public_rule: Creation complete after 5s [id=b/blockcerts-20230113/roles/storage.legacyObjectReader]

Apply complete! Resources: 4 added, 0 changed, 0 destroyed.
✨  Done in 19.68s.
```

うまくいけばアップロードされてネットから見れる様になる。  
今回は下記URL  

- [https://blockcerts-20230113.storage.googleapis.com/.well-known/did.json](https://blockcerts-20230113.storage.googleapis.com/.well-known/did.json)

- [https://blockcerts-20230113.storage.googleapis.com/profile.json](https://blockcerts-20230113.storage.googleapis.com/profile.json)

### VCの発行

```bash
yarn issue:vc
```

うまくいけば、`data/blockchain_certificates/my_certificate.json`が生成され、proofを含んだ形となる。

```json
{
    "@context": [
        "https://www.w3.org/2018/credentials/v1", 
        "https://w3id.org/blockcerts/v3"
    ], 
    "id": "urn:uuid:bbba8553-8ec1-445f-82c9-a57251dd731c", 
    "type": [
        "VerifiableCredential", 
        "BlockcertsCredential"
    ], 
    "issuer": "did:web:blockcerts-20230113.storage.googleapis.com", 
    "issuanceDate": "2023-01-04T00:00:00Z", 
    "credentialSubject": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21"
    }, 
    "proof": {
        "type": "MerkleProof2019", 
        "created": "2023-01-13T20:30:17.823175", 
        "proofValue": "z7veGu1qoKR3AS5AYzFRX2cJXF4ajmeuQT8Xu32oMMcCRLbFAT7kLp8WhV1i4qBSqHyYvXt4pVVEcwSGiL6C5i3L35Ce7G6MjsJeWe8rNEzyNY6VA1mWk7sQoYk9bvzTkX2cB91EncaEKo7d9fjigJgWT7LqNU1BV5FmEbyAWasVLkd6Ji5wR6JVU428hyFY8WxJ8A3hVPyNk5bV76Ph9EEfvdh9zxaUntjnqf1bhaafhc9XvV898e2AeTzoxb8k6uGyg6aDkozon2moMwqT63inK26Lh27kDhnVZKjWfCjGpmFrEb4g9Y", "proofPurpose": "assertionMethod", 
        "verificationMethod": "did:web:blockcerts-20230113.storage.googleapis.com#key-1"
    }
}
```

