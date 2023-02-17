import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";

import { configureChains, WagmiConfig, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  mainnet,
  goerli,
  filecoinHyperspace,
  polygon,
  polygonMumbai,
} from "wagmi/chains";

import "react-tooltip/dist/react-tooltip.css";

// import { sendTokensReceivedNotification, TokensReceived } from "../push.config";

const chainList = [mainnet, goerli, filecoinHyperspace, polygon, polygonMumbai];

const { chains, provider, webSocketProvider } = configureChains(chainList, [
  jsonRpcProvider({
    rpc: () => {
      return {
        http: "https://goerli.blockpi.network/v1/rpc/public",
      };
    },
  }),
  publicProvider(),
]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  const title = "Pehchan";

  return (
    <WagmiConfig client={client}>
      <Layout title={title}>
        <div className={styles.main}>
          <Component {...pageProps} />
        </div>
      </Layout>
    </WagmiConfig>
  );
}

export default MyApp;
