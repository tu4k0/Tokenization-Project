var UAHToken = artifacts.require("UAHToken.sol");
var UAHTokenSale = artifacts.require("UAHTokenSale");

module.exports = async function(deployer) {
    
    let addr = await web3.eth.getAccounts();
    
    await deployer.deploy(UAHToken,1000);
    await deployer.deploy(UAHTokenSale, 1, addr[0], UAHToken.address);
    let instance = await UAHToken.deployed();
    instance.transfer(UAHTokenSale.address, 1000);
}
