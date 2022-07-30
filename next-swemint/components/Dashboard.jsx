import { useState, useEffect } from 'react';
import NftCard from './NftCard';
import styles from '../styles/Dashboard.module.css';
import { isInitialized, useMoralis } from "react-moralis";


const Dashboard = ({ NFTS }) => {
  const [nfts, setNfts] = useState(NFTS);

  const { isInitialized, isInitializing } = useMoralis();

// async function parseMetadata(nfts) {
//   nfts.forEach(nft => {
//     console.log('ashfaösdfghöadkgfhasdö', nft.metadata)
//     // nft.metadata = JSON.parse(nft.metadata)
//     return nft
//   });
// }

  useEffect(() => {

    setNfts(NFTS)

    console.log('In dashbord', nfts)
    // console.log('In dashbord', NFTS)
    
    // parseMetadata(nfts)
    
  }, [isInitialized])
  
  return (
    <div className={styles.dashboard}>
      {NFTS.map((nft,i) => {
        console.log('gjhdalsöhgöldsgkhölsdf', typeof nft.metadata)
        console.log('gjhdalsöhgöldsgkhölsdf', nft.metadata)
        // nft.metadata = nft.metadata.substring(0,nft.metadata.length)
        // console.log('gjhdalsöhgöldsgkhölsdf', nft.metadata)
        // nft.metadata.splice(nft.metadata.length-1,1)
        // let string = JSON.stringify(nft.metadata)
        // nft.metadata = JSON.parse(string)
        // nft.metadata = JSON.parse(nft.metadata)
       return <NftCard key={i} imageUrl={nft.metadata.image} name={nft.metadata.name} description={nft.metadata.description} tokenId={nft.tokenId}/>
      })}
    </div>
    );
}

export default Dashboard;