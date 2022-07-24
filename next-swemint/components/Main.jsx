import { useState } from 'react';
import ConnectBtn from './ConnectBtn';
import CountDown from './CountDown';
import Header from './Header';
import styles from '../styles/Main.module.css';

const Main = () => {
    const [value, setValue] = useState('');

    return (
        <main className={styles["main-container"]}>
            <Header />
            <ConnectBtn />
            <CountDown />
        </main>
    );
}

export default Main;