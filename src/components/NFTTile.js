// import axie from "../tile.jpeg";
// import {
//     BrowserRouter as Router,
//     Link,
//   } from "react-router-dom";

// function NFTTile (data) {
//     const newTo = {
//         pathname:"/nftPage/"+data.data.tokenId
//     }
//     return (
//         <Link to={newTo}>
//         <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
//             <img src={data.data.image} alt="" className="w-72 h-80 rounded-lg object-cover" />
//             <div className= "text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
//                 <strong className="text-xl">{data.data.name}</strong>
//                 <p className="display-inline">
//                     {data.data.description}
//                 </p>
//             </div>
//         </div>
//         </Link>
//     )
// }

// export default NFTTile;

// import React, {useEffect, useState } from 'react';

// const NFTTile = ({NFTs})=>{
//     console.log("RUN TWO TIME????")
//     return(
//         <div className = "NFTTile">
//             {
//                 NFTs.map(nft=>(
//                     <div className="images" key={nft.image} >
//                         <img src={"https://ipfs.io/ipfs/"+nft.image.split("://").at(-1)} alt="" width="100px" key={nft.id}/>
//                         <h2>{nft.id}</h2>
//                         {
//                             nft.attributes.map(
//                                 (att,id)=>(
//                                     <h3 key={id}>{att.trait_type}: {att.value}</h3>
//                                 )
//                             )
//                         }
//                         {/* <h2>{nft.image.split("://").at(-1)}</h2> */}
//                     </div>
//                 ))
//             }
//         </div>
//     );

// };

// export default NFTTile;

import React, {useEffect, useState } from 'react';
import { Link } from "react-router-dom";
const NFTTile = (data)=>{
    // const newTo = { pathname:"/nftpage/"+data.data.tokenId};
    const newTo = "/nftpage/"+data.data.tokenId;
    return(
        <Link to={newTo}>
            <div className = "NFTTile">
                <img src={data.data.image} alt="" className="nftimage" width="100px"/>
                <h2>{data.data.name}</h2>
                <h3>{data.data.description}</h3>
                <h3>price:{data.data.price}</h3>
            </div>
        </Link>
    );

};

export default NFTTile;
