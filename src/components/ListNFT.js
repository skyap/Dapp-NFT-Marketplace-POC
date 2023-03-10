// import Navbar from "./Navbar";
// import { useState } from "react";
// import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
// import Marketplace from '../Marketplace.json';
// import { useLocation } from "react-router";

// export default function SellNFT () {
//     const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
//     const [fileURL, setFileURL] = useState(null);
//     const ethers = require("ethers");
//     const [message, updateMessage] = useState('');
//     const location = useLocation();

//     //This function uploads the NFT image to IPFS
//     async function OnChangeFile(e) {
//         var file = e.target.files[0];
//         //check for file extension
//         try {
//             //upload the file to IPFS
//             const response = await uploadFileToIPFS(file);
//             if(response.success === true) {
//                 console.log("Uploaded image to Pinata: ", response.pinataURL)
//                 setFileURL(response.pinataURL);
//             }
//         }
//         catch(e) {
//             console.log("Error during file upload", e);
//         }
//     }

//     //This function uploads the metadata to IPFS
//     async function uploadMetadataToIPFS() {
//         const {name, description, price} = formParams;
//         //Make sure that none of the fields are empty
//         if( !name || !description || !price || !fileURL)
//             return;

//         const nftJSON = {
//             name, description, price, image: fileURL
//         }

//         try {
//             //upload the metadata JSON to IPFS
//             const response = await uploadJSONToIPFS(nftJSON);
//             if(response.success === true){
//                 console.log("Uploaded JSON to Pinata: ", response)
//                 return response.pinataURL;
//             }
//         }
//         catch(e) {
//             console.log("error uploading JSON metadata:", e)
//         }
//     }

//     async function listNFT(e) {
//         e.preventDefault();

//         //Upload data to IPFS
//         try {
//             const metadataURL = await uploadMetadataToIPFS();
//             //After adding your Hardhat network to your metamask, this code will get providers and signers
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             const signer = provider.getSigner();
//             updateMessage("Please wait.. uploading (upto 5 mins)")

//             //Pull the deployed contract instance
//             let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

//             //massage the params to be sent to the create NFT request
//             const price = ethers.utils.parseUnits(formParams.price, 'ether')
//             let listingPrice = await contract.getListPrice()
//             listingPrice = listingPrice.toString()

//             //actually create the NFT
//             let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
//             await transaction.wait()

//             alert("Successfully listed your NFT!");
//             updateMessage("");
//             updateFormParams({ name: '', description: '', price: ''});
//             window.location.replace("/")
//         }
//         catch(e) {
//             alert( "Upload error"+e )
//         }
//     }

//     console.log("Working", process.env);
//     return (
//         <div className="">
//         <Navbar></Navbar>
//         <div className="flex flex-col place-items-center mt-10" id="nftForm">
//             <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
//             <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3>
//                 <div className="mb-4">
//                     <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
//                     <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
//                     <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
//                     <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
//                 </div>
//                 <div>
//                     <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
//                     <input type={"file"} onChange={OnChangeFile}></input>
//                 </div>
//                 <br></br>
//                 <div className="text-green text-center">{message}</div>
//                 <button onClick={listNFT} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
//                     List NFT
//                 </button>
//             </form>
//         </div>
//         </div>
//     )
// }

import React, {useEffect, useState } from 'react';
// import { uploadFileToIPFS, uploadJSONToIPFS } from '../utils/pinata';
import {uploadFileToIPFS,uploadJSONToIPFS}from'../utils/nftstorage';
import Marketplace from '../Marketplace.json';
import {ethers} from 'ethers';
import Navbar from "./Navbar";

const ListNFT = () => {
    // const [fileURL, setFileURL] = useState(null);
    const [formParams,updateFormParams] = useState({name:'',description:'',price:''});
    const [metadataURL,updateMetadataURL] = useState("");
    const [image,setImage]=useState(null);

    const OnChangeFile = async(e)=>{
        setImage(e.target.files[0]);
    }
    // const OnChangeFile = async (e) =>{
    //     let file = e.target.files[0];
    //     try{
    //         const response = await uploadFileToIPFS(file);
    //         console.log("RESPONSE",response);
    //         if(response.success===true){
    //             console.log("Uploaded image to ipfs: ",response.ipfsURL)
    //             setFileURL(response.ipfsURL);
    //         }
    //     }catch(e){
    //         console.log("Error during file upload",e)
    //     }    
    // }

    const uploadMetadatatoIPFS = async()=>{
        const {name,description,price} = formParams;
        if(!name||!description||!price||!image)
            return;
        const nftJSON = {
            name:name,
            description:description,
            image:image,
        }
        try{
            const response = await uploadFileToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to IPFS: ",response)
                return response.ipfsURL;
            }

        }catch(e){
            console.log("error uploading JSON metadata:",e);
        }
    }

    const sellNFT = async(e)=>{
        e.preventDefault();
        console.log("Start Listing NFT");
        console.log("Marketplace.address",Marketplace.address);
        try{
            const metadataURL = await uploadMetadatatoIPFS();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            let contract = new ethers.Contract(Marketplace.address,Marketplace.abi,signer);
            const price = ethers.utils.parseUnits(formParams.price,'ether');
            

            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()
            console.log("metadataURL",metadataURL,price,listingPrice);
            
            let transaction =  await contract.createToken(metadataURL,price,{value:listingPrice});
            await transaction.wait();

            alert("Successfully listed your NFT!");

            
        }catch(e){
            console.log("error token creation: ",e);
        }
    };

    const sellNFTURL = async(e)=>{
        e.preventDefault();
        console.log("sellNFTURL");
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            let contract = new ethers.Contract(Marketplace.address,Marketplace.abi,signer);
            const price = ethers.utils.parseUnits(formParams.price,'ether');


            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()

            let transaction =  await contract.createToken(metadataURL,price,{value:listingPrice});
            await transaction.wait();

            alert("Successfully listed your NFT!");
        }catch(e){
            console.log("error token creation: ",e);
        }
    }
    return (
        <div>
<Navbar />
        <div className="listnft">
            
            <h1>List NFT</h1>
            <h2>Upload NFT to Marketplace</h2>
            <form>
                <label>NFT Name</label>
                <input 
                    type="text"
                    // required
                    placeholder="Dog NFT #"
                    onChange={e=>updateFormParams({...formParams,name:e.target.value})}

                />
                <label>NFT Description</label>
                <textarea 
                    // required
                    placeholder="1000 Dog NFT"
                    onChange={e=>updateFormParams({...formParams,description:e.target.value})}
                />
                <label>Price in ETH</label>
                <input 
                    type="text"
                    // required
                    placeholder="1"
                    onChange={e=>updateFormParams({...formParams,price:e.target.value})}
                />
                <label>Upload Image</label>
                <input type="file" onChange={OnChangeFile}/>

                <button onClick={sellNFT}>List NFT</button>


            </form>
            <form>
                <h2> Sell NFT with Existing Metadata URL</h2>
                <label>Metadata URL </label>
                
                <input 
                    type="text"
                    // required
                    onChange={e=>updateMetadataURL(e.target.value)}
                />
                <button onClick={sellNFTURL}>List NFT with URL</button>
            </form>
        </div>
        </div>
        
      );
}
 
export default ListNFT;