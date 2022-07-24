import { useState } from 'react';
import styles from '../styles/ConnectBtn.module.css';
import Error from './Error';

const ConnectBtn = () => {
    const [value, setValue] = useState('');

    return (
        <article className={styles["btn-container"]}>
            <button className={styles["btn"]} id="btn">CONNECT</button>
            <Error />
        </article>
    );
}

export default ConnectBtn;