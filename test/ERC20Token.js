const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('PlaceholderToken', function () {
  it('Should return correct token name and symbol', async function () {
    const Contract = await ethers.deployContract('PlaceholderToken');
    const contract = await Contract.waitForDeployment();

    const name = await contract.name();
    const symbol = await contract.symbol();

    expect(name).to.equal('Placeholder Token');
    expect(symbol).to.equal('PLC');
  });

  it('Should return correct decimals', async function () {
    const Contract = await ethers.deployContract('PlaceholderToken');
    const contract = await Contract.waitForDeployment();

    const decimals = await contract.decimals();

    expect(decimals).to.equal(2);
  });

  it('Should return correct total supply', async function () {
    const Contract = await ethers.deployContract('PlaceholderToken');
    const contract = await Contract.waitForDeployment();

    const totalSupply = await contract.totalSupply();
    const decimals = await contract.decimals();
    const formattedTotalSupply = ethers.formatUnits(totalSupply, Number(decimals));

    expect(+formattedTotalSupply).to.equal(0);
  });

  it('Should be able to mint tokens', async function () {
    const signers = await ethers.getSigners();
    const owner = signers[0].address;

    const Contract = await ethers.deployContract('PlaceholderToken');
    const contract = await Contract.waitForDeployment();

    const startBalance = await contract.balanceOf(owner);
    const startTotalSupply = await contract.totalSupply();

    let amount = ethers.toBigInt(1000);
    const tx = await contract.mintMore(owner, Number(amount));
    await tx.wait(1);

    const newBalance = await contract.balanceOf(owner);
    const newTotalSupply = await contract.totalSupply();

    const decimals = Number(await contract.decimals());
    amount = amount * ethers.toBigInt(10 ** decimals);

    const expectedBalance = startBalance + amount;
    const expectedTotalSupply = startTotalSupply + amount;

    expect(expectedBalance).to.equal(newBalance);
    expect(expectedTotalSupply).to.equal(newTotalSupply);
  });

  it('Should not allow a non owner to mint', async function () {
    const signers = await ethers.getSigners();
    const nonOwner = signers[1];

    const Contract = await ethers.deployContract('PlaceholderToken');
    const contract = await Contract.waitForDeployment();

    const nonOwnerContractInstance = await ethers.getContractAt('PlaceholderToken', contract.target, nonOwner);

    const startBalance = await contract.balanceOf(nonOwner);

    let amount = ethers.toBigInt(1000);
    await expect(nonOwnerContractInstance.mintMore(nonOwner, Number(amount))).to.be.rejected;

    const newBalance = await contract.balanceOf(nonOwner);
    expect(startBalance).to.equal(newBalance);
  });

  it('Should be able to transfer contract ownership', async function () {
    const signers = await ethers.getSigners();
    const address = signers[1].address;

    const Contract = await ethers.deployContract('PlaceholderToken');
    const contract = await Contract.waitForDeployment();

    const owner = await contract.owner();
    const tx = await contract.transferOwnership(address);
    tx.wait(1);
    const newOwner = await contract.owner();

    expect(newOwner).to.not.equal(owner);
    expect(newOwner).to.equal(address);
  });
});
