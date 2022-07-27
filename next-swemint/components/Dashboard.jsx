import { useState, useEffect } from 'react';
import NftCard from './NftCard';
import styles from '../styles/Dashboard.module.css';

 
const Dashboard = ({NFTS}) => {
const [nfts, setNfts] = useState([]);

useEffect(()=> {
  
  setNfts(NFTS)
  console.log('in dashbord', nfts)
},[nfts])
 
    return (
      <div className={styles.dashboard}>
        {nfts.map(nft => {
         return <NftCard imageUrl={nft.image} name={nft.name} description={nft.description} tokenId={nft.tokenId} key={nft.tokenId}/>
        })}
      </div>
      );
}
 
export default Dashboard;