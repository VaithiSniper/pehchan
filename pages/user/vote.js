import React from "react";
import { ethers } from "ethers";
import electionAbiArray from "../../contracts/electionAbiArray";
import VoteCard from "../../components/vote_card";

import {
  useContractRead,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractEvent,
} from "wagmi";

const contractAddress =
  "0xC3Aa786CCfFc5328EDFA5dB822fdF809BFD32338" ||
  process.env.NEXT_PUBLIC_ELECTION_SMART_CONTRACT_ADDRESS_POLYGON;
// "0x8e49a67Dd42520cC27A3c7Eae50A15271Dd07253" ||

console.log("Contract is :", contractAddress);
const contractAbi = new ethers.utils.Interface(electionAbiArray);

export default function Vote() {
  const { address } = useAccount();

  console.log("Data is ", address);
  let dataArr;

  if (address != null) {
    const { data, isError, isLoading, error } = useContractRead({
      address: contractAddress,
      abi: contractAbi,
      functionName: "getVoterID",
      args: [address],
      select: (data) =>
        data
          .map((dataItems, index) => ({
            Name: dataItems[0],
            Party: dataItems[1],
            Age: Number(dataItems[2]),
            Address: dataItems[3],
            ConstituencyCode: Number(dataItems[5]),
            CandidateID: index,
          }))
          .filter((dataItem) => dataItem.Name !== "" && dataItem.Party !== ""),
    });
    dataArr = data;
    console.log("Data", dataArr);
  }

  return (
    <div className="flex flex-col justify-center space-y-8 items-center">
      <div>
        <span className="container font-bold font-space text-4xl mb-2 flex flex-col items-center py-3">
          {" "}
          List of Candidates
        </span>
      </div>
    </div>
  );
}

// {dataArr &&
//   dataArr.map((dataItem) => <VoteCard candidateData={dataItem} />)}
// <VoteCard />
