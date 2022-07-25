import { useState, useEffect } from 'react';
import { useMoralis } from "react-moralis";
import styles from '../styles/Error.module.css';

const Error = ({ error }) => {
    const { hasAuthError } = useMoralis();
    const [isErrorMsg, setIsErrorMsg] = useState(null);

    useEffect(() => {
        
            error ? setTimeout(() => {
                setIsErrorMsg(false)
            },10000):setIsErrorMsg(true);
     
    }, [hasAuthError, isErrorMsg]);

    return (
        <>
            
            {/* <div className={styles["error-overlay"]} style={{visibility:    isErrorMsg? "visible":"hidden"}}></div> */}
                <p className={styles["error-span"]} style={{visibility: isErrorMsg? "visible":"hidden"}}>{hasAuthError ? error.message:null}</p>
            
        </>
    );
}

export default Error;