import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  return (
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
        <title>SDI Admin</title>
        <meta name="description" content="SDI Admin" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.main}>
        <div className="flex flex-col justify-center space-y-8 items-center">
          <div>
            <p className="text-6xl font-heading font-bold">
              Your <span className="font-hindi text-banner text-gold">पहचान</span>
            </p>
          </div>
          <div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/login");
                }}
                type="button"
                className="flex items-center p-4 transition ease-in duration-200 uppercase rounded-full hover:bg-cyan-600 hover:text-white border-2 border-cyan-900 focus:outline-none bg-grey"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <em>
          Made with ❤️ by
          <a
            href="https://github.com/VaithiSniper"
            className="text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vaithi Sniper
          </a>
        </em>
      </footer>
    </div>
  );
}
