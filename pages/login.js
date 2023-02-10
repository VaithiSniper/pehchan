import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import account from "../appwrite.config.js";
import LoginComponent from "../components/login";

export default function Login() {
  const router = useRouter();
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
    >
      <Head>
        <title>Login</title>
        <meta name="description" content="SDI Admin" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.main}>
        <div className="flex flex-col justify-center space-y-8 items-center">
          <div>
            <p className="text-6xl font-sans font-bold">Login</p>
          </div>
          <LoginComponent
            text="Login"
            path="/admin/dashboard"
            method={authUser}
          />
        </div>
      </div>
      <footer className={styles.footer}>
        <em>
          Made with ❤️ by
          <a
            href="https://github.com/VaithiSniper"
            className="text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vaithi Sniper
          </a>
        </em>
      </footer>
    </div>
  );
}

// Authenticate User
const authUser = async (user) => {
  const promise = await account.createEmailSession(user.email, user.password);
  return promise;
};
