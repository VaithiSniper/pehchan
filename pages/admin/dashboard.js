import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Card from "../../components/card";
import account from "../../appwrite.config";
import { AuthContext } from "../../src/context/auth-context";
import styles from "../../styles/Home.module.css";
const Dashboard = () => {
  //setup router object
  const router = useRouter();
  const authContext = useContext(AuthContext);
  //create user state
  const [user, setUser] = useState({ name: "Admin" });
  //fetch current user function
  const userFetch = async () => {
    try {
      const data = await account.get();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  //run useEffect till user is obtained (user.name doesn't change)
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await account.get();
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    localStorage.getItem("token")
      ? router.push("/admin/dashboard")
      : router.push("/login");
    getData();
  }, [user.name]);
  //handle logout
  const handleLogout = async () => {
    const promise = account.deleteSession("current");
    promise.then(
      function (response) {
        console.log(response); // Success
        localStorage.removeItem("token");
        router.push("../login");
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: "black",
      }}
      className="font-sans"
    >
      <Head>
        <title>Admin</title>
        <meta name="description" content="SDI TechTriWizard" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.main}>
        <div className="justify-center items-center text-center gap-8 flex flex-row">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-4/5 px-4 py-4 bg-grey mt-6 shadow-lg rounded-lg dark:bg-gray-800">
            <div className="justify-end items-end text-right gap-8 flex flex-row">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-block px-6 py-2.5 bg-red text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red bg-red dark:bg-red-400 active:shadow-lg transition duration-150 ease-in-out"
              >
                Logout
              </button>
            </div>
            <div>
              <h3 className="text-4xl sm:text-4xl text-gray-700 font-semibold dark:text-white py-4">
                Welcome {user.name}
              </h3>
            </div>
            <div>
              <h3 className="text-2xl font-light sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
                What do you want to do?
              </h3>
            </div>
            <div className="text-md text-gray-500 dark:text-gray-300 pa-4 space-x-8 flex flex-row">
              <>
                <Card
                  title="Manage Certificates"
                  text="Add"
                  path="certificates/add"
                />
              </>
              <>
                <Card
                  title="Generate Certificates"
                  text="Generate"
                  path="certificates/generate"
                />
              </>
              <>
                <Card
                  title="View Records"
                  text="View"
                  path="record/financial"
                />
              </>
              <>
                <Card title="Manual Section" text="Read" path="about" />
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
