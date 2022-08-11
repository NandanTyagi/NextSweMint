import { useRef, useState, useEffect } from 'react';
import NftCard from './NftCard';
import CountDown from './CountDown';
import styles from '../styles/Mint.module.css';
import { isInitialized, useMoralis } from "react-moralis";
import { useRouter } from 'next/router'


const Mint = ({ NFTS }) => {
    const router = useRouter();

    const [nfts, setNfts] = useState(NFTS);
    const mintRef = useRef();

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
        // console.log('In Mint', nfts)
        // console.log('In Mint', router)
        // console.log('In dashbord', NFTS)

        // parseMetadata(nfts)

    }, [isInitialized])

    // useEffect(() => {
    //     mintRef.current.focus()
    // }, [mintRef,nfts])

    return (
        <>
            <div ref={mintRef} className={styles.mint}>
                {NFTS.map((nft, i) => {
                    // console.log('gjhdalsöhgöldsgkhölsdf type in MINT', typeof nft)
                    // console.log('gjhdalsöhgöldsgkhölsdf metadata IN MINT', nft.metadata)
                    // console.log('gjhdalsöhgöldsgkhölsdf nft IN MINT', nft)
                    // nft.metadata = nft.metadata.substring(0,nft.metadata.length)
                    // console.log('gjhdalsöhgöldsgkhölsdf', nft.metadata)
                    // nft.metadata.splice(nft.metadata.length-1,1)
                    // let string = JSON.stringify(nft.metadata)
                    // nft.metadata = JSON.parse(string)
                    // nft.metadata = JSON.parse(nft.metadata)
                    if (router.query.nftId === nft.token_id) return <NftCard key={i} nft={nft} imageUrl={nft.metadata.image} name={nft.metadata.name} description={nft.metadata.description} tokenId={nft.token_id} isMint={true} />
                    // if (router.query.nftId === nft.tokenId) return <NftCard key={i} nft={nft} imageUrl={nft.image} name={nft.name} description={nft.description} tokenId={nft.token_id} isMint={true} />
                })}
            </div>
            <CountDown />
        </>
    );
}

export default Mint;