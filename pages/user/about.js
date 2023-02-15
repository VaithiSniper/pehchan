import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const handleBackButton = () => {
    router.back();
  };

  const [content, setContent] = useState(certificatesContent);

  const handleClick = (event) => {
    setContent(
      event.target.name === "records" ? recordsContent : certificatesContent
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
        color: "white",
      }}
      className="font-sans"
    >
      <Head>
        <title>Profile</title>
        <meta name="description" content="SDI TechTriWizard" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.main}>
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
              <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                User Manual
              </h5>
            </div>
            <ul class="hidden text-sm font-semibold text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
              <li class="w-full">
                <button
                  name="certificates"
                  class="inline-block p-4 w-full text-white bg-gold rounded-l-lg"
                  onClick={handleClick}
                >
                  Certificates
                </button>
              </li>
              <li class="w-full">
                <button
                  name="records"
                  class="inline-block p-4 w-full text-white bg-gold rounded-r-lg"
                  onClick={handleClick}
                >
                  Records
                </button>
              </li>
            </ul>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

const certificatesContent = () => (
  <>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Certificates
    </h5>
    <ul className="list-disc font-light text-l m-2 text-white flex flex-col text-left gap-y-2">
      <li>
        Certificates added will be uploaded to backend, can be uploaded{" "}
        <Link href="certificates/add">
          <a style={{ color: "gold", textDecoration: "underline" }}>here</a>
        </Link>
        . Thus, upload the certificate if not already done.
      </li>
      <li>
        To generate the certificate, go{" "}
        <Link href="certificates/generate" className="text-cyan-400">
          <a style={{ color: "gold", textDecoration: "underline" }}>here</a>
        </Link>
        . Upload the xlsx file. This will also be uploaded to backend storage.
        The file should have the following format :
        <ul className="list-disc font-light text-m ml-4 text-white flex flex-col gap-y-1">
          <li>
            For any type of event, there must be only <strong>one</strong>{" "}
            workbook and <strong>one</strong> worksheet in it.
          </li>
          <li>
            There should be <strong>two particular columns</strong>, namely{" "}
            <strong>Email</strong> and <strong>Name</strong>.
          </li>
          <li>
            The <em>Name</em> will be printed on the certificate and the{" "}
            <em>Email</em> will be used to mail it.
          </li>
          <li>
            The spreadsheet must be of{" "}
            <strong>
              <em>.xlsx</em>
            </strong>{" "}
            format only.
          </li>
        </ul>
      </li>
      <li>
        Once uploaded, choose the type of certificate required and click on
        submit and send.
      </li>
    </ul>
  </>
);

const recordsContent = () => (
  <>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Records
    </h5>
    <ul className="list-disc font-light text-l m-2 text-white flex flex-col text-left gap-y-2">
      <li>
        Records added will be added to database, can be added{" "}
        <Link href="records/add">
          <a style={{ color: "gold", textDecoration: "underline" }}>here</a>
        </Link>
        . Added records and be viewed and managed in a table{" "}
        <Link href="records/view">
          <a style={{ color: "gold", textDecoration: "underline" }}>here</a>
        </Link>
        .
      </li>
      <li>
        Records serve as a single point of information regarding any event.
        While adding a record for an event, you will need the following details
        :
        <ul className="list-disc font-light text-m ml-4 text-white flex flex-col gap-y-1">
          <li>
            <strong>Name</strong>, <strong>Date</strong> and
            <strong> Description</strong> of the event
          </li>
          <li>
            <strong>Expenditure</strong>, if any. If multiple causes are
            available, all are to be specified.
          </li>
        </ul>
      </li>
    </ul>
  </>
);
