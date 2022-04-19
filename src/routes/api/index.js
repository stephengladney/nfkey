const router = require("express").Router()
const linksRouter = require("./links")
const verifyRouter = require("./verify")

router.use("/link", linksRouter)
router.use("/verify", verifyRouter)

module.exports = router
