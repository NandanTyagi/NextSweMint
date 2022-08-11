import { useMoralisWeb3Api } from "react-moralis";

export const getAllTokens = async () => {

    const Web3Api = useMoralisWeb3Api();

    const options = {
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        chain: process.env.NEXT_PUBLIC_CHAIN,
    };
    const NFTs = await Web3Api.token.getAllTokenIds(options);
    return NFTs
}
export default getAllTokens