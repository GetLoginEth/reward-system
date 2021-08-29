# Reward system example with GetLogin

Copy `server/env.example` to `server/.env`, fill it with params

`NETWORK_ID` - GetLogin network, 100 for xDai Mainnet

`PROVIDER_URL` - getblock.io, for example

`GL_DATA_CONTRACT` - GetLogin data contract, please get it from the repo https://github.com/GetLoginEth/login

`REWARD_PRIVATE_KEY` - private key with all funds for rewarding

## CORS on development stage

If you are using develop version of GetLogin while developing and receive CORS error, try this extension to disable CORS https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en
