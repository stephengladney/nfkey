const router = require("express").Router()
const { getLink } = require("../../lib/helpers/link")
const { Link } = require("../../models")

router.get("", (req, res) => {
  getLink(req.query.host, req.query.path)
    .then((link) => res.status(200).send(link || {}))
    .catch((_) => res.status(503).send("Internal server error"))
})

router.post("", (req, res) => {
  Link.create(req.query)
    .then((link) => {
      res.status(200).send(link)
    })
    .catch((e) => console.log(e))
})

module.exports = router
