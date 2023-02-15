import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../../../styles/Home.module.css";
import Logo from "../../../../components/logo";
import { fetchRecordByID } from "../../../../appwrite.config";
import Table from "../../../../components/table";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { BackspaceIcon } from "@heroicons/react/solid";

export default function Home() {
  const router = useRouter();
  const title = router.query.eventID;

  const [record, setRecord] = useState({
    eventName: "",
    eventID: "",
    description: "",
    date: "",
    amountParticulars: ["", ""],
    amountExpenditure: ["", ""],
  });

  useEffect(() => {
    fetchRecordByID("details", title).then((result) => {
      setRecord(result);
    });
  }, []);

  const printDocument = () => {
    window.print();
  };

  const downloadDocument = () => {
    const input = document.getElementById("print");
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.output("dataurlnewwindow");
      pdf.save(`${record.eventName}.pdf`);
    });
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
        <title>{title}</title>
        <meta name="description" content="SDI TechTriWizard" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.main} id="print">
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full flex flex-col">
          <div className="m-4 space-x-2">
            <button
              onClick={handleBackButton}
              className="mr-4 w-full text-white bg-red hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Back
            </button>
            <span className="mb-2 text-2xl font-semi tracking-tight text-gold dark:text-black">
              SDI Club /
            </span>
            <span className="mb-2 text-1xl font-light tracking-tight text-gold dark:text-black">
              {record.eventID}
            </span>
            <button
              onClick={printDocument}
              className="w-full text-white bg-gold hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right"
            >
              Print
            </button>
            <button
              onClick={downloadDocument}
              className="w-full text-white bg-gold hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right"
            >
              Download
            </button>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gold shadow-md dark:bg-gray-800 dark:border-gray-700 w-full">
            <span className="mb-2 text-2xl font-semi tracking-tight text-gold dark:text-black">
              {record.eventName}
            </span>
            <span className="mb-2 text-2xl font-semi tracking-tight text-gold dark:text-black float-right">
              {record.date}
            </span>
            <p className="mb-2 text-lg font-light tracking-normal text-gold dark:text-black">
              {record.description}
            </p>
            <Table data={record} />
            <span className="mb-2 text-1xl font-semi tracking-tight text-gold dark:text-black float-right">
              {record.teacher}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
