import "../styles/globals.css";
import "../styles/water.css";
import { withPasswordProtect } from "@storyofams/next-password-protect";


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(MyApp, {
      loginComponentProps: {
        logo: "/logo.png",
      },
    })
  : MyApp;

  
// export default MyApp;
