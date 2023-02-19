import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import abiArray from "../../../contracts/candidateAbiArray";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useRouter } from "next/router";
import { CodeIcon, TrashIcon } from "@heroicons/react/solid";
import { ArrowUpIcon } from "@heroicons/react/outline";
import {
  useContractRead,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractEvent,
} from "wagmi";
import { ethers } from "ethers";
import { candidateRecieved } from "../../../push.config";

const contractAddress =
  process.env.NEXT_PUBLIC_CANDIDATE_SMART_CONTRACT_ADDRESS_POLYGON;
const contractAbi = new ethers.utils.Interface(abiArray);

const statusFlags = (num) =>
  num === 1
    ? "In review"
    : num === 2
    ? "KYC Pending"
    : num === 3
    ? "Approved"
    : null;

const financial = () => {
  const router = useRouter();
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const { address } = useAccount();
  const [config, setConfig] = useState({
    address: contractAddress,
    abi: abiArray,
    functionName: "upgradeCandidate",
    args: ["0x168a40fa5495Ff7F92fCEb743A10984E409bb444"],
  });
  useContractEvent(candidateRecieved);

  console.log("Data is ", address);
  let dataArr;
  if (address != null) {
    const { data, isError, isLoading, error } = useContractRead({
      address: contractAddress,
      abi: contractAbi,
      functionName: "getDataOfAllCandidates",
      select: (data) =>
        data
          .map((dataItems, index) => ({
            Name: dataItems[0],
            Party: dataItems[1],
            Age: Number(dataItems[2]),
            Address: dataItems[3],
            ApplicationStaus: statusFlags(dataItems[4]),
            ConstituencyCode: Number(dataItems[5]),
            CandidateID: index,
          }))
          .filter(
            (dataItem) =>
              dataItem.Name !== "" &&
              dataItem.Party !== "" &&
              dataItem.Address !== "0x168a40fa5495Ff7F92fCEb743A10984E409bb444"
          ),
    });
    dataArr = data;
  }

  // TODO: Implement The Graph
  useEffect(() => {
    if (config.args[0] !== "0x168a40fa5495Ff7F92fCEb743A10984E409bb444") {
      console.log(config, writeRes);
      writeRes.write?.();
    }
  }, [config]);

  let configRes, writeRes;
  if (config) {
    configRes = usePrepareContractWrite(config);
    writeRes = useContractWrite(configRes.config);
  }

  const [columnDefs] = useState([
    { field: "Name" },
    { field: "Party" },
    { field: "Age" },
    { field: "Constituency" },
    { field: "CandidateID" },
    { field: "ConstituencyCode" },
    {
      field: "ApplicationStaus",
      headerName: "Application Staus",
      cellRenderer: function (params) {
        return (
          <>
            {params.data.ApplicationStaus}
            <button
              type="submit"
              style={{ width: "10%", height: "80%", margin: "0% 1%" }}
              className="text-white bg-green hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {/* TODO: Fix icon not showing up */}
              <ArrowUpIcon />
            </button>
          </>
        );
      },
      onCellClicked: (params) => {
        const configObj = {
          address: contractAddress,
          abi: abiArray,
          functionName: "upgradeCandidate",
          args: [params.data.Address],
        };
        setConfig(configObj);
      },
    },
    {
      field: "Address",
      headerName: "Delete",
      cellRenderer: function (params) {
        return (
          <button
            type="submit"
            style={{ width: "60%", height: "80%", margin: "3.1% auto" }}
            className="text-white bg-red hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <TrashIcon />
          </button>
        );
      },
      onCellClicked: async (params) => {
        const configObj = {
          address: contractAddress,
          abi: abiArray,
          functionName: "removeCandidate",
          args: [params.data.Address],
        };
        setConfig(configObj);
      },
    },
  ]);

  const defaultColDef = useMemo(() => ({
    enableCellChangeFlash: true,
    sortable: true,
    filter: true,
    pagination: true,
    resizable: true,
  }));

  const onGridReady = useCallback((params) => {
    setRowData(dataArr);
    params.api.sizeColumnsToFit();
  }, []);

  const onBtExport = () => {
    gridRef.current.api.exportDataAsCsv();
  };

  return (
    <div className="justify-center items-center text-center gap-8 flex flex-row">
      <div className="flex flex-col gap-8">
        <button
          onClick={() => {
            router.back();
          }}
          className="px-6 py-2.5 bg-red text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Back
        </button>
        <button
          onClick={onBtExport}
          className="px-6 py-2.5 bg-gold text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Export
        </button>
      </div>
      <div className="ag-theme-alpine" style={{ width: 800, height: 500 }}>
        <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Candidate List
        </h5>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          ref={gridRef}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
        ></AgGridReact>
      </div>
    </div>
  );
};

export default financial;
