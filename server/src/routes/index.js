const router = require("express").Router()
const path = require("path")

const links = [
  {
    id: 1,
    host: "nfkey.to",
    path: "gladney",
    requirement_quantity: null,
    requirement_smart_contract: "x001",
    requirement_token_id: "761",
    url: "https://vistaprint.com",
  },
  {
    id: 1,
    host: "custom.url",
    path: "barber",
    requirement_quantity: 2,
    requirement_smart_contract: "x001",
    requirement_token_id: null,
    url: "https://google.com",
  },
]

function getLink(host, path) {
  return links.find((link) => link.host === host && link.path === path)
}

router.get("/:path", (req, res) => {
  res.redirect(`http://localhost:3000/${req.params.path}`)
})

router.get("/api/link", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")
  res.status(200).send(getLink(req.query.host, req.query.path))
})

router.get("/", (req, res) => {
  res.send("Homepage")
})

module.exports = router
