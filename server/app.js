const express = require('express');
const {ethers, providers} = require('ethers');
const cors = require('cors');
require('dotenv').config();
const GLStorageABI = require('./abi/GetLoginStorage.json');

const provider = new providers.JsonRpcProvider(process.env.PROVIDER_URL);
let GLStorage = new ethers.Contract(process.env.GL_DATA_CONTRACT, GLStorageABI, provider);

// GLStorage.logicAddress().then(data => {
//     console.log('logic address', data);
// });
// GLStorage.getUser('0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658').then(data => {
//     console.log('user info', data);
// });
// const signer = new ethers.Wallet(data.wallet.privateKey).connect(provider);
// bzzContract = new ethers.Contract(envConfig.bzz.address, tokenData.abi, signer);

const app = express();
app.use(cors());

app.use(express.json());
app.get('/', async (req, res) => {
    res.send({
        result: 'ok',
        'hello': 'world'
    });
});

app.post('/reward', async (req, res) => {
    const {usernameHash} = req.body;

    // todo with getPastEvents get latest wallet for [appId,user] and fund it


    res.send({result: 'ok'});
});

module.exports = app;
