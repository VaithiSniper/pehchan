import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-8 gap-4 gap-x-12 py-0 my-0">
        <div className="w-full col-start-2 col-end-4 justify-center">
          <div className="text-6xl font-heading font-bold py-2">
            Your
            <span className="text-banner text-gold">
              <Typewriter
                options={{
                  strings: [
                    // "Identity",
                    "पहचान",
                    // "ಗುರುತು",
                    // "அடையாளம்",
                    // "గురుతు",
                    // "അടുത്തത്",
                    // "আপনার পরিচয়",
                    // "તમારું પરિચય",
                    // "ਤੁਹਾਡਾ ਪਰਿਚਯ",
                    // "ତୁହାର ପ୍ରତିନିଧି",
                    // "உங்கள் அடையாளம்",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </div>
          <div className="w-full col-start-2 col-end-4 justify-center">
            <span className="text-xl text-white">
              More than a third of the country is dissatisfied with the
              electoral process. We are here to change that. &nbsp;
            </span>
            <span className="text-xl text-purple">
              <a href="/about">Click here to know more</a>
            </span>
          </div>
        </div>
        <div
          className="w-full col-start-6 col-end-8 h-full p-0 m-0"
          style={{ width: "20rem", height: "30rem" }}
        >
          <video autoPlay loop style={{ width: "100%", height: "100%" }}>
            <source src="anim.mp4" type="video/mp4"></source>
          </video>
        </div>
      </div>
      <div className=" py-0 my-0">
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("/login");
            }}
            type="button"
            style={{
              boxShadow: "0px 0px 0px 3px rgba(178,146,85,0.7)",
              boxShadow: "0px 0px 0px 5px rgba(178,146,85,0.3)",
            }}
            className=" glow-blue-600 flex items-center p-4 transition ease-in duration-200 uppercase rounded-full hover:bg-cyan-600 hover:bg-gold hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-cyan-900 focus:outline-none bg-white"
          >
            <Image
              height={40}
              width={40}
              src="/wallet.png"
              alt="Wallet"
              className={
                "px-4 ml-0 rounded-full border-gold border-2 inline float-left text-left items-end justify-end"
              }
            />
          </button>
        </div>
      </div>
    </>
  );
}
