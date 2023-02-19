import { useRouter } from "next/router";
import Card from "./card";
import electionAbiArray from "../contracts/electionAbiArray";
import { ethers } from "ethers";

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

export default function Vote_Card(props) {
  const handleClick = () => {
    writeRes.write?.();
  };
  const router = useRouter();
  //use props.candidateData
  configRes = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "vote",
    args: [props.candidateData.Address],
  });
  writeRes = useContractWrite(configRes.config);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gold">
      <div className="px-6 py-4">
        <div className="font-light text-xl mb-2">
          {props.candidateData.Name} / {props.candidateData.Age}
        </div>
        {props.text && (
          <button
            type="button"
            onClick={handleClick}
            className="inline-block px-6 py-2.5 bg-RED text-white font-light text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            VOTE
          </button>
        )}
      </div>
    </div>
  );
}
