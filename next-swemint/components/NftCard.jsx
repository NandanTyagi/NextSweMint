import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Moralis from 'moralis';
import Web3 from 'web3';
// import { Moralis } from '@moralis/sdk';
import { EvmChain } from '@moralisweb3/evm-utils';
import styles from '../styles/NftCard.module.css';
import contractABI from '../utils/contracts/contract';
import { motion } from 'framer-motion';
import { useMoralisWeb3Api, isInitialized, useMoralis } from "react-moralis";
import Router from 'next/router';

export const NftCard = ({ imageUrl, name, description, tokenId, nft, isMint, ticker, mintNFT }) => {
    const [image, setImage] = useState(imageUrl);
    const [nftName, setNftName] = useState(name);
    const [nftDescription, setNftDescription] = useState(description);
    const [id, setId] = useState(tokenId);
    const [isVisible, setisVisible] = useState();
    const [file, setFile] = useState(null);
    const mintRef = useRef();
    const web3Ref = useRef();
    const currentUserAccountRef = useRef();
    const { user, enableWeb3, isAuthenticated } = useMoralis();
    const web3 = new Web3(Web3.givenProvider)

    async function handelMint() {
        console.log('In handel mint')
        try {
            // Save image to ipfs
            // const file1 = new Moralis.File(file.name, file)
            // await file1.saveIPFS()
            // const file1Url = file1.ipfs();
            // console.log('In handel mint url', file1Url)
            // // generate metadate and save to ipfs
            // const metadata = {
            //     name: nft.metadata.name,
            //     description: nft.metadata.description,
            //     image: nft.metadata.image 
            // }
            // const file2 = new Moralis.File(`${name}metadata.json`, {
            //     base64: Buffer.from(JSON.stringify(metadata)).toString('base64')
            // })
            // await file2.saveIPFS()
            // const metadataURL = file2.ipfs()
            // interact with smart contract
            const contract = new web3.eth.Contract(contractABI, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
            contract.methods.mint(currentUserAccountRef.current, nft.token_id, 1)
                .send({ from: currentUserAccountRef.current })
                .on("reciept", (reciept) => alert('Mint complete!', nft.token_id, reciept))
            // const tokenId = res.events.Transfer.returnValue.tokenId
            // alert(`Mint complete of token id: ${tokenId}`)
        } catch (e) {
            console.log('error', e)
            alert(e)
        }
    }

    async function handelWeb3() {
        web3Ref.current = await enableWeb3()
        // console.log('WEB3', web3Ref.current.eth.getAccounts())
    }


    async function syncMetadata() {
        const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': process.env.NEXT_PUBLIC_API_KEY } };

        fetch(`https://deep-index.moralis.io/api/v2/nft/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${nft.token_id}/metadata/resync?chain=rinkeby&flag=uri&mode=async`, options)
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
    }, [isAuthenticated])


    useEffect(() => {
        // console.log('mint ref', mintRef.current)
        // console.log('mint USER', user)
        // console.log('mint ACCOUNT', user.get('ethAddress'))
        // console.log('mint REF ACCOUNT', currentUserAccountRef.current)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                // console.log('entries entry', entry)
                if (entry.isIntersecting) {
                    entry.target.classList.add('animateCard')
                    setisVisible(entry.isIntersecting)
                } else {
                    setisVisible(entry.isIntersecting)
                    // entry.target.classList.remove('animateCard')
                }

            })

            // console.log('entries visible', isVisible)

        })
        if (mintRef !== undefined) {
            observer.observe(mintRef.current)
        }
    }, [isVisible, ticker])


    return (
        <>
            {isMint ?
                <motion.div initial="hidden" animate="visible" variants={{
                    hidden: {
                        scale: 0,
                        opacity: 0
                    },
                    visible: {
                        scale: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                        opacity: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                        transition: {
                            delay: .5
                        }
                    }
                }}>
                    <div ref={mintRef} key={nft.tokenId} className={`${styles.card} ${isVisible ? styles.animateCard : ''} `}>
                        <div className={styles["card-image"]}>
                            <div className={styles["card-image__overlay"]}></div>
                            <h5 className={styles["card-title"]}>{nft.metadata.name}</h5>
                            <p className={styles["card-text"]}>Rarity: {nft.metadata ? nft.metadata.attributes.rarity : 'error'}</p>
                            {/* <p className={styles["card-text"]}>Rarity: Perl</p> */}
                            {/* <Image ref={mintRef} src={nft.image} width={1024}
                                height={1024}
                                layout="responsive" blurDataURL={nft.image} className={styles["card-img-top"]} alt={nft.name} priority="true" /> */}

                            <Image src={image} width={1024}
                                height={1024}
                                layout="responsive" blurDataURL={image} className={styles["card-img-top"]} alt={nft.metadata.name} priority="true" />
                        </div>
                        <div className={styles["card-body"]}>
                            <div className={styles["card-body__overlay"]}></div>
                            <p className={styles["card-text"]}>{nft.metadata.description}</p>
                            {/* <p className={styles["card-text"]}>{nft.description}</p> */}
                            <p className={styles["card-text"]}>Tokensupply: {nft.amount}</p>
                            {/* <p className={styles["card-text"]}>Tokensupply: 1</p> */}
                            <div className={styles["btn-container"]}>
                                {/* <a href={`/mint/?nftId=${nft.token_id}`} className="btn btn-primary">Mint</a> */}
                                <button onClick={handelMint} className="btn btn-primary">Mint</button>

                            </div>
                        </div>
                    </div>

                </motion.div>
                :
                <div ref={mintRef} key={nft.token_id} className={`${styles.card} ${isVisible ? styles.animateCard : ''} `}>
                    <div className={styles["card-image"]}>
                        <div className={styles["card-image__overlay"]}></div>
                        <h5 className={styles["card-title"]}>{nftName}</h5>
                        <p className={styles["card-text"]}>Rarity: {nft.metadata ? nft.metadata.attributes.rarity : 'error'}</p>
                        {/* <p className={styles["card-text"]}>Rarity: Perl</p> */}
                        {/* <Image src={nft.image} width={1024}
                            height={1024}
                            layout="responsive" blurDataURL={nft.image} className={styles["card-img-top"]} alt={nft.name} priority="true" /> */}
                        <Image src={nft.metadata ? nft.metadata.image : '/img/sync-metadata.jpg'} width={1024}
                            height={1024}
                            layout="responsive" blurDataURL={nft.metadata ? nft.metadata.image : '/img/sync-metadata.jpg'} className={styles["card-img-top"]} alt={nft.metadata ? nft.metadata.name : 'error'} priority="true" />
                    </div>
                    <div className={styles["card-body"]}>
                        <div className={styles["card-body__overlay"]}></div>
                        <p className={styles["card-text"]}>{nft.metadata ? nft.metadata.description : 'error'}</p>
                        {/* <p className={styles["card-text"]}>{nft.description}</p> */}
                        <p className={styles["card-text"]}>Token Id: {nft.token_id}</p>
                        <p className={styles["card-text"]}>Tokensupply: {nft.amount}</p>
                        {nft.owners.map(o => {
                            if (currentUserAccountRef.current !== undefined && o.owner.toUpperCase() === currentUserAccountRef.current.toUpperCase()) {
                                // console.log('1324515143665465665',o.owner.toUpperCase())
                                // console.log('amount owned',o.amountOwned)
                                // console.log('132451514366546566sfhsdfh',currentUserAccountRef.current.toUpperCase())
                                return (
                                    <p className={styles["card-text"]}>You own: {o.amountOwned}</p>
                                )
                            }
                        })}
                        {/* <p className={styles["card-text"]}>Tokensupply: 1</p> */}
                        <div className={styles["btn-container"]}>
                            <a href={`https://testnets.opensea.io/assets/rinkeby/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${tokenId}`} target="_blank" rel="noreferrer" className="btn btn-primary">OpenSea</a>
                            <button onClick={syncMetadata} className="btn btn-primary">Sync</button>
                            {/* <a href={`/mint`} className="btn btn-primary">Mint</a> */}
                            {/* <a href={`/mint/?nftId=${nft.token_id}`} className="btn btn-primary">Mint</a> */}
                            {/* <a href={`/mint/?nftId=${nft.tokenId}`} className="btn btn-primary">Mint</a> */}

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