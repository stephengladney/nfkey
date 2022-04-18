const router = require("express").Router()
const { getLink } = require("../../lib/helpers/link")
const { Link } = require("../../models")
const bodyParser = require("body-parser")

router.get("", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  })
  getLink(req.query.host, req.query.path)
    .then((link) => res.status(200).send(link || {}))
    .catch((_) => res.status(503).send("Internal server error"))
})

router.post("", bodyParser.json(), (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
  })
  Link.create(req.query)
    .then((link) => {
      res.status(200).send(link)
    })
    .catch((e) => console.log(e))
})

module.exports = router
