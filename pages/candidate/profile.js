import Head from "next/head";
import account from "./../../appwrite.config";
import { useState, useEffect } from "react";

export default function Profile() {
  //create user state
  const [user, setUser] = useState({ name: "Admin" });
  //fetch user
  const userFetch = async () => {
    try {
      const data = await account.get();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userFetch();
  }, [user.name]);

  return (
    <div className="container font-sans">
      <Head>
        <title>Profile</title>
        <meta name="description" content="SDI TechTriWizard" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="text-center">
        <div className="justify-center items-center text-center gap-8 flex flex-row">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-4/5 px-4 py-4 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800">
            <div>
              <h3 className="text-4xl sm:text-4xl text-gray-700 font-semibold dark:text-black py-4">
                Your profile
              </h3>
            </div>
            <div>
              <h3 className="text-xl sm:text-1xl text-gray-700 font-semibold dark:text-black py-4">
                Name: {user.name}
              </h3>
              <h3 className="text-xl sm:text-1xl text-gray-700 font-semibold dark:text-black py-4">
                Email: {user.email}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
