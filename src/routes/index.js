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

router.get(
  "/.well-known/pki-validation/E2ADFCB28576923E02E3C2786EDD3283.txt",
  (req, res) => {
    res.sendFile(
      path.resolve(
        ".well-known",
        "pki-validation",
        "E2ADFCB28576923E02E3C2786EDD3283.txt"
      )
    )
  }
)

router.get("*", (req, res) => {
  res.sendFile(path.resolve("client", "build", "index.html"))
})

module.exports = router
