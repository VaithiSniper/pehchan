import { useRouter } from "next/router";

export default function About() {
  const router = useRouter();
  return (
    <div class="absolute inset-x-50 top-0 h-8 bg-gray-700">
      <div className="text-5xl font-heading font-bold text-left">
        <h1 className="text-center font-space">About Pehchan</h1>
      </div>
      <div className="grid grid-cols-3 gap-y-2 gap-x-2 justify-center items-center content-center pt-8">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-grey col-start-1 col-end-1">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Secure</div>
            <p class="text-gray-700 text-base">
              With the implementation of blockchain, we are securing the
              identity of a voter is unique and is being used by the particular
              user. This is possible because of the wallet address being unique
              and non-transferable.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #secure
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #safe
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #reliable
            </span>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-blue col-start-2 col-end-2">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Transparent</div>
            <p class="text-gray-700 text-base">
              All the information will be open to public at every step in the
              election process. The information cannot be manipulated due to the
              immutability of the data. This helps the public to not be
              influenced by fake news.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #transparent
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #clean
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #nomorefakenews
            </span>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-grey col-start-3 col-end-3">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Convenient</div>
            <p class="text-gray-700 text-base">
              The voters and candidates are given the freedom to register at any
              point.Live updates are provided regarding status of their
              application and the entire process is online. They will cast their
              votes remotely from the comfort of their own homes.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #easeofuse
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #comfy
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #flexible
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-y-2 gap-x-2 justify-center items-center content-center pt-16 ">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-blue col-start-1 col-end-1">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Extensive Support</div>
            <p class="text-gray-700 text-base">
              The average user who doesn't know about blockchain is given the
              choice to do social sign-in and a wallet will be created in the
              background. There is support for every network like Arcana,
              Polygon, Filecoin and Metamask for the users who have know about
              blockchain.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #everynetwork
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #socialsignin
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #foreveryone
            </span>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-grey col-start-2 col-end-2">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Cost</div>
            <p class="text-gray-700 text-base">
              The government has to spend a lot of money on every election
              conducted. With Pehchan the costs are greatly reduced by moving it
              online. In future, we can work with Biconomy to make transactions
              effectively gasless, further reducing the cost.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #costeffcient
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #movetovirtual
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #gasless
            </span>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-blue col-start-3 col-end-3">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Speed</div>
            <p class="text-gray-700 text-base">
              The results are instantaneous as the results can be fetched from
              the smartContract at any instance of time. All the transactions
              are seammlessly processed over the respective networks with
              Polygon as our main network because of its high through-put.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #fast
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #seamless
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #polygon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
