import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

import { validateRequiredEnvVarsType } from "./util/requiredVarsValid";

function didNetworkId(arg: string | number) {
	if (typeof arg === "string") return `${arg}`;
	if (typeof arg === "number") return `0x${arg.toString(16)}`;
}

async function main() {
	const requiredVars = [
		"ISSUER_ETH_ADDRESS",
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

	// console.log(JSON.stringify(sanitizedEnv, null, 2));
	// * { name: 'development', registry: '0x9af37603e98e0dc2b855be647c39abe984fc2445', rpcUrl: 'http://127.0.0.1:8545/' }
	const address = sanitizedEnv.ISSUER_ETH_ADDRESS;
	const ethrResolverConf = {
		name: "devnet",
		description: "develop did store",
		networkId: Number(sanitizedEnv.DEVNET_CHAIN_ID),
		rpcUrl: sanitizedEnv.DEVNET_JSON_RPC_URL,
		chainId: Number(sanitizedEnv.DEVNET_CHAIN_ID),
		registry: sanitizedEnv.DEVNET_DID_ETHR_REGISTRY_ADDRESS,
	};

	const ethResolver = getResolver(ethrResolverConf);
	const resolver = new Resolver(ethResolver);

	const networkId = didNetworkId(ethrResolverConf.name);
	// ethrResolverConf.name
	// 	? ethrResolverConf.name
	// 	: `0x${ethrResolverConf.chainId.toString(16)}`;

	const didUrl = `did:ethr:${networkId}:${address}`;
	const ddo = await resolver.resolve(didUrl);
	console.log(ddo.didDocument);
}

main();
