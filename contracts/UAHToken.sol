pragma solidity^0.6.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract UAHToken is ERC20, ERC20Detailed {
    constructor(uint256 initialSupply) ERC20Detailed("Ukrainian hryvna", "UAH", 0) public {
        _mint(msg.sender, initialSupply);
    }
}
