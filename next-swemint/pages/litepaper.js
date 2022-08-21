import { useEffect } from "react";
import Layout from "../components/Layout";
import formatNfts from "../utils/formatNfts";
import NextHead from "../components/NextHead";

export function getStaticProps() {
  let address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  let chain = process.env.NEXT_PUBLIC_CHAIN;
  let api_key = process.env.NEXT_PUBLIC_API_KEY;

  var myHeaders = new Headers();
  myHeaders.append("x-api-key", api_key);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `https://deep-index.moralis.io/api/v2/nft/${address}?chain=${chain}&format=decimal`,
    requestOptions
  );

  const data = await res.json();

  const res1 = await fetch(
    `https://deep-index.moralis.io/api/v2/nft/${address}/owners?chain=${chain}&format=decimal`,
    requestOptions
  );
  const data1 = await res1.json();

  const formatedNFTs = await formatNfts(data, data1);

  if(formatNfts === undefined){
    return {
      props: { theNFTS: null }
    }
  }else {
    return {
      props: { theNFTS: formatedNFTs }
    };
  }
};

export function Home({ theNFTS = null }) {
  useEffect(() => {
    console.log("GLJGGLKGLKJGLGHB NFTS", theNFTS);
  }, []);
  return (
    <>
      <NextHead title={'IPANEKO | LITEPAPER'}/>
      <Layout theNFTS={theNFTS} />
    </>
  );
}

export default Home;