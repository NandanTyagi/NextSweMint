import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Web3 from 'web3';
import styles from '../styles/NftCard.module.css';
import contractABI from '../utils/contracts/contract';
import { useMoralis } from "react-moralis";
import Router from 'next/router';
import Loading from './Loading';

export const NftCard = ({ imageUrl, name, tokenId, nft, isMint, ticker }) => {
    const [image, setImage] = useState(imageUrl);
    const [nftName, setNftName] = useState(name);
    const [isVisible, setisVisible] = useState();
    const mintRef = useRef();
    const web3Ref = useRef();
    const currentUserAccountRef = useRef();
    const { user, enableWeb3, isAuthenticated } = useMoralis();
    const web3 = new Web3(Web3.givenProvider)

    async function handelMint() {
        console.log('In handel mint')
        try {
            const contract = new web3.eth.Contract(contractABI, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
            contract.methods.mint(currentUserAccountRef.current, nft.token_id, 1)
                .send({ from: currentUserAccountRef.current })
                .on("reciept", (reciept) => alert('Mint complete!', nft.token_id, reciept))
        } catch (e) {
            console.log('error', e)
            alert(e)
        }
    }

    async function handelWeb3() {
        web3Ref.current = await enableWeb3()
    }


    async function syncMetadata() {
        const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': process.env.NEXT_PUBLIC_API_KEY } };

        fetch(`https://deep-index.moralis.io/api/v2/nft/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${nft.token_id}/metadata/resync?chain=${process.env.NEXT_PUBLIC_CHAIN}&flag=uri&mode=async`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                alert(response.status, nft.token_id)
                Router.push('/dashboard')
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        isAuthenticated ? currentUserAccountRef.current = user.get('ethAddress') : null
        handelWeb3()
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animateCard')
                    setisVisible(entry.isIntersecting)
                } else {
                    setisVisible(entry.isIntersecting)
                }
            })
        })
        if (mintRef !== undefined) {
            observer.observe(mintRef.current)
        }
    }, [isVisible, ticker])

    if (!nft) {
        return <Loading />
    }

    return (
        <>
            {isMint ?
                <div ref={mintRef} key={nft.tokenId} className={`${styles.card} ${isVisible ? styles.animateCard : ''} `}>
                    <div className={styles["card-image"]}>
                        <div className={styles["card-image__overlay"]}></div>
                        <h5 className={styles["card-title"]}>{nft.metadata.name}</h5>
                        <p className={styles["card-text"]}>Rarity: {nft.metadata ? nft.metadata.attributes.rarity : 'error'}</p>
                        <Image src={image} width={1024}
                            height={1024}
                            layout="responsive" blurDataURL={image} className={styles["card-img-top"]} alt={nft.metadata.name} priority="true" />
                    </div>
                    <div className={styles["card-body"]}>
                        <div className={styles["card-body__overlay"]}></div>
                        <p className={styles["card-text"]}>{nft.metadata.description}</p>
                        <p className={styles["card-text"]}>Tokensupply: {nft.amount}</p>
                        <div className={styles["btn-container"]}>
                            <button onClick={handelMint} className="btn btn-primary">Mint</button>

                        </div>
                    </div>
                </div>
                :
                <div ref={mintRef} key={nft.token_id} className={`${styles.card} ${isVisible ? styles.animateCard : ''} `}>
                    <div className={styles["card-image"]}>
                        <div className={styles["card-image__overlay"]}></div>
                        <h5 className={styles["card-title"]}>{nft.metadata ? nft.metadata.name : 'error'}</h5>
                        <p className={styles["card-text"]}>Rarity: {nft.metadata ? nft.metadata.attributes.rarity : 'error'}</p>
                        <Image src={nft.metadata ? nft.metadata.image : '/img/sync-metadata.jpg'} width={1024}
                            height={1024}
                            layout="responsive" blurDataURL={nft.metadata ? nft.metadata.image : '/img/sync-metadata.jpg'} className={styles["card-img-top"]} alt={nft.metadata ? nft.metadata.name : 'error'} priority="true" />
                    </div>
                    <div className={styles["card-body"]}>
                        <div className={styles["card-body__overlay"]}></div>
                        <p className={styles["card-text"]}>{nft.metadata ? nft.metadata.description : 'error'}</p>
                        <p className={styles["card-text"]}>Token Id: {nft.token_id}</p>
                        <p className={styles["card-text"]}>Tokensupply: {nft.amount}</p>
                        {nft.owners.map(o => {
                            if (currentUserAccountRef.current !== undefined && o.owner.toUpperCase() === currentUserAccountRef.current.toUpperCase()) {
                                return (
                                    <p key={nft.token_id} className={styles["card-text"]}>You own: {o.amountOwned}</p>
                                )
                            }
                        })}
                        <div className={styles["btn-container"]}>
                            <a href={`https://testnets.opensea.io/assets/rinkeby/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${tokenId}`} target="_blank" rel="noreferrer" className="btn btn-primary">OpenSea</a>
                            <button onClick={syncMetadata} className="btn btn-primary">Sync</button>
                        </div>
                    </div>
                </div>

            }
        </>

    );
}

export default NftCard;