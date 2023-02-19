const voterAbiArray = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
    ],
    name: "voterRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum Voter.applicationStatus",
        name: "",
        type: "uint8",
      },
    ],
    name: "voterStatus",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_voterAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_age",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_ccode",
        type: "uint256",
      },
    ],
    name: "addVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDataOfAllVoters",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "voterAddress",
            type: "address",
          },
          {
            internalType: "enum Voter.applicationStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "ccode",
            type: "uint256",
          },
        ],
        internalType: "struct Voter.voterMetaData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_voterAddress",
        type: "address",
      },
    ],
    name: "getDataOfVoter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "voterAddress",
            type: "address",
          },
          {
            internalType: "enum Voter.applicationStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "ccode",
            type: "uint256",
          },
        ],
        internalType: "struct Voter.voterMetaData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_voterAddress",
        type: "address",
      },
    ],
    name: "getStatusOfVoter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "enum Voter.applicationStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isMetadataArrayEmpty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_voterAddress",
        type: "address",
      },
    ],
    name: "removeVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_voterAddress",
        type: "address",
      },
    ],
    name: "upgradeCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "voterCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default voterAbiArray;
