import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";
import SpinningAnimation from "../components/anim";

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-8 gap-4 gap-x-12">
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
      <div
        className="w-full col-start-6 col-end-8 h-full p-0 m-0"
        style={{ width: "30rem", height: "50rem" }}
      >
        <video autoPlay loop style={{ width: "100%", height: "100%" }}>
          <source src="anim.mp4" type="video/mp4"></source>
        </video>
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
  );
}
