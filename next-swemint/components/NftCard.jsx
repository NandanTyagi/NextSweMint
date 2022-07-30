import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/NftCard.module.css';

export const NftCard = ({imageUrl,  name, description, tokenId}) => {
    const [image, setImage] = useState(imageUrl);
    const [nftName, setNftName] = useState(name);
    const [nftDescription, setNftDescription] = useState(description);
    const [id, setId] = useState(tokenId);

    useEffect(()=>{
        console.log('in nft card', imageUrl)
    },[image])



    return (
        <div key={tokenId} className={styles["card"]}>
            <div className={styles["card-image"]}>
                <div className={styles["card-image__overlay"]}></div>
                <h5 className={styles["card-title"]}>{nftName}</h5>
                <p className={styles["card-text"]}>Rarity - Perl</p>
                <Image src={imageUrl} width={1024}
                    height={1024}
                    layout="responsive" blurDataURL={image} className={styles["card-img-top"]} alt="..." priority="true" />
            </div>
            <div className={styles["card-body"]}>
                <div className={styles["card-body__overlay"]}></div>
                <p className={styles["card-text"]}>{nftDescription}</p>
                <p className={styles["card-text"]}>Tokensupply: 1</p>
                <div className={styles["btn-container"]}>
                    <a href="https://testnets.opensea.io/assets/rinkeby/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${
          nft.token_id
        }" className="btn btn-primary">View on Opensea</a>
                    <a href="../html/mint.html/?nftId=${
              nft.token_id
            }" className="btn btn-primary">Mint</a>

                </div>
            </div>
        </div>

    );
}

export default NftCard;

// <div className="card">
//   <div className="card-image__overlay"></div>
//   <Image src="${nft.metadata.image}" className="card-img-top" alt="..." style="width:100%; height:270px;" />
//   <div className="card-body">
//     <div className="card-body__overlay"></div>
//     <h5 className="card-title">${nft.metadata.name}</h5>
//     <p className="card-text">${nft.metadata.description}</p>
//     <p className="card-text">Token ID: ${nft.token_id}</p>
//     <p className="card-text">Tokensupply: ${nft.amount}</p>
//     <p className="card-text">Holders: ${await nft.owners.length}</p>
//     <p className="card-text">Held by you: ${await getOwnedAmount(
//       nft,
//       curAddr
//     )}</p>
//     <a href="https://testnets.opensea.io/assets/rinkeby/${contractAddress}/${
//   nft.token_id
// }" className="btn btn-primary">View on Opensea</a>
//     <a href="../html/mint.html/?nftId=${
//       nft.token_id
//     }" className="btn btn-primary">Mint</a>
//     </div>
//     </div>