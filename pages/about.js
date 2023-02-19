import { useRouter } from "next/router";

export default function About() {
  const router = useRouter();
  return (
    <div class="absolute inset-x-0 top-0 h-8 bg-gray-700">
      <div className="text-5xl font-heading font-bold text-left">
        <h1>About Pehchan</h1>
      </div>
      <div class="max-w-sm rounded overflow-hidden shadow-lg bg-grey">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Secure</div>
          <p class="text-gray-700 text-base">
            With the implementation of blockchain, we are securing the identity
            of a voter is unique and is being used by the particular user. This
            is possible because of the wallet address being unique and
            non-transferable.
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
      <div class="max-w-sm rounded overflow-hidden shadow-lg bg-grey">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Secure</div>
          <p class="text-gray-700 text-base">
            With the implementation of blockchain, we are securing the identity
            of a voter is unique and is being used by the particular user. This
            is possible because of the wallet address being unique and
            non-transferable.
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
    </div>
  );
}
