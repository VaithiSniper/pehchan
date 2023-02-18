//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {

    //stores metadata of candidate
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

    function removeCandidate(address _partyAddress) public {
        // check if party exists
        require(partyMetadataArray[parties[_partyAddress]].partyAddress != address(0),  "This party doesn't exist");
        // delete the data, might get pruned
        delete partyMetadataArray[parties[_partyAddress]];
        delete parties[_partyAddress];
    }

    function getDataOfCandidate(address _partyAddress) public view returns(address, partyMetadata memory) {
        // check if party exists
        require(partyMetadataArray[parties[_partyAddress]].partyAddress != address(0),  "This party doesn't exist");
        // return party details
        return (_partyAddress, partyMetadataArray[parties[_partyAddress]]);
    }

    function getDataOfAllCandidates() public view returns(partyMetadata[] memory) {
        // check if parties even exist
        require(!isMetatdataArrayEmpty(), "The array is empty, there are no parties");
        // return candidate details
        return (partyMetadataArray);
    }

    function isMetatdataArrayEmpty() public view returns(bool) {
        return (partyMetadataArray.length == 0 ? true : false);
    }

}