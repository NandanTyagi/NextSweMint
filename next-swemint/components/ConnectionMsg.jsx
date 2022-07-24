import { useState } from 'react';
import styles from'../styles/ConnectionMsg.module.css';

const ConnectionMsg = () => {
    const [value, setValue] = useState('');

    return (
        <>
            <p className={styles["msg"]} id="msg">Message</p>
        </>
    );
}

export default ConnectionMsg;