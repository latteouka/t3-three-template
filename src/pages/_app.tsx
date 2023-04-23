import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";

import { useEffect, useRef } from "react";
import { Noto_Sans_JP } from "next/font/google";
import Head from "next/head";
import { MainScene } from "@/gl/parts/MainScene";

import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import Item from "@/components/canvas/Item";
const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: true });

const font = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--noto-font",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const ref = useRef<HTMLDivElement>(null);
  const three = useRef<MainScene>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (three.current) return;
    if (!canvas.current) return;

    three.current = new MainScene({
      el: canvas.current,
    });
  }, []);

  return (
    <main className={font.variable}>
      <Head>
        <title>Next Template</title>
      </Head>

      {/* vallina */}
      <canvas
        ref={canvas}
        className="pointer-events-none fixed left-0 top-0 -z-10 h-screen w-full"
      ></canvas>

      <Layout ref={ref}>
        <Component {...pageProps} />
        {/* R3F */}
        {/* <Scene */}
        {/*   eventSource={ref} */}
        {/*   eventPrefix="client" */}
        {/*   className="pointer-events-none" */}
        {/* > */}
        {/*   <Item /> */}
        {/* </Scene> */}
      </Layout>
    </main>
  );
};

export default api.withTRPC(MyApp);
