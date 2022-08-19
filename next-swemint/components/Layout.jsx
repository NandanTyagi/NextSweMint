import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ConnectionMsg from './ConnectionMsg';
import Footer from './Footer';
import Main from './Main';
import styles from '../styles/Layout.module.css' ;
// import bgImageDesktop from '../public/img/swemint-bg.jpg' ;
// import bgImageMobile from '../public/img/bg-mobile.png';
import handelResize from "../utils/handelResize";
import { useMoralisWeb3Api, isInitialized, useMoralis } from "react-moralis";


export const Layout = ({theNFTS}) => {
    const [isMdViewport, setIsMdViewport] = useState(null);
    const [NFTSWithOwners, setNFTSWithOwners] = useState(false);
    const [loadingNFTS, setLoadingNFTS] = useState(true);
    const formatedNFTSRef = useRef(null);
    
  
//     async function getNFTS() {

//      const formatedNFTs = await formatNfts(theNFTS, theOWNERS);

//      console.log('qqqqqqqqqqqqqqqqqqqqq', formatedNFTs)
//      setNFTSWithOwners(formatedNFTs)
//      formatedNFTSRef.current = formatedNFTs
//     }

//     useEffect(() => {
//         getNFTS()
//         console.log('in layout getAllToken  nfts withowners', NFTSWithOwners);
//         console.log('in layout getAllToken  nfts withowners REF', formatedNFTSRef.current);
//         if(NFTSWithOwners) {
//             setLoadingNFTS(false)
//         }  
// },[theNFTS])

//     async function formatNfts(owners, nfts) {
//         let nftArr = await nfts.result;
//         let ownersArr = await owners.result
//         let newArr = []

//         nftArr.forEach((nft) => {
//             ownersArr.forEach((owner) => {
//                 // Create owner object
//                 let newOwnerObj = {}
//                 if (nft.token_id === owner.token_id) {
//                     newOwnerObj.id = nft.token_id
//                     newOwnerObj.owner = nft.owner_of
//                     newOwnerObj.amountOwned = nft.amount
//                     newArr.push(newOwnerObj)
//                     // console.log('ooooooooooooooooo',nft, owner)
//                 }
//             })
//         })
//         // console.log('========================',newArr)

//         // Add created owner object to nfts
//         nftArr.forEach((nft) => {
//             nft.owners = []
//             nft.amount = 0;
//             delete nft.owner_of
//             newArr.forEach((newNft) => {
//                 if (nft.token_id === newNft.id) {
//                     nft.owners.push(newNft)
//                     nft.amount = parseInt(nft.amount) + parseInt(newNft.amountOwned)
//                 }
//             })
//             nft.amount = nft.amount.toString()

//         })
//         // console.log('============ooooooooooooo',nftArr)

//         // Remove duplicate nft ids
//         let formatedNfts = nftArr.filter((n, i) => n.token_id !== (i).toString())
        
//         // Sort by id
//         formatedNfts.sort((a,b) => {
//            return a.token_id - b.token_id
//         })
//         console.log('============ooooo======?????oooooooo', formatedNfts)

//         return formatedNfts
//     }

    useEffect(() => {
        setIsMdViewport(handelResize());
        console.log(isMdViewport)
        window.addEventListener('resize', () => setIsMdViewport(handelResize()))
        return window.removeEventListener('resize', handelResize)
    }, [isMdViewport])



    return (
        <>
            <div className={styles["bg-container"]}>
                <div className={styles["overlay-container"]}></div>
                {/* <Image src={isMdViewport ? bgImageDesktop : bgImageMobile}
                    layout="fill" objectFit='cover' className={styles["bg-image"]} alt="..." priority="true" /> */}
            </div>
            <div className={styles["site-container"]}>
                <ConnectionMsg />
                <Main formattedNFTArray={theNFTS}/>
                <Footer />
            </div>
        </>
    );
}

export default Layout;