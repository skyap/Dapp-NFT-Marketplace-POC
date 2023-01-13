const axios = require('axios');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

const config = {
    method:'get',
    url:'https://api.pinata.cloud/data/testAuthentication',
    headers:{
        pinata_api_key:key,
        pinata_secret_api_key:secret
    }
};

(async()=>{
    const res = await axios(config);

    console.log(res.data);
})();
