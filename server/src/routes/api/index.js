const router = require("express").Router()
const linksRouter = require("./links")

router.use("/link", linksRouter)

module.exports = router
