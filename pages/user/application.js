import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import abiArray from "../../contracts/voterAbiArray";
import {
  useContract,
  useContractRead,
  useAccount,
  useSigner,
  useProvider,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { ethers, signer } from "ethers";

export default function Home() {
  const router = useRouter();

  const [record, setRecord] = useState({
    name: "",
    age: 18,
    constituency: "",
  });

  const [signer, setSigner] = useState();

  const contractAddress =
    "0x8dFB2a8CCeB843a02B5EEb503de07b0c131bf08f" ||
    process.env.NEXT_PUBLIC_VOTER_SMART_CONTRACT_ADDRESS_POLYGON;
  const contractAbi = new ethers.utils.Interface(abiArray);

  const { address } = useAccount();

  // TODO: Fix this error, contract throws error that owner and calling address doesn't match. Move this component to a general add/remove component where admin can see these candidates and get details.

  const resDump = useSigner({
    onSuccess(data) {
      setSigner(data);
    },
  });

  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: abiArray,
    functionName: "addVoter",
    args: [
      address,
      record.name,
      Number(record.age),
      Number(record.constituency),
    ],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleBackButton = () => {
    router.back();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setRecord((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    console.log(error);
    write?.();
    // TODO: Write to contract with these values
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full flex flex-col">
      <div className="m-4 space-x-2">
        <button
          onClick={handleBackButton}
          className="mr-4 text-white bg-red hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back
        </button>
      </div>
      <span className="mb-2 text-2xl font-semi tracking-tight text-center text-gold dark:text-black">
        Enter your information
      </span>
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="p-6 bg-gold flex justify-center text-white rounded-lg border border-gold shadow-md dark:bg-gray-800 dark:border-gray-700 w-full">
          <div className="space-y-8 divide-y divide-gray-200 justify-center items-center text-center">
            <div className="mt-6 grid flex justify-center gap-y-6 gap-x-4">
              <div className="sm:col-span-12 lg:col-span-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    onChange={handleChange}
                    style={{ color: "black" }}
                    value={record.name}
                    type="text"
                    name="name"
                    autoComplete="name"
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
              <div className="sm:col-span-12 lg:col-span-6">
                <label
                  htmlFor="constituency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Constituency
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    onChange={handleChange}
                    style={{ color: "black" }}
                    value={record.constituency}
                    type="text"
                    name="constituency"
                    autoComplete="party"
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
              <div className="sm:col-span-12 lg:col-span-6">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    onChange={handleChange}
                    style={{ color: "black" }}
                    value={record.age}
                    type="number"
                    name="age"
                    autoComplete="age"
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>

              <div className="sm:col-span-12 lg:col-span-6">
                <button
                  onClick={handleAddRecord}
                  type="submit"
                  className="text-white bg-green hover:bg-blue-800 focus:ring-4 focus:outline-none font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center lg:col-span-3"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
