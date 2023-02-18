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
      // Modify dashboard component and put that route here
      const ownerAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS;
      // if(ownerAddress==address)
      router.push("/admin/dashboard");
      // else
      // router.push("/user/dashboard");
    }
  }, [address]);

  return (
    <div className="flex flex-col justify-center space-y-8 items-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gold">
        <div className="px-6 py-4 flex flex-col justify-center relative">
          <div className="container font-bold font-space text-xl mb-2 flex flex-col items-center py-3">
            <span>Login </span>
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
