import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dashboard from './Dashboard';
import Home from './Home';
import Header from './Header';
import getPreamble from '../utils/getPreamble';
import styles from '../styles/Main.module.css';

export const Main = ({formattedNFTArray}) => {
    const router = useRouter();
    const [isHome, setIsHome] = useState();
    const [formatedNfts, setFormatedNfts] = useState(formattedNFTArray);
    const [isDashBoard, setIsDashBoard] = useState();
    const [preamble, setPreamble] = useState(getPreamble(router.pathname));
    const [NFTs, setNFTs] = useState([{image:'/img/ipas/ipa1.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'1'},{image:'/img/ipas/ipa2.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'2'}, {image:'/img/ipas/ipa3.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'3'}, {image:'/img/ipas/ipa4.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'4'}, {image:'/img/ipas/ipa5.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'5'}, {image:'/img/ipas/ipa6.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'6'}, {image:'/img/ipas/ipa7.jpg', name: 'NFT Name', description:'Some description of NFT',tokenId:'7'}, {image:'/img/ipas/ipa8.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'8'}]);
    

    useEffect(() => {
        if (router.pathname === '/dashboard') {
            setIsHome(false)
            setIsDashBoard(true)
            setPreamble(prev => getPreamble(router.pathname))
            // setFormatedNfts(formattedNFTArray)
            
        }
        if (router.pathname === '/') {
            setIsHome(true)
            setIsDashBoard(false)
            setPreamble(prev => getPreamble(router.pathname))
        }
    }, [])

    useEffect(()=>{
        console.log('in Main', formatedNfts)
    }, [])

    return (
        <main className={styles["main-container"]}>
            <Header preamble={preamble} />
            {isHome && <Home />}
            {isDashBoard && <Dashboard NFTS={formatedNfts}/>}
            {/* {isDashBoard && <Dashboard NFTS={NFTs}/>} */}
        </main>
    );
}
export default Main;
