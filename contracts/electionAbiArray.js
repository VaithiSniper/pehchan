const electionAbiArray = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_candidateAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_party",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_age",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_ccode",
				"type": "uint256"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_candidateAddress",
				"type": "address"
			}
		],
		"name": "addCandidateInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "candidateAddress",
				"type": "address"
			}
		],
		"name": "candidateRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "candidateAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum Candidate.applicationStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "candidateStatus",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voterAddress",
				"type": "address"
			}
		],
		"name": "registerVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_candidateAddress",
				"type": "address"
			}
		],
		"name": "removeCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_candidateAddress",
				"type": "address"
			}
		],
		"name": "upgradeCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateIndex",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidate_info",
		"outputs": [
			{
				"internalType": "address",
				"name": "candidateAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "voteCounts",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidatesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDataOfAllCandidates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "party",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "candidateAddress",
						"type": "address"
					},
					{
						"internalType": "enum Candidate.applicationStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "ccode",
						"type": "uint256"
					}
				],
				"internalType": "struct Candidate.candidateMetadata[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_candidateAddress",
				"type": "address"
			}
		],
		"name": "getDataOfCandidate",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "party",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "candidateAddress",
						"type": "address"
					},
					{
						"internalType": "enum Candidate.applicationStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "ccode",
						"type": "uint256"
					}
				],
				"internalType": "struct Candidate.candidateMetadata",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_candidateAddress",
				"type": "address"
			}
		],
		"name": "getNameOfCandidate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_candidateAddress",
				"type": "address"
			}
		],
		"name": "getStatusOfCandidate",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "enum Candidate.applicationStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isMetatdataArrayEmpty",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SeeWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voter_choice",
		"outputs": [
			{
				"internalType": "bool",
				"name": "authorised",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "voted",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "voterAddress",
				"type": "address"
			},
			{
				"internalType": "enum Election.Status",
				"name": "voterStatus",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "votedFor",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default electionAbiArray;