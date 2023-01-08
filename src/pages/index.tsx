import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../utils/api";
import { NavBar } from "../components/NavBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spreddit</title>
        <meta
          name="description"
          content="A clone of Reddit by Rohit Reddy Tokala"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#000000] to-[#232327]">
        <NavBar />
      </main>
    </>
  );
};

export default Home;
