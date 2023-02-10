import "../styles/globals.css";
import { AuthProvider } from "../src/context/auth-context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
