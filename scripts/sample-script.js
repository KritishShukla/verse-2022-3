const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Verse = await hre.ethers.getContractFactory("Verse");
  const verse = await Verse.deploy();
  await verse.deployed();
  console.log("verse deployed to:", verse.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(verse.address);
  await nft.deployed();
  console.log("nft deployed to:", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
