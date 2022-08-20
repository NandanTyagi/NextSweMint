import { useState, useEffect } from 'react';
import NftCard from './NftCard';
import NoNftMsg from './NoNftMsg';
import {motion} from 'framer-motion';
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

    // console.log('In dashbord', nfts)
    console.log('In dashbord', NFTS)
    
    // parseMetadata(nfts)
    
  }, [isInitialized])
  
  return (
    <div className={styles.dashboard}>
      {!NFTS?<NoNftMsg/>
      :NFTS.map((nft,i) => {
        // console.log('gjhdalsöhgöldsgkhölsdf type', typeof nft.metadata)
        // console.log('gjhdalsöhgöldsgkhölsdf metadata', nft.metadata)
        // console.log('gjhdalsöhgöldsgkhölsdf nft', nft)
        // nft.metadata = nft.metadata.substring(0,nft.metadata.length)
        // console.log('gjhdalsöhgöldsgkhölsdf', nft.metadata)
        // nft.metadata.splice(nft.metadata.length-1,1)
        // let string = JSON.stringify(nft.metadata)
        // nft.metadata = JSON.parse(string)
        // nft.metadata = JSON.parse(nft.metadata)
       return <motion.div key={i} initial="hidden" animate="visible" variants={{
        hidden: {
          scale: 0,
          opacity: 0
        },
        visible: {
          scale: [0.1,0.2,0.3,0.4,0.5, 0.6,0.7,0.8,0.9, 1],
          opacity: [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9, 1],
          transition: {
            delay: .5
          }
        }
       }} 
      //  whileHover={{
      //   position: 'relative',
      //   zIndex:1,
      //   scale: [1, 1.4, 1.2],
      //   transition:{
      //     duration: .6
      //   }
      //  }}
       >
      
      {nft.metadata?<NftCard key={i} nft={nft} imageUrl={nft.metadata.image} name={nft.metadata.name} description={nft.metadata.description} tokenId={nft.token_id}/>:
      <NftCard key={i} nft={nft} imageUrl={'https://zjaux8t7jfje.usemoralis.com/ipa3.jpg'} name={'Error'} description={'error'} tokenId={nft.token_id}/>}
      
      </motion.div>
 
     
        {/* <NftCard key={i} nft={nft} imageUrl={nft.image} name={nft.name} description={nft.description} tokenId={nft.token_id}/></motion.div> */}
      })}
    </div>
    );
}

export default Dashboard;