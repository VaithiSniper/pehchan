import Footer from "./footer.js";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Layout({ title, children }) {
  return (
    <div className="flex flex-col justify-center space-y-8 items-center">
      <div
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <Head>
          <title>{title}</title>
          <meta name="description" content="SDI Admin" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <div className={styles.main}>
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
