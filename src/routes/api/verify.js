const router = require("express").Router()
const ethereum = require("../../lib/ethereum")
const { Link } = require("../../models")

router.get("", async (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  })
  try {
    const link = await Link.findOne({ where: { id: req.query.link_id } })
    const contract = ethereum.newContract(link.requirement_smart_contract)
    const balance = await contract.balanceOf(req.query.wallet_address)
    res.status(200).send({ allow: balance > 0 ? true : false })
  } catch (e) {}
})

module.exports = router
