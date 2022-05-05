var UAHToken = artifacts.require("Token.sol");

module.exports = async function(deployer){
    await deployer.deploy(UAHToken, 1000);
}
