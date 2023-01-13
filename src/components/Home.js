import React, {useEffect, useState } from 'react';
import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import axios from "axios";

import MarketplaceJSON from "../Marketplace.json";

const Home = () => {
  const [data,updateData] = useState("");
  const [dataFetched,updateFetched] = useState(false);

  const getAllNFTs = async ()=>{
    console.log("here");
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, provider);
    let transaction = await contract.getAllNFTs()

    const items = await Promise.all(
      transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: "https://nftstorage.link/ipfs/"+meta.image.slice(7),
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))
    console.log(items);
    updateFetched(true);
    updateData(items);
  };

  if(!dataFetched) 
    getAllNFTs();
  
  return (
      <div className="home">
        <Navbar />
        <div className="marketplace">
          <h1>Market Place</h1>
          <div className="nfts">
            {data&&data.map((value, index) => {
                      return <NFTTile data={value} key={index} />;
            })}        
          </div>
        </div>
      </div>
  );
}
 
export default Home;