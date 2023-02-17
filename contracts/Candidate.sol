//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Candidate {

    enum applicationStatus{
        initalDefault,
        In_Review,
        KYC_Pending,
        Approved     
    }

    struct candidateDetails {
        uint256 candidateID;
        applicationStatus status;
    }

    struct candidateMetadata {
        string name;
        string party;
        uint age;
    }

    address payable public owner;
    uint256 public candidatesCount;

    constructor() {
        candidatesCount = 0;
        owner = payable(msg.sender);
    }

    mapping(address => candidateDetails) candidates;
    // uint candidateDetailsArraySize = 127;
    // candidateMetadata[] public candidateMetadataArray = new candidateMetadata[](candidateDetailsArraySize);
    candidateMetadata[] public candidateMetadataArray;

    event candidateStatus(address candidateAddress, applicationStatus);
    event candidateRemoved(address candidateAddress);


    // modifier onlyOwner() {
    //     require(owner == msg.sender, "You can not add a candidate");
    //     _;
    // }

    function addCandidate(address _candidateAddress, string memory _name, string memory _party, uint _age) public {
        // check if application has already been sent
        require(candidates[_candidateAddress].status != applicationStatus.initalDefault,  "This candidate has already applied");
        // move the application status to in review
        candidates[_candidateAddress].status = applicationStatus(uint(candidates[_candidateAddress].status)+1);
        // set candidateid as the i// check if application has already been sentndex
        candidates[_candidateAddress].candidateID = candidatesCount;
        // set the array's corresponding index with this data
        candidateMetadataArray.push(candidateMetadata(_name, _party, _age));
        // increment the index
        candidatesCount++;
        // emit event regarding current status for push
        emit candidateStatus(_candidateAddress, candidates[_candidateAddress].status);
    }

    function upgradeCandidate(address _candidateAddress) public {
        // check if already approved
        require(candidates[_candidateAddress].status == applicationStatus.Approved,  "This candidate is already approved");
        // upgrade status
        candidates[_candidateAddress].status = applicationStatus(uint(candidates[_candidateAddress].status)+1);
        // emit event regarding current status for push
        emit candidateStatus(_candidateAddress, candidates[_candidateAddress].status);
    }

    function removeCandidate(address _candidateAddress) public {
        // check if candidate exists
        require(candidates[_candidateAddress].status == applicationStatus.initalDefault,  "This candidate doesn't exist");
        // delete the data, might get pruned
        delete candidates[_candidateAddress];
        // emit event regarding deletion for push
        emit candidateRemoved(_candidateAddress);
    }

    function getDataOfCandidate(address _candidateAddress) public view returns(address, candidateMetadata memory) {
        // check if candidate exists
        require(candidates[_candidateAddress].status == applicationStatus.initalDefault,  "This candidate doesn't exist");
        // return candidate details
        return (_candidateAddress, candidateMetadataArray[candidates[_candidateAddress].candidateID]);
    }

    function getStatusOfCandidate(address _candidateAddress) public view returns(address, applicationStatus) {
        return (_candidateAddress, candidates[_candidateAddress].status);
    }

}