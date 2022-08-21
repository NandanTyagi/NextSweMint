import { useState, useEffect } from 'react';
import ConnectionMsg from './ConnectionMsg';
import Footer from './Footer';
import Main from './Main';
import styles from '../styles/Layout.module.css';
import handelResize from "../utils/handelResize";



export const Layout = ({ theNFTS }) => {
    const [isMdViewport, setIsMdViewport] = useState(null);

    useEffect(() => {
        setIsMdViewport(handelResize());
        console.log(isMdViewport)
        window.addEventListener('resize', () => setIsMdViewport(handelResize()))
        return window.removeEventListener('resize', handelResize)
    }, [isMdViewport])

    return (
        <>
            <div className={styles["bg-container"]}>
                <div className={styles["overlay-container"]}></div>
            </div>
            <div className={styles["site-container"]}>
                <ConnectionMsg />
                <Main formattedNFTArray={theNFTS} />
                <Footer />
            </div>
        </>
    );
}

export default Layout;