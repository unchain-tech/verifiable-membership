import { ethers } from 'hardhat';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.utils.parseEther('0.001');

  const EthereumDIDRegistry = await ethers.getContractFactory(
    'EthereumDIDRegistry',
  );
  const contract = await EthereumDIDRegistry.deploy();

  await contract.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount,
    )}ETH and unlock timestamp ${unlockTime} deployed to ${contract.address}`,
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});