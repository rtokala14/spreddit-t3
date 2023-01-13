import { type NextPage } from "next";

import Posts from "../components/Posts";
import TopBox from "../components/TopBox";

const Home: NextPage = () => {
  return (
    <>
      {/* <NavBar /> */}
      <TopBox />
      <Posts />
    </>
  );
};

export default Home;
