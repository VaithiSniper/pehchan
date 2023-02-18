//---------------------- Imports ----------------------
import abiArray from "./contracts/candidateAbiArray";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useAccount } from "wagmi";
//---------------------- Setup ----------------------
const PK = "73eaaf6c0a8122388b46c2c1a4e1b922a0a9186c32f8c7cf580293af6a674f92"; // channel private key
const Pkey = `0x${PK}`;
// console.log("Pkey: ", Pkey);
const signer = new ethers.Wallet(Pkey);

//---------------------- Notifications ----------------------

const candidateUpdateNotification = async (owner) => {
  try {
    // apiResponse?.status === 204, if sent successfully!
    const { address } = useAccount();
    const recipientadress = "eip155:5:" + address;
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // unicast
      identityType: 2, // direct payload
      notification: {
        title: `Application Status`,
        body: `Application status has been moved`,
      },
      payload: {
        title: `Application status has been moved`,
        body: `Your application status is: {wah}`,
        cta: "",
        img: "",
      },
      recipients: recipientadress, // recipient address
      channel: "eip155:5:0x168a40fa5495Ff7F92fCEb743A10984E409bb444", // your channel address
      env: "staging",
    });

    // apiResponse?.status === 204, if sent successfully!
    // console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};

//---------------------- Events ----------------------

const candidateRecieved = {
  address: "0x8845365da8bA86e7e2A6876a12ecaE798f3ccdEe", // change contract address
  abi: abiArray,
  eventName: "candidateStatus",
  listener(node, label, owner) {
    candidateUpdateNotification(owner);
  },
};

//---------------------- Exports ----------------------
export { candidateUpdateNotification, candidateRecieved };
