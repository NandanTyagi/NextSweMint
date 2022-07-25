import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ConnectBtn from './ConnectBtn';
import CountDown from './CountDown';
import Header from './Header';
import styles from '../styles/Main.module.css';

const Main = () => {
    const [isHome, setIsHome] = useState();
    const [isDashBoard, setIsDashBoard] = useState();
    const router = useRouter();

    console.log('router path', router.pathname)

    useEffect(() => {
        if (router.pathname === '/') {
            setIsHome(true)
            setIsDashBoard(false)
        } else if (router.pathname === '/dashboard') {
            setIsHome(false)
            setIsDashBoard(true)
        }
    }, [])

    return (
        <main className={styles["main-container"]}>
            <Header />
            {isHome && <ConnectBtn />}
            {isHome && <CountDown />}
        </main>
    );
}

export default Main;