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
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/c9657d3c5621495c9f6b60c3913df958',
      accounts: [privateKey],
    },
    polygon: {
      url: 'https://polygon-mainnet.infura.io/v3/c9657d3c5621495c9f6b60c3913df958',
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
