import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dashboard from './Dashboard';
import Home from './Home';
import Header from './Header';
import getPreamble from '../utils/getPreamble';
import styles from '../styles/Main.module.css';

const Main = () => {
    const router = useRouter();
    const [isHome, setIsHome] = useState();
    const [isDashBoard, setIsDashBoard] = useState();
    const [preamble, setPreamble] = useState(getPreamble(router.pathname));
    const [NFTs, setNFTs] = useState([{image:'/img/ipas/ipa1.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'1'},{image:'/img/ipas/ipa2.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'2'}, {image:'/img/ipas/ipa3.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'3'}, {image:'/img/ipas/ipa4.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'4'}, {image:'/img/ipas/ipa5.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'4'}, {image:'/img/ipas/ipa6.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'4'}, {image:'/img/ipas/ipa7.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'4'}, {image:'/img/ipas/ipa8.jpg', name: 'NFT Name', description:'Some description of the NFT',tokenId:'4'}]);
    

    useEffect(() => {
        if (router.pathname === '/dashboard') {
            setIsHome(false)
            setIsDashBoard(true)
            setPreamble(prev => getPreamble(router.pathname))
        }
        if (router.pathname === '/') {
            setIsHome(true)
            setIsDashBoard(false)
            setPreamble(prev => getPreamble(router.pathname))
        }
    }, [])

    return (
        <main className={styles["main-container"]}>
            <Header preamble={preamble} />
            {isHome && <Home />}
            {isDashBoard && <Dashboard NFTS={NFTs}/>}
        </main>
    );
}
export default Main;
