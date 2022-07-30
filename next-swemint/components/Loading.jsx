import { useState, useEffect } from 'react';
import styles from '../styles/Loading.module.css';

export const Loading = () => {
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
          }, 1000);
    },[])

    return (
        <>
            {loading && <img
                src="./img/spinner.gif"
                alt="loading..."
                id="loading"
                className={styles["loading"]}
            />}
        </>
    );
}

export default Loading;