import { useEffect } from "react";
import Layout from "../components/Layout";
import NextHead from "../components/NextHead";
import loadNfts from "../utils/loadNfts";

export const getStaticProps = async () => {
  const theNFTS = await loadNfts();
  return {
    props: { theNFTS: theNFTS || null }
  };
};

export function Home({theNFTS}) {
  useEffect(() => {
    console.log("In dashboard page NFTS", theNFTS);
  }, []);

    return (
      <>
        <NextHead title={"IPANEKO | DASHBOARD"} />
        <Layout theNFTS={ theNFTS } />
      </>
    );
}

export default Home;
