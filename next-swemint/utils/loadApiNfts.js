export const loadApiNfts = async () => {
    const res = await fetch('https://next-swe-mint-nandantyagi.vercel.app/api/nfts')
    const data = res.json()
    return data
}

export default loadApiNfts