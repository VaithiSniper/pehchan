//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;



contract Voter {

    // status of application of candidate
    enum applicationStatus{
        initalDefault,
        In_Review,
        KYC_Pending,
        Approved     
    }

    //stores metadata of candidate
    struct voterMetaData {
        string name;
        uint age;
        address voterAddress;
        applicationStatus status;
        uint256 ccode;
    }

    // keep track of owner and candidatesCount 
    address payable public owner;
    uint256 public voterCount;
    // initalise owner and candidatesCount in constructor
    constructor() {
        voterCount = 0;
        owner = payable(msg.sender);
    }

    // serves as a mapping from address to current candidateID that is used to identify candidates
    mapping(address => uint256) voters;
    // stores corresponing metadata of candidate in corresponding array, at candidateID index position
    voterMetaData[] voterMetaDataArray;

    event voterStatus(address voterAddress, applicationStatus);
    event voterRemoved(address voterAddress);


    // modifier onlyOwner() {
    //     require(owner == msg.sender, "You can not add a candidate");
    //     _;
    // }

    function addVoter(address _voterAddress, string memory _name, uint8 _age, uint256 _ccode) public {
        // check if application has already been sent
        require(voters[_voterAddress] == 0,  "This voter has already applied");
        // first set the candidateID as value for that address in mapping
        voters[_voterAddress] = voterCount;
        // set the array's corresponding index with the candidate metadata
        voterMetaDataArray.push(voterMetaData(_name, _age, _voterAddress, applicationStatus.In_Review, _ccode));
        // increment the index
        voterCount++;
        // emit event regarding current status for push
        emit voterStatus(_voterAddress, applicationStatus.In_Review);
    }

    function upgradeCandidate(address _voterAddress) public {
        // check if already approved
        require(voterMetaDataArray[voters[_voterAddress]].status != applicationStatus.Approved,  "This voter is already approved");
        // upgrade status
        voterMetaDataArray[voters[_voterAddress]].status = applicationStatus(uint(voterMetaDataArray[voters[_voterAddress]].status)+1);
        // emit event regarding current status for push
        emit voterStatus(_voterAddress, voterMetaDataArray[voters[_voterAddress]].status);
    }

    function removeVoter(address _voterAddress) public {
        // check if candidate exists
        require(voterMetaDataArray[voters[_voterAddress]].status != applicationStatus.initalDefault,  "This voter doesn't exist");
        // delete the data, might get pruned
        delete voterMetaDataArray[voters[_voterAddress]];
        delete voters[_voterAddress];
        // emit event regarding deletion for push
        emit voterRemoved(_voterAddress);
    }

    function getDataOfVoter(address _voterAddress) public view returns(address, voterMetaData memory) {
        // check if candidate exists
        require(voterMetaDataArray[voters[_voterAddress]].status != applicationStatus.initalDefault,  "This voter doesn't exist");
        // return candidate details
        return (_voterAddress, voterMetaDataArray[voters[_voterAddress]]);
    }

    function getDataOfAllVoters() public view returns(voterMetaData[] memory) {
        // check if candidates even exist
        // require(candidateMetadataArray[0],  "This candidate doesn't exist");
        // return candidate details
        return (voterMetaDataArray);
    }

    function getStatusOfVoter(address _voterAddress) public view returns(address, applicationStatus) {
        return (_voterAddress, voterMetaDataArray[voters[_voterAddress]].status);
    }

    function isMetadataArrayEmpty() public view returns(bool) {
        return (voterMetaDataArray.length == 0 ? true : false);
    }

}