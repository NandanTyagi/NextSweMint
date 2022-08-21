import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LitePaper from './LitePaper';
import Mint from './Mint';
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
    const [isMint, setIsMint] = useState();
    const [isLitePaper, setIsLitePaper] = useState();
    const [preamble, setPreamble] = useState(getPreamble(router.pathname));
    
    useEffect(() => {
        if (router.pathname === '/litepaper') {
            setIsHome(false)
            setIsDashBoard(false)
            setIsMint(false)
            setIsLitePaper(true)
            setPreamble(prev => getPreamble(router.pathname))
        }
        
        if (router.pathname === '/mint') {
            setIsHome(false)
            setIsDashBoard(false)
            setIsMint(true)
            setIsLitePaper(false)
            setPreamble(prev => getPreamble(router.pathname))
        }
        if (router.pathname === '/dashboard') {
            setIsHome(false)
            setIsDashBoard(true)
            setIsMint(false)
            setIsLitePaper(false)
            setPreamble(prev => getPreamble(router.pathname))
            
        }
        if (router.pathname === '/') {
            setIsHome(true)
            setIsDashBoard(false)
            setIsMint(false)
            setIsLitePaper(false)
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
            {isMint && <Mint NFTS={formatedNfts} />}
            {isLitePaper && <LitePaper NFTS={NFTs} />}
        </main>
    );
}
export default Main;
