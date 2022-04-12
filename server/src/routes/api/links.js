const router = require("express").Router()
const { response } = require("express")
const { Link } = require("../../models")

function getLink(host, pathname) {
  return Link.findOne({ where: { host, pathname } })
}

router.get("", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  })
  getLink(req.query.host, req.query.path).then((link) =>
    res.status(200).send(link || {})
  )
})

module.exports = router
