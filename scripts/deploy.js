// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');
const { writeFile } = require('fs/promises');

async function main() {
  // We get the contract to deploy
  const Token = await hre.ethers.getContractFactory('PlaceholderToken');
  const token = await Token.deploy();

  if (process.env.HARDHAT_NETWORK == 'localhost') {
    await token.deployed();
  } else if (process.env.HARDHAT_NETWORK == 'polygon' || process.env.HARDHAT_NETWORK == 'mumbai') {
    await token.deploymentTransaction().wait(10);
    await writeFile(`./address/${process.env.HARDHAT_NETWORK}.txt`, token.target);

    // Verify Contract with Polygonscan
    if (process.env.POLYGONSCAN_API_KEY) {
      require('@nomicfoundation/hardhat-toolbox');
      await hre.run('verify:verify', {
        address: token.target,
        constructorArguments: [],
      });
    }
  }
  console.log('Deployed token address:', token.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
