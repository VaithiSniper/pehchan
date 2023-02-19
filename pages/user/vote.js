import React from "react";
import { ethers } from "ethers";
import electionAbiArray from "../../contracts/electionAbiArray";
import {
  useContractRead,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractEvent,
} from "wagmi";

const contractAddress =
  process.env.NEXT_PUBLIC_ELECTION_SMART_CONTRACT_ADDRESS_POLYGON;
console.log("Contract is :", contractAddress);
const contractAbi = new ethers.utils.Interface(electionAbiArray);

export default function Vote() {
  const { address } = useAccount();

  console.log("Data is ", address);

  if (address != null) {
    const { data, isError, isLoading, error } = useContractRead({
      address: contractAddress,
      abi: contractAbi,
      functionName: "getDataOfAllCandidates",
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
    const dataArr = data;
    console.log("Data", dataArr[0].Name);
  }

  return <div>Hello there</div>;
}
