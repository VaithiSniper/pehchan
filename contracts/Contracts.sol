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
        uint256 ccode;
    }

    struct approvedCandidateMetadata {
        string name;
        string party;
        uint age;
        address candidateAddress;
        uint256 ccode;
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
    approvedCandidateMetadata[] approvedCandidateMetadataArray;

    event candidateStatus(address candidateAddress, applicationStatus);
    event candidateRemoved(address candidateAddress);


    // modifier onlyOwner() {
    //     require(owner == msg.sender, "You can not add a candidate");
    //     _;
    // }

    function addCandidate(address _candidateAddress, string memory _name, string memory _party, uint8 _age, uint256 _ccode) public {
        // check if application has already been sent
        require(candidates[_candidateAddress] == 0,  "This candidate has already applied");
        // first set the candidateID as value for that address in mapping
        candidates[_candidateAddress] = candidatesCount;
        // set the array's corresponding index with the candidate metadata
        candidateMetadataArray.push(candidateMetadata(_name, _party, _age, _candidateAddress, applicationStatus.In_Review, _ccode));
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
        // if status reaches stage 3, i.e approved, add to approvedCandidateMetadataArray
        if(candidateMetadataArray[candidates[_candidateAddress]].status==applicationStatus(3))
            approvedCandidateMetadataArray.push(approvedCandidateMetadata(candidateMetadataArray[candidates[_candidateAddress]].name,candidateMetadataArray[candidates[_candidateAddress]].party,candidateMetadataArray[candidates[_candidateAddress]].age,candidateMetadataArray[candidates[_candidateAddress]].candidateAddress,candidateMetadataArray[candidates[_candidateAddress]].ccode  ));
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

    function getDataOfCandidate(address _candidateAddress) public  view returns(address, candidateMetadata memory) {
        // check if candidate exists
        require(candidateMetadataArray[candidates[_candidateAddress]].status != applicationStatus.initalDefault,  "This candidate doesn't exist");
        // return candidate details
        return (_candidateAddress, candidateMetadataArray[candidates[_candidateAddress]]);
    }

    function getNameOfCandidate(address _candidateAddress) public view returns( string memory) {
         require(candidateMetadataArray[candidates[_candidateAddress]].status != applicationStatus.initalDefault,  "This candidate doesn't exist");
        // return candidate details
        return (candidateMetadataArray[candidates[_candidateAddress]].name);
    }
    
    function getDataOfAllCandidates() public view returns(candidateMetadata[] memory) {
        // check if candidates even exist
        // require(candidateMetadataArray[0],  "This candidate doesn't exist");
        // return candidate details
        return (candidateMetadataArray);
    }

    function getDataOfAllApprovedCandidates() public view returns(approvedCandidateMetadata[] memory) {
        // check if candidates even exist
        // require(candidateMetadataArray[0],  "This candidate doesn't exist");
        // return candidate details
        return (approvedCandidateMetadataArray);
    }

    function getStatusOfCandidate(address _candidateAddress) public view returns(address, applicationStatus) {
        return (_candidateAddress, candidateMetadataArray[candidates[_candidateAddress]].status);
    }

    function isMetatdataArrayEmpty() public view returns(bool) {
        return (candidateMetadataArray.length == 0 ? true : false);
    }

}

contract Voter {

    // status of application of voter
    enum applicationStatus{
        initalDefault,
        In_Review,
        KYC_Pending,
        Approved     
    }

    //stores metadata of voter
    struct voterMetaData {
        string name;
        uint age;
        address voterAddress;
        applicationStatus status;
        uint256 ccode;
    }

    struct approvedvoterMetaData {
        string name;
        uint age;
        address voterAddress;
        uint256 ccode;
    }

    // keep track of owner and votersCount 
    address payable public owner;
    uint256 public voterCount;
    // initalise owner and votersCount in constructor
    constructor() {
        voterCount = 0;
        owner = payable(msg.sender);
    }

    // serves as a mapping from address to current voterID that is used to identify voters
    mapping(address => uint256) voters;
    // stores corresponing metadata of voter in corresponding array, at voterID index position
    voterMetaData[] voterMetaDataArray;
    approvedvoterMetaData[] approvedVoterMetadataArray;

    event voterStatus(address voterAddress, applicationStatus);
    event voterRemoved(address voterAddress);


    // modifier onlyOwner() {
    //     require(owner == msg.sender, "You can not add a voter");
    //     _;
    // }

    function addVoter(address _voterAddress, string memory _name, uint8 _age, uint256 _ccode) public {
        // check if application has already been sent
        require(voters[_voterAddress] == 0,  "This voter has already applied");
        // first set the voterID as value for that address in mapping
        voters[_voterAddress] = voterCount;
        // set the array's corresponding index with the voter metadata
        voterMetaDataArray.push(voterMetaData(_name, _age, _voterAddress, applicationStatus.In_Review, _ccode));
        // increment the index
        voterCount++;
        // emit event regarding current status for push
        emit voterStatus(_voterAddress, applicationStatus.In_Review);
    }

    function upgradeVoter(address _voterAddress) public {
        // check if already approved
        require(voterMetaDataArray[voters[_voterAddress]].status != applicationStatus.Approved,  "This voter is already approved");
        // upgrade status
        voterMetaDataArray[voters[_voterAddress]].status = applicationStatus(uint(voterMetaDataArray[voters[_voterAddress]].status)+1);
        // if status reaches stage 3, i.e approved, add to approvedCandidateMetadataArray
        if(voterMetaDataArray[voters[_voterAddress]].status==applicationStatus(3))
            approvedVoterMetadataArray.push(approvedvoterMetaData(voterMetaDataArray[voters[_voterAddress]].name,voterMetaDataArray[voters[_voterAddress]].age,voterMetaDataArray[voters[_voterAddress]].voterAddress,voterMetaDataArray[voters[_voterAddress]].ccode));
        // emit event regarding current status for push
        emit voterStatus(_voterAddress, voterMetaDataArray[voters[_voterAddress]].status);
    }

    function removeVoter(address _voterAddress) public {
        // check if voter exists
        require(voterMetaDataArray[voters[_voterAddress]].status != applicationStatus.initalDefault,  "This voter doesn't exist");
        // delete the data, might get pruned
        delete voterMetaDataArray[voters[_voterAddress]];
        delete voters[_voterAddress];
        // emit event regarding deletion for push
        emit voterRemoved(_voterAddress);
    }

    function getDataOfVoter(address _voterAddress) public view returns(address, voterMetaData memory) {
        // check if voter exists
        require(voterMetaDataArray[voters[_voterAddress]].status != applicationStatus.initalDefault,  "This voter doesn't exist");
        // return voter details
        return (_voterAddress, voterMetaDataArray[voters[_voterAddress]]);
    }

    function getDataOfAllVoters() public view returns(voterMetaData[] memory) {
        // check if voters even exist
        // require(candidateMetadataArray[0],  "This candidate doesn't exist");
        // return voter details
        return (voterMetaDataArray);
    }

    function getDataOfAllApprovedVoters() public view returns(approvedvoterMetaData[] memory) {
        // check if voters even exist
        // require(candidateMetadataArray[0],  "This candidate doesn't exist");
        // return voters details
        return (approvedVoterMetadataArray);
    }

    function getStatusOfVoter(address _voterAddress) public view returns(address, applicationStatus) {
        return (_voterAddress, voterMetaDataArray[voters[_voterAddress]].status);
    }

    function isMetadataArrayEmpty() public view returns(bool) {
        return (voterMetaDataArray.length == 0 ? true : false);
    }

}

contract Party {

    //stores metadata of party
    struct partyMetadata {
        string name;
        string leader;
        address partyAddress;
    }

    // keep track of owner and partiesCount 
    address payable public owner;
    uint256 public partiesCount;
    // initalise owner and partiesCount in constructor
    constructor() {
        partiesCount = 0;
        owner = payable(msg.sender);
    }

    // serves as a mapping from address to current partyID that is used to identify parties
    mapping(address => uint256) parties;
    // stores corresponing metadata of party in corresponding array, at partyID index position
    partyMetadata[] partyMetadataArray;

    // modifier onlyOwner() {
    //     require(owner == msg.sender, "You can not add a candidate");
    //     _;
    // }

    function addParty(address _partyAddress, string memory _name, string memory _leader) public {
        // check if application has already been sent
        require(parties[_partyAddress] == 0,  "This party has already applied");
        // first set the partyID as value for that address in mapping
        parties[_partyAddress] = partiesCount;
        // set the array's corresponding index with the party metadata
        partyMetadataArray.push(partyMetadata(_name,  _leader, _partyAddress));
        // increment the index
        partiesCount++;
    }

    function removeParty(address _partyAddress) public {
        // check if party exists
        require(partyMetadataArray[parties[_partyAddress]].partyAddress != address(0),  "This party doesn't exist");
        // delete the data, might get pruned
        delete partyMetadataArray[parties[_partyAddress]];
        delete parties[_partyAddress];
    }

    function getDataOfParty(address _partyAddress) public view returns(address, partyMetadata memory) {
        // check if party exists
        require(partyMetadataArray[parties[_partyAddress]].partyAddress != address(0),  "This party doesn't exist");
        // return party details
        return (_partyAddress, partyMetadataArray[parties[_partyAddress]]);
    }

    function getDataOfAllParties() public view returns(partyMetadata[] memory) {
        // check if parties even exist
        require(!isMetatdataArrayEmpty(), "The array is empty, there are no parties");
        // return party details
        return (partyMetadataArray);
    }

    function isMetatdataArrayEmpty() public view returns(bool) {
        return (partyMetadataArray.length == 0 ? true : false);
    }

}

contract Election {

    // setting up objects for reference
    Candidate public candidateObj;
    Voter public voterObj;
    Party public partyObj;


    enum applicationStatus{
        initalDefault,
        In_Review,
        KYC_Pending,
        Approved     
    }

    // setting up the owner for the contract
    address payable public owner;

    // setting up the constructor, instantiating instances of the previous contracts and owner
    constructor(address _candidateContractAddress, address _voterContractAddress, address _partyContractAddress) {
        candidateObj = Candidate(_candidateContractAddress);
        voterObj = Voter(_voterContractAddress);
        partyObj = Party(_partyContractAddress);
        owner = payable(msg.sender);
        electionName="General Elections";
        electionYear="2019";
    }

    // define candidateMetadata and voterMetadata again to use to recieve arrays from Voter.sol and Candidate.sol
    //stores metadata of candidate
    struct candidateMetadata {
        string name;
        string party;
        uint age;
        address candidateAddress;
        applicationStatus status;
        uint256 ccode;
    }
    //stores metadata of voter
    struct voterMetaData {
        string name;
        uint age;
        address voterAddress;
        applicationStatus status;
        uint256 ccode;
    }
    struct approvedvoterMetaData {
        string name;
        uint age;
        address voterAddress;
        applicationStatus status;
        uint256 ccode;
    }
    //stores metadata of 
        struct approvedCandidateMetaData {
        string name;
        string party;
        uint age;
        address candidateAddress;
        uint256 ccode;
    }
    //stores metadata of party
    struct partyMetadata {
        string name;
        string leader;
        address partyAddress;
    }

    //define arrays from each metadata struct
    // stores corresponing metadata of candidate in corresponding array, at candidateID index position
    approvedCandidateMetaData[] approvedCandidateMetadataArray;
    // // stores corresponing metadata of voter in corresponding array, at voterID index position
    // approvedvoterMetaData[] approvedvoterMetaDataArray;
    // // stores corresponing metadata of party in corresponding array, at partyID index position
    // partyMetadata[] partyMetadataArray;

    // function fetchDataFromContracts() public {
    //     // approvedCandidateMetadataArray = candidateObj.getDataOfAllApprovedCandidates();
    //     approvedvoterMetaDataArray = voterObj.getDataOfAllApprovedVoters();
    //     partyMetadataArray = partyObj.getDataOfAllParties();
    // }

    struct voterVoteMetadata {
        bool voted;
        address votedFor;
    }

    string public electionName;
    string public electionYear;

    mapping (address => voterVoteMetadata) public voteChoices;
    mapping (address => uint256) public candidateVotes;
    uint256 public totalVotes;

    modifier checkVotes() {
        require(
            !voteChoices[msg.sender].voted,
            "You are not allowed to voted twice"
        );
        _;
    }

    // function getConstituencybyVoterAddress( address _voterAddress ) public view returns( uint256 )
    // {
    //     require(voterMetaDataArray[voters[_voterAddress]].status != applicationStatus.initalDefault,  "This voter doesn't exist");
    //     return ( voterMetaDataArray[voters[_voterAddress]].ccode);
    // }

   
    function vote ( address _candidateAddress) public {
        voteChoices[msg.sender].voted = true;
        voteChoices[msg.sender].votedFor = _candidateAddress;

        candidateVotes[_candidateAddress]++;

        totalVotes++;
    }

    approvedCandidateMetaData[] eligiblecandidates;

    function getVoterID( address _voteraddress) public returns ( approvedCandidateMetaData[] memory ){
        uint256 ccode;
        for ( uint256 i=0; i<voterObj.getDataOfAllApprovedVoters().length; i++)
        {
            if (voterObj.getDataOfAllApprovedVoters()[i].voterAddress == _voteraddress )
            {
                ccode = voterObj.getDataOfAllApprovedVoters()[i].ccode;
                break;
            }
        }
        for ( uint256 i=0; i<candidateObj.getDataOfAllApprovedCandidates().length; i++)
        {
            if ( candidateObj.getDataOfAllApprovedCandidates()[i].ccode == ccode)
            {
                eligiblecandidates.push(approvedCandidateMetaData(candidateObj.getDataOfAllApprovedCandidates()[i].name,candidateObj.getDataOfAllApprovedCandidates()[i].party,candidateObj.getDataOfAllApprovedCandidates()[i].age,candidateObj.getDataOfAllApprovedCandidates()[i].candidateAddress,candidateObj.getDataOfAllApprovedCandidates()[i].ccode));
            }
        }

        return eligiblecandidates;
    }


    function CountTotalVotes() public view returns ( uint256, address) {
        uint256 maxVotes = 0;
        address winningCandidate;
        for (uint256 i = 0; i < candidateObj.getDataOfAllApprovedCandidates().length; i++) {
            if (candidateVotes[candidateObj.getDataOfAllApprovedCandidates()[i].candidateAddress] > maxVotes)
            {
                maxVotes = candidateVotes[candidateObj.getDataOfAllApprovedCandidates()[i].candidateAddress];
                winningCandidate = candidateObj.getDataOfAllApprovedCandidates()[i].candidateAddress;
            }
         }

         return ( maxVotes , winningCandidate);
    }

}