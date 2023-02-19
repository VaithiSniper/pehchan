import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useContractEvent } from "wagmi";

import sampleAbiArray from "../../contracts/sampleAbiArray";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import Card from "../../components/card";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useContractRead,
} from "wagmi";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import Link from "../../components/link";

const Dashboard = () => {
  //setup router object
  const router = useRouter();
  //define tooltip state
  const [tooltipState, setTooltipState] = useState("Fetching address");
  //get userdetails
  const { address } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  //TODO: logout function (disconnect button doesn't really work)
  const { disconnect } = useDisconnect();
  //set tooltip content
  useEffect(() => {
    if (address) setTooltipState(address);
    else router.push("/login");
  }, [tooltipState]);

  const PK = "73eaaf6c0a8122388b46c2c1a4e1b922a0a9186c32f8c7cf580293af6a674f92"; // channel private key
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);

  const sendNotification = async () => {
    try {
      // apiResponse?.status === 204, if sent successfully!
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
          title: `Hello there`,
          body: `lorem ipsum dolor sit amet `,
        },
        payload: {
          title: `Hello there`,
          body: `lorem ipsum dolor sit amet`,
          cta: "",
          img: "",
        },
        channel: "eip155:5:0x168a40fa5495Ff7F92fCEb743A10984E409bb444", // your channel address
        env: "staging",
      });

      // apiResponse?.status === 204, if sent successfully!
      console.log("API repsonse: ", apiResponse);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  useContractEvent({
    address: process.env.NEXT_PUBLIC_SAMPLE_SMART_CONTRACT_ADDRESS, // change contract address
    abi: sampleAbiArray,
    eventName: "TokensReceived",
    listener(node, label, owner) {
      console.log(node, label, owner);
      sendNotification();
    },
  });

  // setTooltipState("Your address is : " + "34");
  return (
    <div className="justify-center items-center text-center gap-8 flex flex-row">
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-4/5 px-4 py-4 bg-grey mt-6 shadow-lg rounded-lg dark:bg-gray-800">
        <div className="justify-end items-end text-right gap-8 flex flex-row mb-4 pb-4">
          <Link href={"/about"}>
            <Image
              height={40}
              width={40}
              src="/questionmark.png"
              alt="Question mark symbol"
              className={
                "px-4 ml-0 rounded-full border-gold border-2 inline float-left text-left items-end justify-end"
              }
            />
          </Link>
          <button
            type="button"
            onClick={async () => {
              await disconnect();
            }}
            className="inline-block px-6 py-2.5 bg-red text-white font-bold text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red dark:bg-red-400 active:shadow-lg transition duration-150 ease-in-out"
          >
            Disconnect
          </button>
        </div>
        <div className="px-2 inline pt-4 align-middle">
          <Image
            height={30}
            width={30}
            src={ensAvatar ? ensAvatar : "/metamask.svg"}
            alt="Account avatar"
            className={"px-5"}
          />
        </div>
        <div className="my-4">
          <p className="text-4xl sm:text-4xl text-gray-700 font-semibold font-heading dark:text-white py-4 inline px-4">
            Welcome {ensName ? ensName : "User"}
          </p>
          <Image
            height={30}
            width={30}
            src="/hash.png"
            alt="Hash symbol"
            className={"px-4 rounded-full border-gold border-2 inline"}
            id="address"
            data-tooltip-content={tooltipState}
          />
        </div>
        <Tooltip anchorId="address" />
        <>
          <h3 className="text-2xl font-light sm:text-xl text-gray-700 dark:text-white py-4 font-space">
            What do you want to do?
          </h3>
        </>
        <div className="text-md text-gray-500 dark:text-gray-300 pa-4 space-x-8 flex flex-row font-space">
          <>
            <Card title="Ongoing elections" text="Vote" path="/user/vote" />
          </>
          <>
            <Card
              title="View previous elections"
              text="View"
              path="action/view"
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
