const router = require("express").Router()
const apiRouter = require("./api")
const path = require("path")

router.use("/api", apiRouter)

router.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.resolve("sitemap.xml"))
})

router.get("*", (req, res) => {
  res.sendFile(path.resolve("client", "build", "index.html"))
})

module.exports = router
