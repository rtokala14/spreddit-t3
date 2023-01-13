import Head from "next/head";
import React from "react";
import CreateCommunity from "./CreateCommunity";
import CreatePost from "./CreatePost";
import { NavBar } from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
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
      <div className="flex min-h-screen w-full flex-col items-center  bg-gradient-to-br from-[#000000] to-[#232327]">
        <NavBar />
        <main className=" mt-20 flex w-full flex-col items-center">
          {children}
        </main>
        {/* Create Post */}
        <CreatePost />

        {/* Create Community */}
        <CreateCommunity />
      </div>
    </>
  );
}
