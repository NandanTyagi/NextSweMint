import { useState, useEffect } from 'react';
import { useMoralis } from "react-moralis";
import shortenAddress  from'../utils/shortenAddress';
import styles from'../styles/ConnectionMsg.module.css';

const ConnectionMsg = () => {
    const { isAuthenticated, user } = useMoralis();
    const [isDisconnected, setIsDisconnected] = useState(true);
    const [shortWalletAddr, setShortWalletAddr] = useState('');


    useEffect(() => {
        !isAuthenticated ? setTimeout(() => {
            setIsDisconnected(false)
        },5000):setIsDisconnected(true);
    }, [isAuthenticated]);
    
    return (
        <>
            {isDisconnected && <p className={styles["msg"]} id="msg">{isAuthenticated?shortenAddress(user.get('ethAddress')):"DISCONNECTED"}</p>}
        </>
    );
}

export default ConnectionMsg;