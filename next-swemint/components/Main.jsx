import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dashboard from './Dashboard';
import Home from './Home';
import Header from './Header';
import getPreamble from '../utils/getPreamble';
import styles from '../styles/Main.module.css';

const Main = () => {
    const [isHome, setIsHome] = useState();
    const [isDashBoard, setIsDashBoard] = useState();
    const [preamble, setPreamble] = useState('');
    const router = useRouter();

    console.log('router path', router.pathname)

    useEffect(() => {
        if (router.pathname === '/') {
            setIsHome(true)
            setIsDashBoard(false)
            setPreamble(getPreamble(router.pathname))
        }
        
        if (router.pathname === '/dashboard') {
            setIsHome(false)
            setIsDashBoard(true)
            setPreamble(getPreamble(router.pathname))
        }
    }, [])

    return (
        <main className={styles["main-container"]}>
            <Header preamble={preamble}/>
            {isHome && <Home />}
            {isDashBoard && <Dashboard />}
        </main>
    );
}

export default Main;