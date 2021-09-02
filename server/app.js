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

async function getSentInvites(usernameHash) {
    const filter = GLStorage.filters.EventInviteCreated(usernameHash);

    return (await GLStorage.queryFilter(filter)).map(item => item.args.inviteAddress);
}

async function getInviteStatuses(invites) {
    let result = [];
    for (let i = 0; i < invites.length; i++) {
        const address = invites[i];
        const data = await GLStorage.Invites(address);

        result.push({
            address,
            registered: !data.isActive
        });
    }

    return result;
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

    // const signer = new ethers.Wallet(data.wallet.privateKey).connect(provider);
    // bzzContract = new ethers.Contract(envConfig.bzz.address, tokenData.abi, signer);
    if (result) {
        // todo reward here!!!

        // todo address which received this method is the address only for FairDrive (session)
        // todo if you want to receive user's main address, call `getUser(usernameHash)` method from contract and get `mainAddress` field

        // in case we should reward user depends on invites count
        // we could use ethers events filter system - https://docs.ethers.io/v5/api/contract/contract/#Contract--filters
        // example of using

        /*
        const data = await getSentInvites(usernameHash);
        console.log('invites', data)
        const statuses = getInviteStatuses(data);
        console.log('statuses', statuses);
         */
    }

    res.send({
        result
    });
});

module.exports = app;
