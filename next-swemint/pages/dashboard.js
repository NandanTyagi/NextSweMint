import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import NextHead from "../components/NextHead";
import loadNfts from "../utils/loadNfts";
import loadApiNfts from "../utils/loadApiNfts";
import Loading from "../components/Loading";

export const getStaticProps = async () => {
  const theNFTS = await loadNfts();
  return {
    props: { theNFTS: theNFTS || null }
  };
};

export function Home({theNFTS}) {
  const [apiNfts, setApiNfts] = useState(theNFTS)
  useEffect(() => {
    console.log("In dashboard page NFTS", theNFTS);
    if(!theNFTS){
      setApiNfts(loadApiNfts())
    }
  }, [theNFTS]);

  if(!apiNfts){
    return <Loading/>
  }

    return (
      <>
        <NextHead title={"IPANEKO | DASHBOARD"} />
        {theNFTS?<Layout theNFTS={ theNFTS } />:<Layout theNFTS={ apiNfts } />}
      </>
    );
}

export default Home;
