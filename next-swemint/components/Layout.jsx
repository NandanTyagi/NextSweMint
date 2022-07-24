import { useState } from 'react';
import ConnectionMsg from './ConnectionMsg';
import Footer from './Footer';
import Main from './Main';
import styles from'../styles/Layout.module.css';

const Layout = () => {
    const [value, setValue] = useState('');

    return (
        <>
        <div className={styles["overlay-container"]}></div>
        <div className={styles["site-container"]}>
            <ConnectionMsg />
            <Main />
            <Footer />
        </div>
        </>
    );
}

export default Layout;