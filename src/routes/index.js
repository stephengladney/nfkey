const router = require("express").Router()
const apiRouter = require("./api")
const path = require("path")

router.use("/api", apiRouter)

router.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.resolve("sitemap.xml"))
})

router.get("/googleaf69fafbcd3f09b4.html", (req, res) => {
  res.sendFile(path.resolve("googleaf69fafbcd3f09b4.html"))
})

router.get("*", (req, res) => {
  console.log(`req protocol: ${req.protocol}`)
  res.redirect(`https://${req.headers.host}/${req.url}`)

  res.sendFile(path.resolve("client", "build", "index.html"))
})

module.exports = router
