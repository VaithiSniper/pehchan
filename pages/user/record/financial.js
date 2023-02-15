import React, { useState, useRef, useMemo, useCallback } from "react";
import Head from "next/head";
import { AgGridReact } from "ag-grid-react";
import styles from "../../../styles/Home.module.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  listRecordsInDatabase,
  deleteRecordsInDatabase,
} from "../../../appwrite.config";
import { useRouter } from "next/router";
import ShortUniqueId from "short-unique-id";
import { TrashIcon } from "@heroicons/react/solid";
import Toast from "../../../components/toast";

const financial = () => {
  const router = useRouter();
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [success, setSuccess] = useState();

  const [columnDefs, setColumnDefs] = useState([
    { field: "date" },
    { field: "eventName" },
    { field: "totalAmount" },
    {
      field: "eventID",
      headerName: "View Details",
      cellRenderer: function (params) {
        return (
          <button
            type="submit"
            style={{ width: "100%", height: "100%", margin: 0 }}
            className="w-full text-white bg-gold hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View
          </button>
        );
      },
      onCellClicked: (params) => {
        router.push(`details/${params.value}`);
      },
    },
    {
      field: "$id",
      headerName: "Delete",
      cellRenderer: function (params) {
        return (
          <button
            type="submit"
            style={{ width: "100%", height: "100%", margin: 0 }}
            className="w-full text-white bg-red hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <TrashIcon />
          </button>
        );
      },
      onCellClicked: async (params) => {
        try {
          await deleteRecordsInDatabase("record", params.value);
          await deleteRecordsInDatabase("details", params.value);
          setSuccess(true, () => {});
          setTimeout(() => {
            setSuccess("over");
            router.reload(window.location.pathname);
          }, 2000);
        } catch (err) {
          setSuccess(false);
        }
      },
    },
  ]);

  const defaultColDef = useMemo(() => ({
    enableCellChangeFlash: true,
    sortable: true,
    filter: true,
    pagination: true,
  }));

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
    listRecordsInDatabase(0)
      .then((result) => result.documents)
      .then((rowData) => setRowData(rowData));
  }, []);

  const onBtExport = () => {
    gridRef.current.api.exportDataAsExcel();
  };

  const handleAddRecord = () => {
    const uid = new ShortUniqueId({ length: 10 });
    router.push(`add/${uid()}`);
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
        <title>Event Records</title>
        <meta name="description" content="SDI TechTriWizard" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.main}>
        <div className="justify-center items-center text-center gap-8 flex flex-row">
          <div className="flex flex-col gap-8">
            <button
              onClick={handleAddRecord}
              className="px-6 py-2.5 bg-green text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add record
            </button>
            <button
              onClick={onBtExport}
              className="px-6 py-2.5 bg-gold text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Export
            </button>
          </div>
          <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>
            <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Event Records
            </h5>

            {success === true ? (
              <Toast
                success={success}
                successText="Successfully removed"
                failureText="Something went wrong"
                extraErrorText="Invalid Email"
                extraErrorCondition="Invalid Email"
              />
            ) : null}

            <AgGridReact
              className="mt-10"
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowSelection="multiple"
              onGridReady={onGridReady}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default financial;
