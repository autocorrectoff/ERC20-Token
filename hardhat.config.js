require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  console.error(
    '\x1b[31m',
    "Whooops! We can't do this without a private key. Did you remember to place your private key in the .env file?",
  );
  process.exit(1);
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.9',
  paths: {
    artifacts: './artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: 'https://speedy-nodes-nyc.moralis.io/68be5cfb5f3e5bf20da7d6b0/eth/rinkeby',
      accounts: [privateKey],
    },
    //   mumbai: {},
    //   polygon: {}
  },
};
