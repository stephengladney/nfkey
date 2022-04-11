const router = require("express").Router()

const links = [
  {
    id: 1,
    host: "localhost:3000",
    path: "gladney",
    requirement_quantity: null,
    requirement_smart_contract: "x001",
    requirement_token_id: "761",
    url: "https://vistaprint.com",
  },
  {
    id: 1,
    host: "localhost:3000",
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

router.get("", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  })
  res.status(200).send(getLink(req.query.host, req.query.path) || {})
})

module.exports = router
