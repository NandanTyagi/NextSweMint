import { useState, useEffect } from 'react';
import Image from 'next/image';
import ConnectionMsg from './ConnectionMsg';
import Footer from './Footer';
import Main from './Main';
import styles from '../styles/Layout.module.css';
import bgImageDesktop from '../public/img/swemint-bg-1.jpg';
import bgImageMobile from '../public/img/bg-1-mobile.png';
import handelResize from "../utils/handelResize";
import { useMoralisWeb3Api } from "react-moralis";


const Layout = () => {
    const [isMdViewport, setIsMdViewport] = useState(null);
    const [NFTS, setNFTS] = useState();
    const [NFTSWithOwners, setNFTSWithOwners] = useState();
    const [OWNERS, setOWNERS] = useState();

    const Web3Api = useMoralisWeb3Api();


    const getNFTS = async () => {
        const options = {
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            chain: process.env.NEXT_PUBLIC_CHAIN
        };
        const NFTs = await Web3Api.token.getAllTokenIds(options);
        setNFTS(NFTs)

        const nftOwners = await Web3Api.token.getNFTOwners(options);
        setOWNERS(nftOwners)

        const formatedNFTs = await formatNfts(NFTs, nftOwners);
        setNFTSWithOwners(formatedNFTs)
    }

    const formatNfts = async (owners, nfts) => {
        let nftArr = await nfts.result;
        let ownersArr = await owners.result
        let newArr = []

        // Create owner object
        nftArr.forEach((nft, i) => {
            ownersArr.forEach((owner, j) => {
                let newOwnerObj = {}
                if (nft.token_id === owner.token_id) {
                    newOwnerObj.id = nft.token_id
                    newOwnerObj.owner = nft.owner_of
                    newOwnerObj.amountOwned = nft.amount
                    newArr.push(newOwnerObj)
                    // console.log('ooooooooooooooooo',nft, owner)
                }
            })
        })
        // console.log('========================',newArr)

        // Add created owner object to nfts
        nftArr.forEach((nft) => {
            nft.owners = []
            nft.amount = 0;
            delete nft.owner_of
            newArr.forEach((newNft) => {
                if (nft.token_id === newNft.id) {
                    nft.owners.push(newNft)
                    nft.amount = parseInt(nft.amount) + parseInt(newNft.amountOwned)
                }
            })
            nft.amount = nft.amount.toString()

        })
        // console.log('============ooooooooooooo',nftArr)

        // Remove duplicate nft ids
        let formatedNfts = nftArr.filter((n, i) => n.token_id !== (i).toString())
        
        // Sort by id
        formatedNfts.sort((a,b) => {
           return a.token_id - b.token_id
        })
        // console.log('============ooooo======?????oooooooo', formatedNfts)

        return formatedNfts
    }

    useEffect(() => {
        setIsMdViewport(handelResize());
        window.addEventListener('resize', () => handelResize())
        return window.removeEventListener('resize', handelResize)
    }, [])

    useEffect(() => {
        getNFTS()
        console.log('in layout getAllToken nfts', NFTS);
        console.log('in layout getAllToken owners', OWNERS);
        console.log('in layout getAllToken  nfts withowners', NFTSWithOwners);
    }, [])

    return (
        <>
            <div className={styles["bg-container"]}>
                <div className={styles["overlay-container"]}></div>
                <Image src={isMdViewport ? bgImageDesktop : bgImageMobile}
                    layout="fill" objectFit='cover' className={styles["bg-image"]} alt="..." priority="true" />
            </div>
            <div className={styles["site-container"]}>
                <ConnectionMsg />
                <Main />
                <Footer />
            </div>
        </>
    );
}

export default Layout;