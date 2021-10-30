// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FunPortal {
    uint256 totalFuns;
    struct FunMessage{
        string Message;
        address funSender;
        uint timestamp;
    }
    FunMessage[] FunMessages;
    mapping(address=>FunMessage)  funnerDetails;

    constructor() {
        console.log("Yo yo, I am a contract am I am smart");
    }

    function Fun(string memory _funMessage) public {
        totalFuns += 1;
        FunMessage memory funMessage=FunMessage(_funMessage,msg.sender,block.timestamp);

FunMessages.push(funMessage);
         funnerDetails[msg.sender]=funMessage;
        console.log("%s has send some fun stuff!", msg.sender);
    }

    function getTotalFuns() public view returns (uint256) {
        console.log("We have %d total funs stuffs!", totalFuns);
        return totalFuns;
    }
        function returnMessageDetails(address _address) public view returns(FunMessage memory) {
        return funnerDetails[_address];
    }
           function returnMessageDetailss() public view returns(FunMessage[] memory) {
        return FunMessages;
    }
 
}