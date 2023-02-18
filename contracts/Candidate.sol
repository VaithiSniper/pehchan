//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Candidate {

    // status of application of candidate
    enum applicationStatus{
        initalDefault,
        In_Review,
        KYC_Pending,
        Approved     
    }

    //stores metadata of candidate
    struct candidateMetadata {
        string name;
        string party;
        uint age;
        address candidateAddress;
        applicationStatus status;
    }

    // keep track of owner and candidatesCount 
    address payable public owner;
    uint256 public candidatesCount;
    // initalise owner and candidatesCount in constructor
    constructor() {
        candidatesCount = 0;
        owner = payable(msg.sender);
    }

    // serves as a mapping from address to current candidateID that is used to identify candidates
    mapping(address => uint256) candidates;
    // stores corresponing metadata of candidate in corresponding array, at candidateID index position
    candidateMetadata[] candidateMetadataArray;

    event candidateStatus(address candidateAddress, applicationStatus);
    event candidateRemoved(address candidateAddress);


    // modifier onlyOwner() {
    //     require(owner == msg.sender, "You can not add a candidate");
    //     _;
    // }

    function addCandidate(address _candidateAddress, string memory _name, string memory _party, uint8 _age) public {
        // check if application has already been sent
        require(candidates[_candidateAddress] == 0,  "This candidate has already applied");
        // first set the candidateID as value for that address in mapping
        candidates[_candidateAddress] = candidatesCount;
        // set the array's corresponding index with the candidate metadata
        candidateMetadataArray.push(candidateMetadata(_name, _party, _age, _candidateAddress, applicationStatus.In_Review));
        // increment the index
        candidatesCount++;
        // emit event regarding current status for push
        emit candidateStatus(_candidateAddress, applicationStatus.In_Review);
    }

    function upgradeCandidate(address _candidateAddress) public {
        // check if already approved
        require(candidateMetadataArray[candidates[_candidateAddress]].status != applicationStatus.Approved,  "This candidate is already approved");
        // upgrade status
        candidateMetadataArray[candidates[_candidateAddress]].status = applicationStatus(uint(candidateMetadataArray[candidates[_candidateAddress]].status)+1);
        // emit event regarding current status for push
        emit candidateStatus(_candidateAddress, candidateMetadataArray[candidates[_candidateAddress]].status);
    }

    function removeCandidate(address _candidateAddress) public {
        // check if candidate exists
        require(candidateMetadataArray[candidates[_candidateAddress]].status != applicationStatus.initalDefault,  "This candidate doesn't exist");
        // delete the data, might get pruned
        delete candidateMetadataArray[candidates[_candidateAddress]];
        delete candidates[_candidateAddress];
        // emit event regarding deletion for push
        emit candidateRemoved(_candidateAddress);
    }

    function getDataOfCandidate(address _candidateAddress) public view returns(address, candidateMetadata memory) {
        // check if candidate exists
        require(candidateMetadataArray[candidates[_candidateAddress]].status != applicationStatus.initalDefault,  "This candidate doesn't exist");
        // return candidate details
        return (_candidateAddress, candidateMetadataArray[candidates[_candidateAddress]]);
    }

    function getDataOfAllCandidates() public view returns(candidateMetadata[] memory) {
        // check if candidates even exist
        // require(candidateMetadataArray[0],  "This candidate doesn't exist");
        // return candidate details
        return (candidateMetadataArray);
    }

    function getStatusOfCandidate(address _candidateAddress) public view returns(address, applicationStatus) {
        return (_candidateAddress, candidateMetadataArray[candidates[_candidateAddress]].status);
    }

    function isMetatdataArrayEmpty() public view returns(bool) {
        return (candidateMetadataArray.length == 0 ? true : false);
    }

}