import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import abiArray from "../../../contracts/candidateAbiArray";
import { useContract, useContractRead, useAccount } from "wagmi";

export default function Home() {
  const router = useRouter();

  const [record, setRecord] = useState({
    name: "",
    party: "",
    age: 18,
    isAdded: false,
  });

  const contractAddress =
    process.env.NEXT_PUBLIC_CANDIDATE_SMART_CONTRACT_ADDRESS;

  const { address } = useAccount();

  // TODO: Fix this error, contract throws error that owner and calling address doesn't match. Move this component to a general add/remove component where admin can see these candidates and get details.
  //   if (
  //     address === process.env.NEXT_PUBLIC_OWNER_ADDRESS &&
  //     address === "0x168a40fa5495Ff7F92fCEb743A10984E409bb444"
  //   ) {
  //     const { data, isError, isLoading } = useContractRead({
  //       address: contractAddress,
  //       abi: abiArray,
  //       functionName: "getDataOfCandidate",
  //       args: ["0x379f7dEBf9495D8DE278A4A45A401F27f38564B7"],
  //       enabled: true,
  //     });
  //     console.log(data);
  //   }

  const handleBackButton = () => {
    router.back();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setRecord((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
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
        Add candidates
      </span>
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="p-6 bg-gold text-white rounded-lg border border-gold shadow-md dark:bg-gray-800 dark:border-gray-700 w-full">
          <div className="space-y-8 divide-y divide-gray-200 justify-center items-center text-center">
            <div className="mt-6 grid lg:grid-cols-12 gap-y-6 gap-x-4 sm:grid-cols-12">
              <div className="sm:col-span-12 lg:col-span-4">
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
                    value={record.eventName}
                    type="text"
                    name="name"
                    autoComplete="name"
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
              <div className="sm:col-span-12 lg:col-span-4">
                <label
                  htmlFor="party"
                  className="block text-sm font-medium text-gray-700"
                >
                  Party
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    onChange={handleChange}
                    style={{ color: "black" }}
                    value={record.eventName}
                    type="text"
                    name="party"
                    autoComplete="party"
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
              <div className="sm:col-span-12 lg:col-span-4">
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
                    value={record.eventName}
                    type="number"
                    name="age"
                    autoComplete="age"
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleAddRecord}
              type="submit"
              className="text-white bg-green hover:bg-blue-800 focus:ring-4 focus:outline-none font-bold rounded-lg text-sm w-1/4 px-5 py-2.5 text-center"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
