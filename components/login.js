import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../src/context/auth-context";
import Logo from "../components/logo";
import Toast from "../components/toast";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function LoginCard(props) {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState();

  const handleClick = async (event) => {
    event.preventDefault();
    if (validateEmail(user.email))
      try {
        const res = await props.method(user);
        await authContext.setAuthState(res);
        await setSuccess(true);
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
      } catch (err) {
        err.message === "Invalid credentials" ? setSuccess(false) : null;
      }
    else {
      setSuccess("Invalid Email");
    }
  };

  useEffect(() => {
    localStorage.getItem("token") ? router.push("/admin/dashboard") : null;
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gold">
      <>
        <Toast
          success={success}
          successText="Successfully logged in"
          failureText="Invalid credentials"
          extraErrorText="Invalid Email"
          extraErrorCondition="Invalid Email"
        />
      </>
      <div className="px-6 py-4 space-y-4">
        <div className="font-bold text-xl mb-2">{props.title}</div>
        <div className="flex flex-col justify-center items-center">
          <Logo />
        </div>
        <form
          onSubmit={handleClick}
          className="flex flex-col justify-center space-y-4 items-center"
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
            >
              Your email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@example.com"
              required={true}
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-black focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={true}
              placeholder="example"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-grey hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {props.text}
          </button>
        </form>
      </div>
    </div>
  );
}
