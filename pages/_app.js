import "../styles/globals.css";
import Layout from "../components/layout";

import {
  configureChains,
  useContractEvent,
  WagmiConfig,
  createClient,
  Chain,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import {
  mainnet,
  goerli,
  filecoinHyperspace,
  polygon,
  polygonMumbai,
} from "wagmi/chains";
import styles from "../styles/Home.module.css";
import "react-tooltip/dist/react-tooltip.css";

import { candidateRecieved, candidateUpdateNotification } from "../push.config";

const connector = () => {
  return new ArcanaConnector({
    chains: [goerli],
    options: {
      appId: `9e0c6715d9ea7aab73535c8c359d8b45ac2587bc`, // appId = App Address
      theme: "dark", // Defaults to 'dark'
      alwaysVisible: true, // Defaults to true
      position: "right", // Defaults to 'right'
    },
  });
};

const chainList = [mainnet, goerli, filecoinHyperspace, polygon, polygonMumbai];

const { chains, provider, webSocketProvider } = configureChains(chainList, [
  jsonRpcProvider({
    rpc: () => ({
      http: `https://goerli.blockpi.network/v1/rpc/public`,
    }),
  }),
  publicProvider(),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [connector(chains)],
  provider,
});

function MyApp({ Component, pageProps }) {
  const title = "Pehchan";

  return (
    <WagmiConfig client={wagmiClient}>
      <Layout title={title}>
        <div className={styles.main}>
          <Component {...pageProps} />
        </div>
      </Layout>
    </WagmiConfig>
  );
}

export default MyApp;
