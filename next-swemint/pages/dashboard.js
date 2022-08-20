import { useEffect } from "react";
import Layout from "../components/Layout";
import formatNfts from "../utils/formatNfts";
import NextHead from "../components/NextHead";

// export const getStaticProps = async () => {
//   let address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
//   let chain = process.env.NEXT_PUBLIC_CHAIN;
//   let api_key = process.env.NEXT_PUBLIC_API_KEY;

//   var myHeaders = new Headers();
//   myHeaders.append("x-api-key", api_key);

//   var requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   const nftsRes = await fetch(
//     `https://deep-index.moralis.io/api/v2/nft/${address}?chain=${chain}&format=decimal`,
//     requestOptions
//   );

//   const rawNfts = await nftsRes.json();
  
//   console.log("RAW NFTS", rawNfts);
//   const ownersRes = await fetch(
//     `https://deep-index.moralis.io/api/v2/nft/${address}/owners?chain=${chain}&format=decimal`,
//     requestOptions
//     );
//     const owners = await ownersRes.json();
//     console.log("RAW Owners", owners);
    
//     const formatedNFTs = await formatNfts(rawNfts, owners);
    
//     console.log("RAW FORMATTED",await formatedNFTs);

//   return {
//     props: { theNFTS: formatedNFTs ? formatedNFTs:null },
//   };
// };

export const getStaticProps = async () => {
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

  return {
    props: { theNFTS: formatedNFTs }
  };
};

export function Home({ theNFTS }) {
  useEffect(() => {
    console.log("GLJGGLKGLKJGLGHB NFTS", theNFTS);
    // console.log("GLJGGLKGLKJGLGHB OWNERS", theOwners);
  }, []);
  return (
    <>
      <NextHead title={"IPANEKO | DASHBOARD"} />
      <Layout theNFTS={theNFTS} />
    </>
  );
}

export default Home;
