import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { NavBar } from "../components/NavBar";
import CreatePost from "../components/CreatePost";
import CreateCommunity from "../components/CreateCommunity";
import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { GlobalContextProvider } from "../contexts/globalContext";

export const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <GlobalContextProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </GlobalContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
