declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: "development" | "production" | "test";

		readonly ISSUER_ETH_ADDRESS: string;
		readonly ISSUER_PRIVATE_KEY: string;
		readonly ISSUER_DDO_ID: string;
		readonly ISSUER_PROFILE_HOST_URL: string;

		readonly DEVNET_NAME: string;
		readonly DEVNET_DID_ETHR_REGISTRY_ADDRESS: string;
		readonly DEVNET_CHAIN_ID: number;
		readonly DEVNET_JSON_RPC_URL: string;
	}
}
