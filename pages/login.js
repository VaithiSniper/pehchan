import Head from "next/head";
import { useRouter } from "next/router";
import Metamask from "../components/metamask";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect } from "react";
import Toast from "../components/toast";

export default function Login() {
  const router = useRouter();
  const { connect, error, isLoading } = useConnect({
    connector: new InjectedConnector({
      options: {
        shimDisconnect: true,
      },
    }),
  });

  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected) {
      // If wallet is already connected, push them to dashboard
      console.log(isConnected ? "Connected" : "Not connected");
      // Check if owner
      console.log(address, process.env.NEXT_PUBLIC_OWNER_ADDRESS);
      if (address === process.env.NEXT_PUBLIC_OWNER_ADDRESS)
        router.push("/admin/dashboard");
      else router.push("/user/dashboard");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center space-y-8 items-center">
      <>
        <p className="text-6xl font-heading font-bold text-center py-4">
          Login
        </p>
        {error && <Toast success="false" failureText={error.message} />}
        <Metamask connectToWallet={connect} connecting={isLoading} />
      </>
    </div>
  );
}
