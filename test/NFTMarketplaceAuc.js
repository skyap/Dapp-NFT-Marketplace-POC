const {expect,assert} = require("chai");
const {ethers} = require("hardhat");

let owner,seller1,seller2,buyer1,buyer2,marketplace;


describe("NFTMarketplaceAuc Contract",()=>{
    
    beforeEach("Initial",async()=>{
        [owner,seller1,seller2,buyer1,buyer2] = await ethers.getSigners();
        // console.log("owner:",owner.address,await (await ethers.provider.getBalance(owner.address)).toString());
        // console.log("seller1:",seller1.address,await (await ethers.provider.getBalance(seller1.address)).toString());
        // console.log("seller2:",seller2.address,await (await ethers.provider.getBalance(seller2.address)).toString());
        // console.log("buyer1:",buyer1.address,await (await ethers.provider.getBalance(buyer1.address)).toString());
        // console.log("buyer2:",buyer2.address,await (await ethers.provider.getBalance(buyer2.address)).toString());
        const Token = await ethers.getContractFactory("NFTMarketplaceAuc");
        marketplace = await Token.connect(owner).deploy();

    })
    it("Marketplace owner is owner account",async ()=>{
        marketplace_owner = await marketplace.owner();
        // console.log(marketplace_owner,owner.address);
        expect(owner.address).equal(marketplace_owner);
    });

    it("Set listPrice via owner",async()=>{
        const currentListPrice = await marketplace.getListPrice();
        const setPrice = ethers.utils.parseEther("0.02");
        const result = await marketplace.updateListPrice(setPrice);
        const updateListPrice = await marketplace.getListPrice();
        // console.log(Number(setPrice),Number(updateListPrice));
        expect(Number(setPrice)).equal(Number(updateListPrice));
    });

    it("Create 1 Token",async()=>{
        const result = await marketplace.connect(seller1).createToken("firstToken",ethers.utils.parseEther("1"),{value:ethers.utils.parseEther("0.01")});
        const myNFTs = await marketplace.connect(seller1).getMyNFTs();
        const tokenURI = await marketplace.connect(seller1).tokenURI(myNFTs[0].tokenId.toNumber());
        expect(tokenURI).equal("firstToken");
        expect(myNFTs[0].seller,"information in the NFT not correct").equal(seller1.address);
    });


    it("Create 10 Tokens",async()=>{
        for(let i=0;i<10;i++){
            const result = await marketplace.connect(seller2).createToken("${i}",ethers.utils.parseEther("1"),{value:ethers.utils.parseEther("0.01")});
        }
        
        const myNFTs = await marketplace.connect(seller2).getMyNFTs();
        expect(myNFTs.length).equal(10);
    });

    it("Get all NFTs",async()=>{
        await marketplace.connect(seller1).createToken("firstToken",ethers.utils.parseEther("1"),{value:ethers.utils.parseEther("0.01")});
        for(let i=0;i<10;i++){
            await marketplace.connect(seller2).createToken("${i}",ethers.utils.parseEther("1"),{value:ethers.utils.parseEther("0.01")});
        }
        const myNFTs = await marketplace.getAllNFTs();
        expect(myNFTs.length).equal(11);      
    });

    it("Execute sale token",async()=>{
        await marketplace.connect(seller1).createToken("firstToken",ethers.utils.parseEther("1"),{value:ethers.utils.parseEther("0.01")});
        const k = await marketplace.getListedTokenForId(1);
        console.log((await marketplace.getListedTokenForId(1)).seller,seller1.address);
        expect((await marketplace.getListedTokenForId(1)).seller).to.equal(seller1.address);
        await marketplace.connect(buyer1).executeSale(1,{value:ethers.utils.parseEther("1")});
        expect((await marketplace.getListedTokenForId(1)).seller).to.equal(buyer1.address);

    });

    it("Check msg.sender balance",async()=>{
        const balance = await marketplace.connect(owner).getBalance();
        console.log(balance);
    });


});