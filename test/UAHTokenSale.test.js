const UAHTokenSale = artifacts.require("UAHTokenSale");
const UAHToken = artifacts.require("UAHToken");
const KYC = artifacts.require("KYC");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("TokenSale Test", async (accounts)=> {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it ("should not be any tokens in deployer Account", async () => {
        let instance = await UAHToken.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

    it ("all tokens should be in a TokenSale smart contract", async () => {
        let instance = await UAHToken.deployed();
        let balanceOfTokenSaleSmartContract = await instance.balanceOf(UAHTokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect (balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    })

    it ("it possible to buy tokens from tokensale", async () => {
        let tokenInstance = await UAHToken.deployed();
        let tokenSaleInstance = await UAHTokenSale.deployed();
        let KYCInstance = await KYC.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        await KYCInstance.setKYCCompleted(deployerAccount, {from: deployerAccount});
        expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        balanceBefore = balanceBefore.add(new BN(1));
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
    })

})
