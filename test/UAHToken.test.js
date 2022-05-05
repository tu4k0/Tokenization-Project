const UAHToken = artifacts.require("UAHToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;


require("dotenv").config({path: "../.env"});

contract("Token Test", async (accounts)=> {

    const [deployerAccount, recipient, anotherAccount] = accounts;
    
    beforeEach(async() => {
        this.UAHToken = await UAHToken.new(process.env.INITIAL_TOKENS);
    })

    it("all tokens in my account", async () => {
        let instance = this.UAHToken;
        let totalSupply = await instance.totalSupply();
        //let balance = await instance.balanceOf(accounts[0]);
        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "balance not the same");
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it ("is possible to send tokens between another accounts", async () => {

        const sendTokens = 1;
        let instance =  this.UAHToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it ("is not possible to send more tokens than available", async () => {

        
        let instance =  this.UAHToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount); 
        expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });

});
