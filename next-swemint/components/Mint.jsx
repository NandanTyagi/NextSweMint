import { useRef, useState, useEffect } from 'react';
import NftCard from './NftCard';
import CountDown from './CountDown';
import ConnectBtn from './ConnectBtn';
import styles from '../styles/Mint.module.css';
import { isInitialized, useMoralis } from "react-moralis";
import { useRouter } from 'next/router'
import Image from 'next/image';
import Web3 from 'web3';
import contractABI from '../utils/contracts/contract';

const Mint = ({ NFTS }) => {
    const router = useRouter();

    const [nfts, setNfts] = useState(NFTS);
    const [images, setImages] = useState([]);
    const [mintableImages, setMintableImages] = useState([]);
    const [mintedImageIds, setMintedImageIds] = useState([]);
    const [image, setImage] = useState('');
    const [ticker, setTicker] = useState(0);
    const [imageCount, setImageCount] = useState(1);
    const mintRef = useRef();
    const currentUserAccountRef = useRef();
    const web3Ref = useRef();

    const { user, enableWeb3, isAuthenticated, isInitialized, isInitializing } = useMoralis();
    const web3 = new Web3(Web3.givenProvider)

    function createImageArray() {
        imageCount < 33 ? setImageCount(imageCount + 1) : null
        let img = `https://zjaux8t7jfje.usemoralis.com/ipa${imageCount}.jpg`
        setImages([...images, img])

        console.group('Create image array')
        console.log('Image count', imageCount)
        console.log('NFTS', image)
        console.groupEnd('Create image array')

    }

    // Set mintable images id
    function setMintableImagesId() {
        let ids = []
        for (let i = 0; i < 33; i++) {
            ids.push(i)
        }
        setMintableImages(ids)
        console.log('ids', mintableImages)
    }

    // Pick image to mint                  
    function pickImageToMint() {
        console.log('Mintable images ', mintableImages)
        let max = mintableImages.length - 1
        let min = mintedImageIds.length
        let picker = Math.floor(Math.random() * (33 - 0) + 0)
        // Add minted image to minted array          
        // checkId(picker) ? setMintedImageIds(prev => [...prev, picker]) : null
        console.log('Picked image ', picker)
        return picker
    }


    // Check if current id has been mited already                                     
    function checkId(id) {

        if (mintedImageIds.includes(id)) {
            console.log('Id is in minted array', true)
            return false
        } else {
            console.log('Id is not in minted array', false)
            return true
        }

    }

    // Mint Image
    function mintNFT() {
        let id = pickImageToMint()
        if (mintedImageIds.length <= 32) {

            checkId(id) ? setMintedImageIds(prev => [...prev, id]) : null
            let isMintable = checkId(id)
            // console.log('NFT is mintable', isMintable, id)
            // handelMint(pickImageToMint())
            if (isMintable) {
                console.log('Minted array', mintedImageIds)
                console.log('NFT is mintable', isMintable, id)
                
            } else {
                console.log('NFT is not mintable....retrying', isMintable, id)
                mintNFT()
            }
        }else{
            console.log('Mint full')
        }
    }

    async function handelMint(nftId) {
        console.log('In handel mint in mint page', nftId)
        try {
            // Save image to ipfs
            // const file1 = new Moralis.File(file.name, file)
            // await file1.saveIPFS()
            // const file1Url = file1.ipfs();
            // console.log('In handel mint url', file1Url)
            // // generate metadate and save to ipfs
            // const metadata = {
            //     name: nft.metadata.name,
            //     description: nft.metadata.description,
            //     image: nft.metadata.image 
            // }
            // const file2 = new Moralis.File(`${name}metadata.json`, {
            //     base64: Buffer.from(JSON.stringify(metadata)).toString('base64')
            // })
            // await file2.saveIPFS()
            // const metadataURL = file2.ipfs()
            // interact with smart contract
            const contract = new web3.eth.Contract(contractABI, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
            contract.methods.mint(currentUserAccountRef.current, nftId, 1)
                .send({ from: currentUserAccountRef.current })
                .on("reciept", (reciept) => alert('Mint complete!', reciept))
            // const tokenId = res.events.Transfer.returnValue.tokenId
            // alert(`Mint complete of token id: ${tokenId}`)
        } catch (e) {
            console.log('error', e)
            alert(e)
        }
    }

    async function handelWeb3() {
        web3Ref.current = await enableWeb3()
        // console.log('WEB3', web3Ref.current.eth.getAccounts())
    }

    useEffect(() => {
        isAuthenticated ? currentUserAccountRef.current = user.get('ethAddress') : null
        handelWeb3()
    }, [isAuthenticated])






    async function switchImage() {

        if (images && ticker < images.length) {
            setImage(images[ticker])
            setTicker(prev => ticker + 1)
            // console.log('Switch image',image)
        }
        if (ticker === 32) {
            setTicker(0)
        }


    }


    useEffect(() => {

        createImageArray()
        switchImage(nfts)

    }, [imageCount])


    useEffect(() => {
        let timer = setTimeout(() => (
            switchImage(nfts)
        ), 100);
        return () => clearTimeout(timer)

    }, [ticker])

    useEffect(() => {

        setNfts(NFTS)

    }, [isInitialized])

    useEffect(() => {

        setMintableImagesId()


    }, [])

    return (
        <>
            <div ref={mintRef} className={styles.mint}>

                {router.pathname = '/mint' ? <Image src={image} width={1024}
                    height={1024}
                    layout="responsive" blurDataURL={image} className={styles["card-img-top"]} priority="true" /> : null}

                {/* {NFTS.map((nft, i) => {
                 return <NftCard key={i} nft={nft} imageUrl={image} name={nft.metadata.name} description={nft.metadata.description} tokenId={nft.token_id} isMint={true} ticker={ticker} />
                })} */}
                {NFTS.map((nft, i) => {
                    if (router.query.nftId === nft.token_id) return <NftCard key={i} nft={nft} imageUrl={nft.metadata.image} name={nft.metadata.name} description={nft.metadata.description} tokenId={nft.token_id} isMint={true} />
                })}
            </div>
            <ConnectBtn isMintBtn={true} mintNFT={mintNFT} />
            <CountDown />
        </>
    );
}

export default Mint;


// const Mint = ({ NFTS }) => {
//     const router = useRouter();

//     const [nfts, setNfts] = useState(NFTS);
//     const mintRef = useRef();

//     const { isInitialized, isInitializing } = useMoralis();

//     // async function parseMetadata(nfts) {
//     //   nfts.forEach(nft => {
//     //     console.log('ashfaösdfghöadkgfhasdö', nft.metadata)
//     //     // nft.metadata = JSON.parse(nft.metadata)
//     //     return nft
//     //   });
//     // }

//     useEffect(() => {

//         setNfts(NFTS)
//         // console.log('In Mint', nfts)
//         // console.log('In Mint', router)
//         // console.log('In dashbord', NFTS)

//         // parseMetadata(nfts)

//     }, [isInitialized])

//     // useEffect(() => {
//     //     mintRef.current.focus()
//     // }, [mintRef,nfts])

//     return (
//         <>
//             <div ref={mintRef} className={styles.mint}>
//                 {NFTS.map((nft, i) => {
//                     // console.log('gjhdalsöhgöldsgkhölsdf type in MINT', typeof nft)
//                     // console.log('gjhdalsöhgöldsgkhölsdf metadata IN MINT', nft.metadata)
//                     // console.log('gjhdalsöhgöldsgkhölsdf nft IN MINT', nft)
//                     // nft.metadata = nft.metadata.substring(0,nft.metadata.length)
//                     // console.log('gjhdalsöhgöldsgkhölsdf', nft.metadata)
//                     // nft.metadata.splice(nft.metadata.length-1,1)
//                     // let string = JSON.stringify(nft.metadata)
//                     // nft.metadata = JSON.parse(string)
//                     // nft.metadata = JSON.parse(nft.metadata)
//                     if (router.query.nftId === nft.token_id) return <NftCard key={i} nft={nft} imageUrl={nft.metadata.image} name={nft.metadata.name} description={nft.metadata.description} tokenId={nft.token_id} isMint={true} />
//                     // if (router.query.nftId === nft.tokenId) return <NftCard key={i} nft={nft} imageUrl={nft.image} name={nft.name} description={nft.description} tokenId={nft.token_id} isMint={true} />
//                 })}
//             </div>
//             <CountDown />
//         </>
//     );
// }

// export default Mint;