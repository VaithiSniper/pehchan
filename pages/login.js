import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Metamask from "../components/metamask";
import { useAccount, useConnect } from "wagmi";
import { useEffect } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import Image from "next/image";
import Toast from "../components/toast";

export default function Login() {
  const router = useRouter();

  const [addressState, setAddressState] = useState(null);

  const [type, setType] = useState("voter");

  const { connector, address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  console.log(addressState);
  if (isConnected && addressState === null && address) {
    setAddressState(address);
  }

  useEffect(() => {
    if (isConnected) {
      // If wallet is already connected, push them to dashboard
      console.log(isConnected ? "Connected" : "Not connected");
      console.log(isConnected ? "Connected" : "Not connected");
      // Modify dashboard component and put that route here
      const ownerAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS;
      if (type === "candidate") router.push("/candidate/dashboard");
      else router.push("/user/dashboard");
    }
  }, [address]);

  return (
    <div className="flex flex-col justify-center space-y-8 items-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gold">
        <div className="px-6 py-4 flex flex-col justify-center relative">
          <div className="container font-bold font-space text-4xl mb-2 flex flex-col items-center py-3">
            <span>Login </span>

            <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
              <div class="px-6 flex items-center">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  value="candidate"
                  name="type"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="bordered-radio-1"
                  class="w-full py-4 px-3 ml-2 text-sm font-big text-gray-900 dark:text-gray-300"
                >
                  Candidate
                </label>
              </div>
              <div class="px-6 flex items-center">
                <input
                  checked
                  id="bordered-radio-2"
                  type="radio"
                  value="voter"
                  name="type"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="bordered-radio-2"
                  class="w-full py-4 px-3 ml-3 text-sm font-big text-gray-900 dark:text-gray-300"
                >
                  Voter
                </label>
              </div>
            </div>
          </div>
          {!isConnected &&
            connectors.map((connector) => (
              <button
                className="align-middle pt-4 px-6 pb-2.5 bg-black text-white font-medium font-space text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                Connect to {connector.name}
                {isLoading &&
                  pendingConnector?.id === connector.id &&
                  " (connecting)"}
                <div className="px-2 inline pt-4 align-middle">
                  <Image
                    height={30}
                    width={30}
                    src="/metamask.svg"
                    alt="MetaMask_Fox"
                    className={"px-5"}
                  />
                </div>
              </button>
            ))}
          {error && <div>{error.message}</div>}
        </div>
      </div>
    </div>
  );
}
