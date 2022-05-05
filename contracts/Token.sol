pragma solidity^0.6.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UAHToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Ukrainian hryvna", "UAH") {
        _mint(msg.sender, initialSupply);
    }
}
