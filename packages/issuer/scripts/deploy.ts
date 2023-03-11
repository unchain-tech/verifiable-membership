import { ethers, upgrades } from 'hardhat';

async function main() {
  const contractFactory = await ethers.getContractFactory(
    'VerifiableMembership',
  );

  const contract = await upgrades.deployProxy(contractFactory);
  console.log('Contract deployed to:', contract.address);

  //const contractFactory_v2 = await ethers.getContractFactory('VerifiableMembership_v2');
  //const contract_v2 = await upgrades.upgradeProxy(contract.address, contractFactory_v2);
  //await contract_v2.deployed();
  // console.log('Contract upgraded to:', v2Contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
