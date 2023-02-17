//---------------------- Imports ----------------------
import sampleAbiArray from "./contracts/sampleAbiArray";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

//---------------------- Setup ----------------------
const PK =
  process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY ||
  "73eaaf6c0a8122388b46c2c1a4e1b922a0a9186c32f8c7cf580293af6a674f92"; // channel private key
const Pkey = `0x${PK}`;
console.log("Pkey: ", Pkey);
const signer = new ethers.Wallet(Pkey);

//---------------------- Notifications ----------------------

const sendTokensReceivedNotification = async () => {
  try {
    // apiResponse?.status === 204, if sent successfully!
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `Tokens sent`,
        body: `Tokens sent`,
      },
      payload: {
        title: `Tokens sent`,
        body: `Tokens sent`,
        cta: "",
        img: "",
      },
      channel: process.env.NEXT_PUBLIC_PUSH_PARTICIPANTS, // your channel address
      env: "staging",
    });

    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};

//---------------------- Events ----------------------

const TokensReceived = {
  address: process.env.NEXT_PUBLIC_SAMPLE_SMART_CONTRACT_ADDRESS, // change contract address
  abi: sampleAbiArray,
  eventName: "TokensReceived",
  listener(node, label, owner) {
    console.log(node, label, owner);
    sendNotification();
  },
};

//---------------------- Exports ----------------------
export { sendTokensReceivedNotification, TokensReceived };
