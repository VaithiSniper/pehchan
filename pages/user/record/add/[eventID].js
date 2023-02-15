import Head from "next/head";
import { useState, Fragment, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../../../../styles/Home.module.css";
import { addRecordsToDatabase } from "../../../../appwrite.config";
import Toast from "../../../../components/toast";

export default function Home() {
  const router = useRouter();
  const title = router.query.eventID;

  const [record, setRecord] = useState({
    eventName: "",
    teacher: "Nethravathy",
    eventID: title,
    description: "",
    date: "dd/mm/yyyy",
    amountParticulars: [],
    amountExpenditure: [],
  });

  const [success, setSuccess] = useState();

  const dataRef = useRef({});
  dataRef.current = record;

  const handleBackButton = () => {
    router.back();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name.includes("amountExpenditure")) {
      const index = parseInt(name.charAt(name.length - 1));
      const newAmountExpenditure = dataRef.current.amountExpenditure;
      newAmountExpenditure[index] = value;
      setRecord((prevState) => ({
        ...prevState,
        amountExpenditure: newAmountExpenditure,
      }));
    } else if (name.includes("amountParticulars")) {
      const index = parseInt(name.charAt(name.length - 1));
      const newAmountParticulars = dataRef.current.amountParticulars;
      newAmountParticulars[index] = value;
      setRecord((prevState) => ({
        ...prevState,
        amountParticulars: newAmountParticulars,
      }));
    } else setRecord((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddRecord = () => {
    try {
      addRecordsToDatabase("details", JSON.stringify(record), title);
      const totalAmount = record.amountExpenditure.reduce(
        (previousValue, currentValue) =>
          parseInt(previousValue) + parseInt(currentValue),
        0
      );
      addRecordsToDatabase(
        "record",
        JSON.stringify({
          date: record.date,
          eventName: record.eventName,
          eventID: record.eventID,
          totalAmount: totalAmount,
        }),
        title
      );
      setSuccess(true, () => {
        setTimeout(() => {
          setSuccess(over);
        }, 2000);
      });
    } catch (err) {
      setSuccess(false);
    }
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    const newAmountParticulars = [...dataRef.current.amountParticulars, ""];
    const newAmountExpenditure = [...dataRef.current.amountExpenditure, ""];
    setRecord((prevState) => {
      return {
        ...prevState,
        amountParticulars: newAmountParticulars,
        amountExpenditure: newAmountExpenditure,
      };
    });
  };

  const handleDeleteRow = (event) => {
    setRecord((prevState) => {
      const newAmountParticulars = prevState.amountParticulars.slice(
        0,
        prevState.amountParticulars.length - 1
      );
      const newAmountExpenditure = prevState.amountExpenditure.slice(
        0,
        prevState.amountParticulars.length - 1
      );
      return {
        ...prevState,
        amountParticulars: newAmountParticulars,
        amountExpenditure: newAmountExpenditure,
      };
    });
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
        <title>Add record</title>
        <meta name="description" content="SDI TechTriWizard" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.main}>
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
              {title}
            </span>
            <button
              onClick={handleAddRecord}
              className="w-full text-white bg-green hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right"
            >
              Add
            </button>
          </div>
          <form className="space-y-8 divide-y divide-gray-200">
            <div className="p-6 bg-gold text-white rounded-lg border border-gold shadow-md dark:bg-gray-800 dark:border-gray-700 w-full">
              {success === true ? (
                <Toast
                  success={success}
                  successText="Successfully added"
                  failureText="Invalid entries"
                  extraErrorText="Invalid Email"
                  extraErrorCondition="Invalid Email"
                />
              ) : null}
              <div className="space-y-8 divide-y divide-gray-200">
                <div className="mt-6 grid lg:grid-cols-5 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-4 lg:col-span-2">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Event Name
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        onChange={handleChange}
                        style={{ color: "black" }}
                        value={record.eventName}
                        type="text"
                        name="eventName"
                        autoComplete="eventName"
                        className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4 lg:col-span-1">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Event Date
                    </label>
                    <div
                      class="datepicker relative form-floating mb-3 xl:w-96"
                      data-mdb-toggle-button="false"
                    >
                      <input
                        name="date"
                        onChange={handleChange}
                        value={record.date}
                        style={{ color: "black" }}
                        type="date"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        onChange={handleChange}
                        value={record.description}
                        style={{ color: "black" }}
                        name="description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Expenditure Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Mention the particulars and amount.
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-5 gap-y-6 gap-x-4 sm:grid-cols-5">
                    <div className="sm:col-span-2 lg:col-span-2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-bold text-gray-700"
                      >
                        Particulars
                      </label>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-2">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-bold text-gray-700"
                      >
                        Amount
                      </label>
                    </div>
                    <div className="sm:col-span-1 lg:col-span-1">
                      <button
                        onClick={handleAddRow}
                        className="text-white bg-green hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        +
                      </button>
                    </div>
                    {/* Heading section */}
                    {record.amountExpenditure.length === 0 ? (
                      <div className="sm:col-span-2 lg:col-span-2">None</div>
                    ) : (
                      record.amountExpenditure.map((amount, index) => {
                        return (
                          <Fragment key={index}>
                            <div className="sm:col-span-2 lg:col-span-2">
                              <input
                                placeholder="Particulars"
                                name={`amountParticulars${index}`}
                                onChange={handleChange}
                                value={record.amountParticulars[index]}
                                style={{ color: "black" }}
                                type="text"
                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              />
                            </div>
                            <div
                              className="sm:col-span-2 lg:col-span-2"
                              key={"amountExpenditure" + index}
                            >
                              <input
                                name={`amountExpenditure${index}`}
                                onChange={handleChange}
                                value={record.amountExpenditure[index]}
                                style={{ color: "black" }}
                                type="text"
                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Amount"
                              />
                            </div>
                            {index === record.amountParticulars.length - 1 ? (
                              <div className="sm:col-span-1 lg:col-span-1">
                                <button
                                  onClick={handleDeleteRow}
                                  className="text-white bg-red hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                  -
                                </button>
                              </div>
                            ) : null}
                          </Fragment>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
