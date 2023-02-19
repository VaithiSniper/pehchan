//---------------------- Imports ----------------------
import abiArray from "./contracts/candidateAbiArray";
import voterAbiArray from "./contracts/voterAbiArray";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useAccount } from "wagmi";
//---------------------- Setup ----------------------
const PK = "73eaaf6c0a8122388b46c2c1a4e1b922a0a9186c32f8c7cf580293af6a674f92"; // channel private key
const Pkey = `0x${PK}`;
// console.log("Pkey: ", Pkey);
const signer = new ethers.Wallet(Pkey);

//---------------------- Notifications ----------------------

const UpdateNotification = async (owner) => {
  try {
    // apiResponse?.status === 204, if sent successfully!
    const { address } = useAccount();
    const recipientadress = "eip155:5:" + address;
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 1, // unicast
      identityType: 2, // direct payload
      notification: {
        title: `Application Status`,
        body: `Application status has been moved`,
      },
      payload: {
        title: `Application status has been moved`,
        body: `Your application status has been elevated`,
        cta: "",
        img: "",
      },
      // recipients: recipientadress, // recipient address
      channel: "eip155:5:0x168a40fa5495Ff7F92fCEb743A10984E409bb444", // your channel address
      env: "staging",
    });

    // apiResponse?.status === 204, if sent successfully!
    // console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};

const removeNotification = async (owner) => {
  try {
    // apiResponse?.status === 204, if sent successfully!
    const { address } = useAccount();
    const recipientadress = "eip155:5:" + address;
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 1, // unicast
      identityType: 2, // direct payload
      notification: {
        title: `Application Status`,
        body: `Application status has been rejected`,
      },
      payload: {
        title: `Application rejected`,
        body: `Your application has been rejected`,
        cta: "",
        img: "",
      },
      // recipients: recipientadress, // recipient address
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
  address: "0x8e49a67Dd42520cC27A3c7Eae50A15271Dd07253", // change contract address
  abi: abiArray,
  eventName: "candidateStatus",
  listener(node, label, owner) {
    UpdateNotification(owner);
  },
};

const voterRecieved = {
  address: "0x8dFB2a8CCeB843a02B5EEb503de07b0c131bf08f", // change contract address
  abi: voterAbiArray,
  eventName: "voterStatus",
  listener(node, label, owner) {
    UpdateNotification(owner);
  },
};

const voterRemoved = {
  address: "0x8dFB2a8CCeB843a02B5EEb503de07b0c131bf08f",
  abi: voterAbiArray,
  eventName: "voterRemoved",
  listener(node, label, owner) {
    removeNotification(owner);
  },
};

const candidateRemoved = {
  address: "0x8e49a67Dd42520cC27A3c7Eae50A15271Dd07253",
  abi: abiArray,
  eventName: "candidateRemoved",
  listener(node, label, owner) {
    removeNotification(owner);
  },
};

//---------------------- Exports ----------------------
export {
  removeNotification,
  candidateRecieved,
  candidateRemoved,
  UpdateNotification,
  voterRecieved,
  voterRemoved,
};
