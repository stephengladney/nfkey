const router = require("express").Router()
const apiRouter = require("./api")

router.use("/api", apiRouter)

router.get("/:path", (req, res) => {
  res.redirect(`http://localhost:3000/${req.params.path}`)
})

router.get("/", (req, res) => {
  res.redirect(`http://localhost:3000/`)
})

module.exports = router
