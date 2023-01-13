
const ethers = require("ethers");

const accounts = ["0x82f8E12CaA0cF2d93883692fAbcf669e205e379b","0x2c3aA65F212De11627188D249b9D90e6E18fa0D8","0x64c5468283044B873Cd9a80aA3Be4A94c4265B72"];
const privateKey = ["71f39d5d3278feb6f5720ebeb6049c473ab41ea1b0a1bcc37fbeb64633b9d1ea","a8a94525b1db669dcc5bfb3de96d04dbeb3d08ceec2928a1be9fe47aab15610d","bac359b8bbc56e07ddabc3d4bfef8c19b456d1c74634fd3ecf14ef75b22bd399"];
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const coinbase = new ethers.Wallet("0xc95c4e45c20601eb1c95d6b18ea4f6ad5ca2f219e94ebd3c499a1d1e5a58ca4d",provider);
const wallets = [];
const send = async()=>{
    for(let i=0;i<accounts.length;i++){
        const wallet = new ethers.Wallet(privateKey[i],provider);
        wallets.push(wallet);
        const tx = {
            to:wallet.address,
            value:ethers.utils.parseEther("100"),
        }
        const receipt = await coinbase.sendTransaction(tx);
        await receipt.wait();
        console.log(`Transaction successful with hash: ${receipt.hash}`);
    }
}


const balance = async()=>{
    for(let i=0;i<wallets.length;i++){
        console.log(ethers.utils.formatEther(await provider.getBalance(wallets[i].address)));
    }
}

(async()=>{
    await send();
    await balance();
})();




