export async function formatNfts(owners, nfts) {
  if(nfts.result === undefined)return
  let nftArr = await nfts.result;
  let ownersArr = await owners.result;
  let newArr = [];

  nftArr.forEach((nft) => {
    ownersArr.forEach((owner) => {
        // Create owner object
        let newOwnerObj = {};
        if (nft.token_id === owner.token_id) {
            newOwnerObj.id = nft.token_id;
            newOwnerObj.owner = nft.owner_of;
            newOwnerObj.amountOwned = nft.amount;
            newArr.push(newOwnerObj);
            // console.log("ooooooooooooooooo", nft, owner);
        }
    });
});
// console.log('========================',newArr)

// Add created owner object to nfts
nftArr.forEach((nft) => {
      nft.metadata = JSON.parse(nft.metadata);
    nft.owners = [];
    nft.amount = 0;
    delete nft.owner_of;
    newArr.forEach((newNft) => {
      if (nft.token_id === newNft.id) {
        nft.owners.push(newNft);
        nft.amount = parseInt(nft.amount) + parseInt(newNft.amountOwned);
      }
    });
    nft.amount = nft.amount.toString();
  });
  // console.log('============ooooooooooooo',nftArr)

  // Remove duplicate nft ids
  let formatedNfts
  if(nftArr.length > 1 ){
    formatedNfts = nftArr.filter((n, i) => n.token_id !== i.toString());
    
    // Sort by id
    formatedNfts.sort((a, b) => {
      return a.token_id - b.token_id;
    });
    console.log("============ooooo======?????oooooooo", formatedNfts);
    
    return formatedNfts;
  }else {
    return nftArr
  }
}

export default formatNfts;
