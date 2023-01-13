// import Navbar from "./Navbar";
// import axie from "../tile.jpeg";
// import { useLocation, useParams } from 'react-router-dom';
// import MarketplaceJSON from "../Marketplace.json";
// import axios from "axios";
// import { useState } from "react";

// export default function NFTPage (props) {

// const [data, updateData] = useState({});
// const [dataFetched, updateDataFetched] = useState(false);
// const [message, updateMessage] = useState("");
// const [currAddress, updateCurrAddress] = useState("0x");

// async function getNFTData(tokenId) {
//     const ethers = require("ethers");
//     //After adding your Hardhat network to your metamask, this code will get providers and signers
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const addr = await signer.getAddress();
//     //Pull the deployed contract instance
//     let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
//     //create an NFT Token
//     const tokenURI = await contract.tokenURI(tokenId);
//     const listedToken = await contract.getListedTokenForId(tokenId);
//     let meta = await axios.get(tokenURI);
//     meta https://gateway.pinata.cloud/ipfs/QmdA2bu2W5wfniVdexCHwS9LttgsdniKjZhS26pYG3usao= meta.data;
//     console.log(listedToken);

//     let item = {
//         price: meta.price,
//         tokenId: tokenId,
//         seller: listedToken.seller,
//         owner: listedToken.owner,
//         image: meta.image,
//         name: meta.name,
//         description: meta.description,
//     }
//     console.log(item);
//     updateData(item);
//     updateDataFetched(true);
//     console.log("address", addr)
//     updateCurrAddress(addr);
// }

// async function buyNFT(tokenId) {
//     try {
//         const ethers = require("ethers");
//         //After adding your Hardhat network to your metamask, this code will get providers and signers
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();

//         //Pull the deployed contract instance
//         let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
//         const salePrice = ethers.utils.parseUnits(data.price, 'ether')
//         updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
//         //run the executeSale function
//         let transaction = await contract.executeSale(tokenId, {value:salePrice});
//         await transaction.wait();

//         alert('You successfully bought the NFT!');
//         updateMessage("");
//     }
//     catch(e) {
//         alert("Upload Error"+e)
//     }
// }

//     const params = useParams();
//     const tokenId = params.tokenId;
//     if(!dataFetched)
//         getNFTData(tokenId);

//     return(
//         <div style={{"min-height":"100vh"}}>
//             <Navbar></Navbar>
//             <div className="flex ml-20 mt-20">
//                 <img src={data.image} alt="" className="w-2/5" />
//                 <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
//                     <div>
//                         Name: {data.name}
//                     </div>
//                     <div>
//                         Description: {data.description}
//                     </div>
//                     <div>
//                         Price: <span className="">{data.price + " ETH"}</span>
//                     </div>
//                     <div>
//                         Owner: <span className="text-sm">{data.owner}</span>
//                     </div>
//                     <div>
//                         Seller: <span className="text-sm">{data.seller}</span>
//                     </div>
//                     <div>
//                     { currAddress == data.owner || currAddress == data.seller ?
//                         <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
//                         : <div className="text-emerald-700">You are the owner of this NFT</div>
//                     }
                    
//                     <div className="text-green text-center mt-3">{message}</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//     catch(e) {
//         alert("Upload Error"+e)
//     }
// }

//     const params = useParams();
//     const tokenId = params.tokenId;
//     if(!dataFetched)
//         getNFTData(tokenId);

//     return(
//         <div style={{"min-height":"100vh"}}>
//             <Navbar></Navbar>
//             <div className="flex ml-20 mt-20">
//                 <img src={data.image} alt="" className="w-2/5" />
//                 <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
//                     <div>
//                         Name: {data.name}
//                     </div>
//                     <div>
//                         Description: {data.description}
//                     </div>
//                     <div>
//                         Price: <span className="">{data.price + " ETH"}</span>
//                     </div>
//                     <div>
//                         Owner: <span className="text-sm">{data.owner}</span>
//                     </div>
//                     <div>
//                         Seller: <span className="text-sm">{data.seller}</span>
//                     </div>
//                     <div>
//                     { currAddress == data.owner || currAddress == data.seller ?
//                         <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
//                         : <div className="text-emerald-700">You are the owner of this NFT</div>
//                     }
                    
//                     <div className="text-green text-center mt-3">{message}</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


import Navbar from "./Navbar";
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import MarketplaceJSON from "../Marketplace.json";
import {ethers} from "ethers";
import axios from "axios";



const NFTPage = () => {
    const [data,updateData] = useState({});
    const [dataFetched,updateDataFetched] = useState(false);
    const [currAddress,updateCurrAddress] = useState("0x");
    const [message,updateMessage] = useState("");

    useEffect(()=>{
        updateDataFetched(false);
    },[message,currAddress])

    const getNFTData = async(tokenId)=>{
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        const contract = new ethers.Contract(MarketplaceJSON.address,MarketplaceJSON.abi,signer);
        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        console.log(listedToken);
        let meta = await axios.get(tokenURI);
        // console.log(meta);
        meta = meta.data;
        let price = ethers.utils.formatUnits(listedToken.price.toString(), 'ether');
        let item = {
            price:price,
            tokenId: tokenId,
            seller: listedToken.currentOwner,
            owner: listedToken.mintedBy,
            image: "https://nftstorage.link/ipfs/"+meta.image.slice(7),
            name: meta.name,
            description: meta.description,
        }
        updateData(item);
        updateDataFetched(true);
        updateCurrAddress(addr);
    }
    const buyNFT = async(tokenId)=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(MarketplaceJSON.address,MarketplaceJSON.abi,signer);
        const salePrice = ethers.utils.parseUnits(data.price,'ether');
        updateMessage("Buying the NFT...");
        let transaction = await contract.executeSale(tokenId,{value:salePrice});
        await transaction.wait();
        alert('You successfully bought the NFT!');
        updateMessage("");
        // window.location.replace("/profile");

    }
    const params = useParams();
    const tokenId = params.tokenid;
    if(!dataFetched){getNFTData(tokenId)}

    window.ethereum.on('accountsChanged',()=>{
        window.location.reload();
    });
    return (  
        <div>
            <Navbar />
            <div className = "NFTPage">
                <img src={data.image} alt="" width="100px"/>
                <h1>{params.tokenid}</h1>
                <h1>Name: {data.name}</h1>
                <h1>Price: {data.price + " ETH"}</h1>
                <h1>Owner: {data.owner}</h1>
                <h1>Seller: {data.seller}</h1>
                {currAddress !== data.seller?<button onClick={()=>buyNFT(tokenId)}>Buy This NFT</button>:<h1>You are the seller of this NFT</h1>}
                <h1>{currAddress}{"   "}{data.seller}</h1>
            </div>
        </div>
    );
}
 
export default NFTPage;
 