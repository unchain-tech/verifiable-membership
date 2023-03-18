import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      chainId: 5,
      url: 'http://localhost:8545',
    },
  },
  paths: {
    sources: './contracts',
    cache: './tmp/cache',
  },
};

export default config;
