import { providers, Wallet } from "ethers";
import { EthrDID } from "ethr-did";
// import didJWT from "did-jwt";
import { validateRequiredEnvVarsType } from "./util/requiredVarsValid";

async function main() {
	const requiredVars = [
		"ISSUER_ETH_ADDRESS",
		"ISSUER_PRIVATE_KEY",
		"ISSUER_DDO_SERVICE_EP",
		"ISSUER_PROFILE_HOST_URL",
		"ISSUER_PROFILE_NAME",
		// develop
		"DEVNET_NAME",
		"DEVNET_DID_ETHR_REGISTRY_ADDRESS",
		"DEVNET_CHAIN_ID",
		"DEVNET_JSON_RPC_URL",
	];
	const sanitizedEnv = validateRequiredEnvVarsType(requiredVars);

	const provider = new providers.JsonRpcProvider(
		sanitizedEnv.DEVNET_JSON_RPC_URL,
	);
	const wallet = new Wallet(sanitizedEnv.ISSUER_PRIVATE_KEY, provider);
	// const signer = await didJWT.ES256KSigner(
	// 	didJWT.hexToBytes(sanitizedEnv.ISSUER_PRIVATE_KEY),
	// );

	const ethrDid = new EthrDID({
		identifier: `did:ethr:devnet:${sanitizedEnv.ISSUER_ETH_ADDRESS}`,
		privateKey: sanitizedEnv.ISSUER_PRIVATE_KEY,
		chainNameOrId: `0x${Number(sanitizedEnv.DEVNET_CHAIN_ID).toString(16)}`,
		registry: sanitizedEnv.DEVNET_DID_ETHR_REGISTRY_ADDRESS,
		// signer: signer,
		txSigner: wallet,
		// alg: "ES256K",
		provider: provider,
	});

	const txHash = await ethrDid.setAttribute(
		"did/svc/IssuerProfile",
		"https://nc163.github.io/.well-known/profile.json",
	);
}

main();
