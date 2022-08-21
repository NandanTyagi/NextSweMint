import { useMoralis } from "react-moralis";
import styles from '../styles/ConnectBtn.module.css';
import Error from './Error';


export const ConnectBtn = ({ isMintBtn, mintNFT }) => {
    const { isAuthenticated, authenticate, authError, logout } = useMoralis();

    function mintNow() {
        console.log('Mint now!')
        mintNFT()
    }

    {
        if (!isMintBtn) {
            return (
                <article className={styles["btn-container"]}>
                    {isAuthenticated ? <button onClick={() => logout()} className={styles["btn"]} id="btn">DISCONNECT
                        <div className={styles["btn-overlay"]}> </div>
                    </button> :
                        <button onClick={() => authenticate({ signingMessage: "Authorize connecting to Swemint.io" })} className={styles["btn"]} id="btn">CONNECT
                            <div className={styles["btn-overlay"]}></div>
                        </button>}
                    <div className={styles["error"]} id="error">
                        <Error error={authError} />
                    </div>
                </article>
            );
        } else {
            return (
                <article className={styles["btn-container"]}>
                    <button onClick={() => mintNow()} className={styles["btn"]} id="btn">MINT NOW
                        <div className={styles["btn-overlay"]}> </div>
                    </button>
                    <div className={styles["error"]} id="error">
                        <Error error={authError} />
                    </div>
                </article>
            );
        }
    }
}

export default ConnectBtn;