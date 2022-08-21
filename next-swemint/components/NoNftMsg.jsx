import Link from 'next/link'
const NoNftMsg = () => {
    return (
        <>
        <h3></h3>
        <div>
        <h3 style={{textAlign:'center'}}>No NFTS to display</h3>
        <p>You need to connect wallet to se your NFTS<span><Link href="/"> [Go connect]</Link></span></p>
        
        </div>
        <h3></h3>
        </>
      );
}
 
export default NoNftMsg;