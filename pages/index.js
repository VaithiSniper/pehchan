import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import EthTest from "../components/ethtest";
import Typewriter from "typewriter-effect";

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
        <div className="grid grid-cols-6 gap-4 gap-x-12">
          <div className="w-full col-start-2 col-end-4 justify-center">
            <div className="text-6xl font-heading font-bold">
              Your
              <span className="text-banner text-gold">
                <Typewriter
                  options={{
                    strings: [
                      "Identity",
                      "पहचान",
                      "ಗುರುತು",
                      "அடையாளம்",
                      "గురుతు",
                      "അടുത്തത്",
                      "আপনার পরিচয়",
                      "તમારું પરિચય",
                      "ਤੁਹਾਡਾ ਪਰਿਚਯ",
                      "ତୁହାର ପ୍ରତିନିଧି",
                      "உங்கள் அடையாளம்",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </div>
          </div>
          <div className="w-full col-start-5 col-end-5">
            <EthTest />
          </div>
          {/* <div>
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
