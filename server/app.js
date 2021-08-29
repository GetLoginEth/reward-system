const express = require('express');
const {ethers, providers} = require('ethers');
const cors = require('cors');
require('dotenv').config();
const GLStorageABI = require('./abi/GetLoginStorage.json');

const appId = process.env.GL_APP_ID;
const provider = new providers.JsonRpcProvider(process.env.PROVIDER_URL);
let GLStorage = new ethers.Contract(process.env.GL_DATA_CONTRACT, GLStorageABI, provider);

async function isCorrectAddress(address, usernameHash) {
    const data = await GLStorage.UsersAddressUsername(address);

    return data.username === usernameHash && data.isActive;
}

const app = express();
app.use(cors());

app.use(express.json());
app.get('/', async (req, res) => {
    res.send({
        result: 'ok',
        'hello': 'world',
    });
});

app.post('/reward', async (req, res) => {
    const {address, usernameHash} = req.body;

    console.log('reward', appId, address, usernameHash);
    const result = await isCorrectAddress(address, usernameHash);

    if (result) {
        // todo reward here!!!
        // const signer = new ethers.Wallet(data.wallet.privateKey).connect(provider);
        // bzzContract = new ethers.Contract(envConfig.bzz.address, tokenData.abi, signer);
    }

    res.send({
        result
    });
});

module.exports = app;
