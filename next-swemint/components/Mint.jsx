import { useRef, useState, useEffect } from 'react';
import NftCard from './NftCard';
import CountDown from './CountDown';
import ConnectBtn from './ConnectBtn';
import styles from '../styles/Mint.module.css';
import { useMoralis } from "react-moralis";
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

    const { user, enableWeb3, isAuthenticated, isInitialized } = useMoralis();
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
        let picker = Math.floor(Math.random() * (33 - 0) + 0)
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
            if (isMintable) {
                console.log('Minted array', mintedImageIds)
                console.log('NFT is mintable', isMintable, id)
                handelMint(id)
            } else {
                console.log('NFT is not mintable....retrying', isMintable, id)
                mintNFT()
            }
        } else {
            console.log('Mint full')
        }
    }

    async function handelMint(nftId) {
        console.log('In handel mint in mint page', nftId)
        try {
            const contract = new web3.eth.Contract(contractABI, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
            contract.methods.mint(currentUserAccountRef.current, nftId, 1)
                .send({ from: currentUserAccountRef.current, value: 33000000000000000 })
                .on("receipt", (receipt) => alert('Mint complete!', receipt))
        } catch (e) {
            console.log('error', e)
            alert(e)
        }
    }

    async function handelWeb3() {
        web3Ref.current = await enableWeb3()
    }

    useEffect(() => {
        isAuthenticated ? currentUserAccountRef.current = user.get('ethAddress') : null
        handelWeb3()
    }, [isAuthenticated])

    async function switchImage() {
        if (images && ticker < images.length) {
            setImage(images[ticker])
            setTicker(prev => ticker + 1)
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

                {router.pathname = '/mint' ? <Image alt='Image of IPA' src={image} width={1024}
                    height={1024}
                    layout="responsive" blurDataURL={image} className={styles["card-img-top"]} priority="true" /> : null}
            </div>
            <ConnectBtn isMintBtn={true} mintNFT={mintNFT} />
            <CountDown />
        </>
    );
}

export default Mint;
