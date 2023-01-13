const path = require('path');
const dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname, '.env')});
require("@nomicfoundation/hardhat-toolbox");





dotenv.config({path: path.resolve(__dirname, '.env')});
console.log(process.env.REACT_APP_PRIVATE_KEY);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    local:{
      url:"http://localhost:8545",
      accounts:[process.env.REACT_APP_PRIVATE_KEY]
    },
    // hardhat:{
    //   forking:{
    //     url:"https://eth-mainnet.g.alchemy.com/v2/QyVi33aeZshkh-0MSu-Dw-l6aT9zBEVP",
    //     blockNumber:16162909,
    //     accounts:["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    //   }
    // }
  }
};
