const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplaceAuc");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Marketplace.json', JSON.stringify(data))
  return marketplace
}

main()
  .then((marketplace) => {
    console.log("Success deploy:",marketplace.address)
    process.exit(0)
  })
  .catch((error) => {
    console.error("DEPLOY ERROR:",error);
    process.exit(1);
  });
