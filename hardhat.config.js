require('@nomicfoundation/hardhat-toolbox');

const privateKey = '0x70a7e3ac2da728f5001df87c0cec7b07ebe44dcc3de2e08c1cf5d38a053e4f8c';

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
  }
};