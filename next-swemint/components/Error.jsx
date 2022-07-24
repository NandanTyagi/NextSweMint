import { useState } from 'react';
import styles from '../styles/Error.module.css';

const Error = () => {
    const [value, setValue] = useState('');

    return (
        <>
            <p className={styles["error"]} id="error">error</p>
        </>
    );
}

export default Error;