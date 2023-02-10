import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../../styles/Home.module.css";
import { addToStorage } from "../../../appwrite.config";
import Toast from "../../../components/toast";

export default function Home() {
  const [image, setImage] = useState();
  const [success, setSuccess] = useState();

  const router = useRouter();

  const handleToast = (state) => {
    setSuccess(state);
    setTimeout(() => {
      setSuccess();
    }, 3000);
  };

  const handleChange = (event) => {
    const i = event.target.files[0];
    setImage(i);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image.type === "image/png") {
      try {
        addToStorage(image, "image");
        handleToast(true);
      } catch (err) {
        handleToast(false);
      }
    } else handleToast("Invalid Format");
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
        color: "white",
      }}
      className="font-sans"
    >
      <Head>
        <title>Manage Certificates</title>
        <meta name="description" content="SDI TechTriWizard" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.main}>
        <Toast
          success={success}
          successText="Certificate has been uploaded successfully!"
          failureText="Unable to upload, please check the file"
          extraErrorText="Invalid format, use PNG only"
          extraErrorCondition="Invalid Format"
        />
        <div className="justify-center items-center text-center gap-8 flex flex-row">
          <div className="w-half sm:w-1/2 md:w-1/2 lg:w-4/5 px-4 py-4 bg-grey mt-6 shadow-lg rounded-lg dark:bg-gray-800 space-y-8">
            <div className="font-bold text-xl mb-2 text-gold">
              <div className="justify-left items-left text-left gap-8 flex flex-row">
                <button
                  onClick={handleBackButton}
                  className="m-4 w-half text-white bg-red hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Back
                </button>
              </div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Manage Certificates
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Upload PNGs only. Resolution must be 2000 x 1400. Must follow
                the format as usual. Make sure to mention the type of
                certificate
              </p>
            </div>
            <>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Add Certificates
              </h5>
              <div className="font-bold text-xl mb-2 text-white flex flex-col justify-center items-center gap-y-8">
                <form onSubmit={handleSubmit}>
                  <input type="file" name="myImage" onChange={handleChange} />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out bg-green dark:bg-green"
                  >
                    Upload Certificate
                  </button>
                </form>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
