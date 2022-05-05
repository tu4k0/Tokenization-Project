var UAHToken = artifacts.require("UAHToken.sol");
var UAHTokenSale = artifacts.require("UAHTokenSale");
require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
    
    let addr = await web3.eth.getAccounts();
    
    await deployer.deploy(UAHToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(UAHTokenSale, 1, addr[0], UAHToken.address);
    let instance = await UAHToken.deployed();
    instance.transfer(UAHTokenSale.address, process.env.INITIAL_TOKENS);
}
