// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PlaceholderToken is ERC20, Ownable {
    constructor() ERC20("Placeholder Token", "PLC") {}

    function decimals() public view virtual override returns (uint8) {
        return 2;
    }

    function mintMore(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * (10 ** decimals()));
    }
}
