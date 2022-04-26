const router = require("express").Router()
const { Visit } = require("../../models")

router.post("", (req, res) => {
  Visit.create(req.body)
    .then((_) => res.status(200).send())
    .catch((e) => {
      res.status(503).send()
      console.log(e)
    })
})

module.exports = router
