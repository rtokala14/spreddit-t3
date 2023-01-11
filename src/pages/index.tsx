import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import CreateCommunity from "../components/CreateCommunity";
import CreatePost from "../components/CreatePost";

import { NavBar } from "../components/NavBar";
import Posts from "../components/Posts";
import TopBox from "../components/TopBox";

const Home: NextPage = () => {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isCommOpen, setIsCommOpen] = useState(false);

  function closeModal() {
    setIsPostOpen(false);
  }

  function openModal() {
    setIsPostOpen(true);
  }

  function openCommModal() {
    setIsCommOpen(true);
  }

  function closeCommModal() {
    setIsCommOpen(false);
  }

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
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#000000] to-[#232327]">
        <NavBar />
        <TopBox
          isPostOpen={isPostOpen}
          closeModal={closeModal}
          openModal={openModal}
          isCommOpen={isCommOpen}
          closeCommModal={closeCommModal}
          openCommModal={openCommModal}
        />
        <Posts />

        {/* Create Post */}
        <CreatePost
          isPostOpen={isPostOpen}
          closeModal={closeModal}
          openModal={openModal}
        />

        {/* Create Community */}
        <CreateCommunity
          isCommOpen={isCommOpen}
          closeCommModal={closeCommModal}
          openCommModal={openCommModal}
        />
      </main>
    </>
  );
};

export default Home;
