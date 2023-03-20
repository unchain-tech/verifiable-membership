import { HardhatUserConfig } from "hardhat/config";
import env from "dotenv";

env.config();

const localhost = {
	chainId: Number(process.env["DEVNET_CHAIN_ID"]),
	url: process.env["DEVNET_JSON_RPC_URL"],
};

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.17",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		localhost: localhost,
	},
	paths: {
		sources: "./contracts",
		cache: ".tmp/cache",
	},
};

export default config;
