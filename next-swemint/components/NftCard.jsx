import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/NftCard.module.css';
import {motion} from 'framer-motion';

export const NftCard = ({ imageUrl, name, description, tokenId, nft, isMint }) => {
    const [image, setImage] = useState(imageUrl);
    const [nftName, setNftName] = useState(name);
    const [nftDescription, setNftDescription] = useState(description);
    const [id, setId] = useState(tokenId);

    return (
        <>
            {isMint ? <motion.div initial="hidden" animate="visible" variants={{
                 hidden: {
                    scale: 0,
                    opacity: 0
                  },
                  visible: {
                    scale: [0.1,0.2,0.3,0.4,0.5, 0.6,0.7,0.8,0.9, 1],
                    opacity: [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9, 1],
                    transition: {
                      delay: .5
                    }
                }
            }}>
                <div key={nft.token_id} className={styles["card"]}>
                    <div className={styles["card-image"]}>
                        <div className={styles["card-image__overlay"]}></div>
                        <h5 className={styles["card-title"]}>{nftName}</h5>
                        <p className={styles["card-text"]}>Rarity: {nft.metadata.attributes.rarity}</p>
                        <Image src={nft.metadata.image} width={1024}
                            height={1024}
                            layout="responsive" blurDataURL={nft.metadata.image} className={styles["card-img-top"]} alt={nft.metadata.name} priority="true" />
                    </div>
                    <div className={styles["card-body"]}>
                        <div className={styles["card-body__overlay"]}></div>
                        <p className={styles["card-text"]}>{nft.metadata.description}</p>
                        <p className={styles["card-text"]}>Tokensupply: {nft.amount}</p>
                        <div className={styles["btn-container"]}>
                            <a href={`/mint/?nftId=${nft.token_id}`} className="btn btn-primary">Mint</a>

                        </div>
                    </div>
                </div>

            </motion.div>
                :
                <div key={nft.token_id} className={styles["card"]}>
                    <div className={styles["card-image"]}>
                        <div className={styles["card-image__overlay"]}></div>
                        <h5 className={styles["card-title"]}>{nftName}</h5>
                        <p className={styles["card-text"]}>Rarity: {nft.metadata.attributes.rarity}</p>
                        <Image src={nft.metadata.image} width={1024}
                            height={1024}
                            layout="responsive" blurDataURL={nft.metadata.image} className={styles["card-img-top"]} alt={nft.metadata.name} priority="true" />
                    </div>
                    <div className={styles["card-body"]}>
                        <div className={styles["card-body__overlay"]}></div>
                        <p className={styles["card-text"]}>{nft.metadata.description}</p>
                        <p className={styles["card-text"]}>Tokensupply: {nft.amount}</p>
                        <div className={styles["btn-container"]}>
                            <a href={`https://testnets.opensea.io/assets/rinkeby/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${tokenId}`} target="_blank" className="btn btn-primary">OpenSea</a>
                            <a href={`/mint/?nftId=${nft.token_id}`} className="btn btn-primary">Mint</a>

                        </div>
                    </div>
                </div>

            }
        </>

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