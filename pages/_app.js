import "../styles/globals.css";
import { configureChains, WagmiConfig, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, goerli, filecoinHyperspace, polygon, polygonMumbai } from 'wagmi/chains'
import styles from "../styles/Home.module.css";
import 'react-tooltip/dist/react-tooltip.css'
import Layout from "../components/layout";

const chainList = [mainnet, goerli, filecoinHyperspace, polygon, polygonMumbai]

const { chains, provider, webSocketProvider } = configureChains(
  chainList,
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }) {

  const title = "Pehchan" 

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
