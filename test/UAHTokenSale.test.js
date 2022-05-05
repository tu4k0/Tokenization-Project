const UAHTokenSale = artifacts.require("UAHTokenSale");
const UAHToken = artifacts.require("UAHToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("TokenSale Test", async (accounts)=> {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it ("should not be any tokens in deployer Account", async () => {
        let instance = await UAHToken.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

});
