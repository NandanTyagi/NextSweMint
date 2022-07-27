import { useState, useEffect } from 'react';
import Image from 'next/image';
import ConnectionMsg from './ConnectionMsg';
import Footer from './Footer';
import Main from './Main';
import styles from '../styles/Layout.module.css';
import bgImageDesktop from '../public/img/swemint-bg-1.jpg';
import bgImageMobile from '../public/img/bg-1-mobile.png';


const Layout = () => {
    const [windowSize, setWindowSize] = useState();
    const [isMdViewport, setIsMdViewport] = useState(null);

    function handelResize() {
        if (window.innerWidth >= 682) {
            setIsMdViewport(true)
        }
        if (window.innerWidth < 682) {
            setIsMdViewport(false)
        }
    }

    useEffect(() => {
        handelResize();
        window.addEventListener('resize', () => handelResize())
        return window.removeEventListener('resize', handelResize)
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