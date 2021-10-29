// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FunPortal {
    uint256 totalFuns;
    mapping(address=>uint)  funnersCount;

    constructor() {
        console.log("Yo yo, I am a contract am I am smart");
    }

    function Fun() public {
        totalFuns += 1;
        funnersCount[msg.sender]++;
        console.log("%s has send some fun stuff!", msg.sender);
    }

    function getTotalFuns() public view returns (uint256) {
        console.log("We have %d total funs stuffs!", totalFuns);
        return totalFuns;
    }
    function getFunners(address _funnerAddress) public view returns(uint256){
        return funnersCount[_funnerAddress];
    }
}