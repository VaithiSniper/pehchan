//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Candidate.sol";
import "./Voter.sol";


contract Election is Candidate {
    Candidate c;

    enum Status {
        notVoted,
        hasVoted
    }

    struct candidate_vote {
        address candidateAddress;
        uint256 voteCounts;
    }

    struct voter_vote {
        bool authorised;
        bool voted;
        address voterAddress;
        Status voterStatus;
        string votedFor;
    }

    string public electionName;

    mapping ( address => voter_vote) public voter_choice;

    candidate_vote[] public candidate_info;

    uint256 public totalVotes;


    modifier onlyOwner() {
        require(owner == msg.sender, "You can not add a candidate");
        _;
    }

    function addCandidateInfo(
        address _candidateAddress
    ) public onlyOwner {
        candidate_info.push(candidate_vote(_candidateAddress, 0));
    }


    modifier OnlyAuthorise() {
        require(
            !voter_choice[msg.sender].voted,
            "You are not allowed to voted twice"
        );
        assert(voter_choice[msg.sender].voterStatus != Status.hasVoted);
        require(voter_choice[msg.sender].authorised, "You are authorised to vote");
        _;
    }

    constructor(string memory _name)
    {
        owner = payable(msg.sender);
        electionName = _name;
    }

    function registerVoter(address _voterAddress) public onlyOwner {
        voter_choice[_voterAddress].authorised = true;
        voter_choice[_voterAddress].voterStatus = Status.notVoted;
        voter_choice[_voterAddress].votedFor = "none";
    }

    function vote ( uint256 _candidateIndex) public {
        voter_choice[msg.sender].voted = true;
        voter_choice[msg.sender].votedFor = getNameOfCandidate(candidate_info[_candidateIndex].candidateAddress);

        candidate_info[_candidateIndex].voteCounts++;

        totalVotes++;
    }

    function CountTotalVotes() internal view returns ( uint256 _totalVotes) {
        uint256 winningCount = 0;
        for (uint256 i = 0; i < candidate_info.length; i++) {
            if (candidate_info[i].voteCounts > winningCount)
            {
                winningCount = candidate_info[i].voteCounts;
                _totalVotes = i;
            }
         }
    }

    function SeeWinner() public view returns (address, uint256) {
        return (
            candidate_info[CountTotalVotes()].candidateAddress,
            candidate_info[CountTotalVotes()].voteCounts
        );
    }



}