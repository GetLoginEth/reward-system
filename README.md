# Reward system example with GetLogin

This is an example of a GetLogin-based reward system implementation. This repository presents the client and server in a minimal implementation.

The front-end page is visited by a user who wants to receive an reward. The test page connects GetLogin scripts and checks if this page is allowed to access user information. If user actions are needed, he is redirected to the GetLogin page. On this page, the user must give permission to access his information.

After receiving permission from the user, it is redirected to the client side of this repository. Along with the redirection, the client part receives a unique user identifier and the address of his wallet, which is tied only to this application.

The client part sends the received information to the server. The server uses GetLogin smart contract data to double-check whether the received wallet address is tied to any GetLogin user.

After successful verification, the back-end can mark the user's unique ID as used and send the reward to the specified address.

## Start server part

Run `cd server`, `yarn`.

Copy `env.example` to `.env`, fill it with params.

`NETWORK_ID` - GetLogin network, 100 for xDai Mainnet

`PROVIDER_URL` - getblock.io, for example

`GL_DATA_CONTRACT` - GetLogin storage contract. You can get it from the repo https://github.com/GetLoginEth/login/blob/master/src/smart/build/contracts/GetLoginStorage.out.json from `address` field.

`REWARD_PRIVATE_KEY` - private key with all funds for rewarding

`GL_APP_ID` - GetLogin app id. You can receive it after registering your app at https://getlogin.org/developers

Run `node index.js`

## Start client side

Define at `App.js` file.

`REWARD_APP_ID` - the same `GL_APP_ID` from client side.

`GL_BASE_URL` - location of GetLogin. Production version is `https://getlogin.org/`

`API_URL` - url where server part hosted. Make sure you configured CORS.

Run

`yarn`

`yarn start`

Make sure you host your project under https (for dev and prod).

## CORS on development stage

If you are using develop version of GetLogin while developing and receive CORS error, try this extension to disable CORS https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en
