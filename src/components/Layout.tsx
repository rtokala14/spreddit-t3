import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import CreateCommunity from "./CreateCommunity";
import CreatePost from "./CreatePost";
import { NavBar } from "./NavBar";
import SpeedDial from "./SpeedDial";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Spreddit</title>
        <meta
          name="description"
          content="A clone of Reddit by Rohit Reddy Tokala"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="-E-sds6B71XXlLSom-XlN8BKu8cKF6oCAJHxzmSFRpU"
        />
      </Head>
      <div className="flex min-h-screen w-full flex-col items-center  bg-gradient-to-br from-[#000000] to-[#232327]">
        <NavBar />
        <main className=" mt-16 flex min-h-screen w-full flex-col items-center">
          {children}
        </main>
        {/* Create Post */}
        <CreatePost />

        {/* Create Community */}
        <CreateCommunity />
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        {/* Speed Dial on pages not homepage */}
        {router.pathname !== "/" ? <SpeedDial /> : <></>}
      </div>
    </>
  );
}
