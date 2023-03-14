import { ethers } from 'hardhat';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.utils.parseEther('0.001');

  const Contract = await ethers.getContractFactory('CertificateStore');
  const contract = await Contract.deploy(unlockTime, { value: lockedAmount });

  await contract.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount,
    )}ETH and unlock timestamp ${unlockTime} deployed to ${contract.address}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
