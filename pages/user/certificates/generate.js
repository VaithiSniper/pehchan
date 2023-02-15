import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { listAll, listRef, getMetadata } from "../../../firebase.config";
import axios from "axios";
import { addToStorage } from "../../../appwrite.config";
import styles from "../../../styles/Home.module.css";
import { listCertificatesInStorage } from "../../../appwrite.config";
import Toast from "../../../components/toast";
import Link from "next/link";
import { functions } from "../../../appwrite.config";

export default function Home() {
  // certificates state
  const [certificateList, setCertificateList] = useState();
  // xlsx state
  const [xlsx, setXlsx] = useState(null);
  const [success, setSuccess] = useState();

  const handleToast = (state) => {
    setSuccess(state);
    setTimeout(() => {
      setSuccess();
    }, 3000);
  };

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setXlsx(i);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (xlsx.type.includes("spreadsheet")) {
      try {
        addToStorage(xlsx, "xlsx");
        handleToast(true);
      } catch (err) {
        handleToast(false);
      }
    } else handleToast("Invalid Format");
  };

  useEffect(() => {
    async function fetchCertificates() {
      try {
        let res = await listCertificatesInStorage();
        setCertificateList(res.files);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCertificates();
  }, []);
  const router = useRouter();

  const handleSubmitGenerate = async (e) => {
    e.preventDefault();
    //appwrite shit
    const promise = functions.createExecution("1001", "63555d83e329bbca35db");
    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    //nextjs shit
    // const response = await axios.post(
    //   "http://localhost:3001/api/generateCertificate",
    //   JSON.stringify({
    //     certificateID: "1",
    //     participantName: "Vaithee",
    //     participantEmail: "vaithi.genghiskhan@gmail.com",
    //   }),
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log(response);
  };

  const handleBackButton = () => {
    router.back();
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
        <title>Generate Certificates</title>
        <meta name="description" content="SDI TechTriWizard" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.main}>
        <Toast
          success={success}
          successText="XLSX has been uploaded successfully!"
          failureText="Unable to upload, please check the file"
          extraErrorText="Invalid format, use XLSX only"
          extraErrorCondition="Invalid Format"
        />
        <div className="justify-center items-center text-center gap-8 flex flex-row">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-4/5 px-4 py-4 bg-grey mt-6 shadow-lg rounded-lg dark:bg-gray-800 space-y-8">
            <div className="font-bold text-xl mb-2 text-gold">
              <div className="justify-left items-left text-left gap-8 flex flex-row">
                <button
                  onClick={handleBackButton}
                  className="m-4 w-half text-white bg-red hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Back
                </button>
              </div>
              <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Generate Certificates
              </h5>
              <div className="font-light text-gold text-lg animate-pulse">
                <p>
                  Please read the{" "}
                  <Link href="certificates/add">
                    <a style={{ color: "gold", textDecoration: "underline" }}>
                      manual
                    </a>
                  </Link>{" "}
                  before using this.
                </p>
              </div>
            </div>
            <div>
              <div className="font-bold text-xl mb-2 text-white flex flex-col justify-center items-center gap-y-8 font-mono">
                <input type="file" name="myImage" onChange={handleChange} />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-gold text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Upload XLSX File
                </button>
              </div>
            </div>
            <div className="font-bold text-lg mb-2 text-white">
              <div className="font-light text-gray-700 dark:text-gray-400">
                <p>
                  Choose the type of certificate to generate. It will be
                  generated and automatically mailed to the participants.
                </p>
              </div>
            </div>
            <div>
              <form>
                <div className="font-light text-lg ma-2 text-black flex flex-col justify-center items-center gap-y-8">
                  <select name="certificates">
                    {certificateList
                      ? certificateList.map((item) => (
                          <option value={item.name} key={item.name}>
                            {item.name}
                          </option>
                        ))
                      : null}
                  </select>
                  <button
                    type="submit"
                    onClick={handleSubmitGenerate}
                    className="px-6 py-2.5 bg-gold text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Generate and Mail
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
