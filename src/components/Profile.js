// import React, {useEffect, useState } from 'react';
// import NFTTile from './NFTTile';

// const Profile = () => {
//     const [address,updateAddress] = useState("0x");
//     const [baseURI,updateBaseURI] = useState("");
//     const [data, updateData] = useState([]);
//     const [dataFetched,updateFetched] = useState(false);

//     const ethers = require("ethers");
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();

//     useEffect(()=>{
//         (async ()=>{
//             const addr = await signer.getAddress();
//             updateAddress(addr);
//         })();

//     },[]);

//     const contractAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
//     const contractAbi = 
//         ["function baseURI() public view virtual returns (string memory)",
//         "function tokenURI(uint256 tokenId) public view virtual override returns (string memory)",];

//     const NFTContract = new ethers.Contract(contractAddress,contractAbi,provider);

//     const getBaseURI = async()=>{
//         updateBaseURI(await NFTContract.baseURI())
//     }

    

//     const getToken = async()=>{
//         for(let i=0;i<5;i++){
//             const _uri = await NFTContract.tokenURI(i);
//             const _completeURI = "https://ipfs.io/ipfs/"+_uri.split("://").at(-1);
//             const _data= await fetch(_completeURI);
//             const _metadata = await _data.json();
//             _metadata["id"] = i;
//             updateData(x=>[...x,_metadata]);

//         }
//         console.log(data);
//     }

//     if(!dataFetched){
//         getToken();
//         updateFetched(true);
//         console.log("typeof",typeof(data))
//     }

    

//     return (  
//         <div className="Profile">
//             <h1>Profile Page</h1>
//             <h2>{address}</h2>
//             <button onClick={getBaseURI}>get baseURI</button>
//             <h2>{baseURI}</h2>
//             <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
//             {data &&<NFTTile NFTs = {data}/>}
//             </div>
//         </div>
//     );
// }
 
// export default Profile;

import React  from 'react';
import Navbar from "./Navbar";
import { useLocation, useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useEffect, useState } from "react";
import NFTTile from "./NFTTile";




export default function Profile () {
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        let sumPrice = 0;
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

        //create an NFT Token
        let transaction = await contract.getMyNFTs()

        /*
        * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
        * and creates an object of information that is to be displayed
        */
        console.log(transaction);
        const items = await Promise.all(
            transaction.map(async i => {
                const tokenURI = await contract.tokenURI(i.tokenId);
                let meta = await axios.get(tokenURI);
                meta = meta.data;
                // console.log("tokenURI",tokenURI);
                // let meta = await fetch(tokenURI);
                // meta = await meta.json();
                // console.log("META",meta);
                

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
                sumPrice += Number(price);
                return item;
        }))

        updateData(items);
        updateFetched(true);
        updateAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if(!dataFetched)
        getNFTData(tokenId);

    window.ethereum.on('accountsChanged',()=>{
        window.location.reload();
    });
    return (
        <div className="profile">
            <Navbar />
            <h2>Wallet Address</h2>
            {address}
            <h2>No. of NFTs</h2>
            {data.length}
            <h2>Total Value</h2>
            {totalPrice} ETH
            <h2>Your NFTs</h2>
            <div className="nfttile">
                {data.map((value,index)=>{
                    return <NFTTile data={value} key={index}/>
                })}
            </div>
        </div>
    )

    // return (
    //     <div className="profileClass" style={{"min-height":"100vh"}}>
    //         <Navbar></Navbar>
    //         <div className="profileClass">
    //         <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
    //             <div className="mb-5">
    //                 <h2 className="font-bold">Wallet Address</h2>  
    //                 {address}
    //             </div>
    //         </div>
    //         <div className="flex flex-row text-center justify-center mt-10 md:text-2xl text-white">
    //                 <div>
    //                     <h2 className="font-bold">No. of NFTs</h2>
    //                     {data.length}
    //                 </div>
    //                 <div className="ml-20">
    //                     <h2 className="font-bold">Total Value</h2>
    //                     {totalPrice} ETH
    //                 </div>
    //         </div>
    //         <div className="flex flex-col text-center items-center mt-11 text-white">
    //             <h2 className="font-bold">Your NFTs</h2>
    //             <div className="flex justify-center flex-wrap max-w-screen-xl">
    //                 {data.map((value, index) => {
    //                 return <NFTTile data={value} key={index}></NFTTile>;
    //                 })}
    //             </div>
    //             <div className="mt-10 text-xl">
    //                 {data.length == 0 ? "Oops, No NFT data to display (Are you logged in?)":""}
    //             </div>
    //         </div>
    //         </div>
    //     </div>
    // )
};