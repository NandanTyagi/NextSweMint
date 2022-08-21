import { useState, useEffect } from 'react';
import NftCard from './NftCard';
import ConnectBtn from './ConnectBtn';
import NoNftMsg from './NoNftMsg';
// import {motion} from 'framer-motion';
import styles from '../styles/Dashboard.module.css';
import { isInitialized, useMoralis } from "react-moralis";



const Dashboard = ({ NFTS }) => {
  const [nfts, setNfts] = useState(NFTS);

  const { isInitialized, isInitializing, isAuthenticated } = useMoralis();

  useEffect(() => {
    setNfts(NFTS)
    console.log('In dashbord', NFTS)
  }, [isInitialized])
  
  return (
    <div className={styles.dashboard}>
      {!isAuthenticated?<NoNftMsg/>
      :NFTS.map((nft,i) => {
      return nft.metadata?<NftCard key={i} nft={nft} imageUrl={nft.metadata.image} name={nft.metadata.name} description={nft.metadata.description} tokenId={nft.token_id}/>:
      <NftCard key={i} nft={nft} imageUrl={'https://zjaux8t7jfje.usemoralis.com/ipa3.jpg'} name={'Error'} description={'error'} tokenId={nft.token_id}/>
      })}
    </div>
    );
}

export default Dashboard;