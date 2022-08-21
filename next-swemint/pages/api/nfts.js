import loadNfts from "../../utils/loadNfts";

export default async function handler(req, res) {
  res.status(200).json(await loadNfts())
}
