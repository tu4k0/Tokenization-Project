const UAHToken = artifacts.require("UAHToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts)=> {

    it("all tokens in my account", async () => {
        let instance = await UAHToken.deployed();
        let totalSupply = await instance.totalSupply();
        //let balance = await instance.balanceOf(accounts[0]);
        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "balance not the same");
        expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
    })

});
