//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Candidate {

    struct candidateDetails {
        string name;
        string party;
        uint age;
        bool isAdded;
    }

    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    mapping(address => candidateDetails) candidates;

    event Message(string _value);
    event GetDetailsOfCandidate(candidateDetails details);

    modifier onlyOwner() {
        require(owner == msg.sender, "You can not add a candidate");
        _;
    }

    function addCandidate(address _candidateAddress, string memory _name, string memory _party, uint _age) public onlyOwner {
        require(!candidates[_candidateAddress].isAdded, "This candidate is already added");
        candidates[_candidateAddress].name = _name;
        candidates[_candidateAddress].party = _party;
        candidates[_candidateAddress].age = _age;
        candidates[_candidateAddress].isAdded = true;
        emit Message("Successfully added");
    }

    function removeCandidate(address _candidateAddress) public onlyOwner {
        require(candidates[_candidateAddress].isAdded, "This candidate doesn't exist");
        delete candidates[_candidateAddress];
        emit Message("Successfully removed");
    }

    function getDataOfCandidate(address _candidateAddress) public view onlyOwner returns(address, candidateDetails memory) {
        require(candidates[_candidateAddress].isAdded, "This candidate doesn't exist");
        return (_candidateAddress, candidates[_candidateAddress]);
    }

}