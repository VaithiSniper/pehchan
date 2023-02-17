//SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

contract SendWithdrawMoney {

    event TokensReceived(address _from, address _to, uint _amount);
    event TokensWithdrawn(address _from, address _to, uint _amount);

    uint public balanceReceived;
    uint public remainingAmt;

    function deposit() public payable {
        balanceReceived += msg.value;
        emit TokensReceived(msg.sender, address(this), msg.value);
    }

    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    function withdrawAll() public {
        address payable to = payable(msg.sender);
        remainingAmt = getContractBalance();
        to.transfer(remainingAmt);
        emit TokensWithdrawn(address(this), msg.sender, remainingAmt);
    }

    function withdrawToAddress(address payable _to) public {
        remainingAmt = getContractBalance();
        _to.transfer(remainingAmt);
        emit TokensWithdrawn(address(this), _to, remainingAmt);
    }
}