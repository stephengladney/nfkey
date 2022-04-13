const router = require("express").Router()
const { getLink } = require("../../lib/helpers/link")

router.get("", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  })
  getLink(req.query.host, req.query.path)
    .then((link) => res.status(200).send(link || {}))
    .catch((_) => res.status(503).send("Internal server error"))
})

module.exports = router
