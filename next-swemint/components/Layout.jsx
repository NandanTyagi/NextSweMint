import { useState, useEffect } from 'react';
import Image from 'next/image';
import ConnectionMsg from './ConnectionMsg';
import Footer from './Footer';
import Main from './Main';
import styles from '../styles/Layout.module.css';
import bgImageMobile from '../public/img/bg-1-mobile.png';
import bgImageDesktop from '../public/img/swemint-db-bg-1.jpg';


const Layout = () => {
    const [windowSize, setWindowSize] = useState('');
    const [isMdViewport, setIsMdViewport] = useState(null);

    function handelResize() {
        setWindowSize(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', () => handelResize())
        return window.removeEventListener('resize', handelResize)
    }, [windowSize])

    useEffect(() => {
        if (windowSize >= 682) {
            setIsMdViewport(true)
        }
        if (windowSize < 682) {
            setIsMdViewport(prev => false)
        }
    }, [windowSize])


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