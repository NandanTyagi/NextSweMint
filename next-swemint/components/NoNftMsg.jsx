import Link from 'next/link'
import styles from '../styles/NonNftMsg.module.css'
const NoNftMsg = () => {
    return (
        <>
        <h3></h3>
        <div className={styles.center}>
        <h3 style={{textAlign:'center', color:"white"}}>No NFTS to display</h3>
        <p style={{color:"white"}}>You need to connect wallet to se your NFTS</p>
        <Link href="/"> [Go connect]</Link>
        </div>
        <h3></h3>
        </>
      );
}
 
export default NoNftMsg;