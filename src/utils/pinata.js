
import axios from 'axios';
import FormData from 'form-data';
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;



const uploadFileToIPFS = async(file)=>{
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    let data = new FormData();
    data.append('file',file);

    return axios.post(url,data,{
        maxBodyLength:'Infinity',
        headers:{
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: key,
            pinata_secret_api_key: secret,
        }
    }).then((response)=>{
        console.log("image uploaded",response.data.IpfsHash);
        return{
            success: true,
            ipfsURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
        }
    }).catch((error)=>{
        console.log(error)
        return{
            success:false,
            message:error.message
        }
    });



}

const uploadJSONToIPFS = async(JSONBody) =>{
    const url = 'https://api.pinata.cloud/pinning/pinJSONtoIPFS';
    return axios.post(url,JSONBody,{
        headers:{
            pinata_api_key:key,
            pinata_secret_api_key:secret,
    
        }
    }).then((response)=>{
        console.log("JSON uploaded",response.data.IpfsHash);
        return {
            success:true,
            ipfsURL:"https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
        };
    }).catch((error)=>{
        console.log(error);
        return {
            success: false,
            message:error.message,
        }
    })
};


export {uploadFileToIPFS,uploadJSONToIPFS};