import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CubeProvider } from "@cubejs-client/react";
import cubejsApi from "@/api/cube";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CubeProvider cubejsApi={cubejsApi}>
      <Component {...pageProps} />
    </CubeProvider>
  );
}
