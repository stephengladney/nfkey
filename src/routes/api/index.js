const router = require("express").Router()
const linksRouter = require("./links")
const verifyRouter = require("./verify")
const visitRouter = require("./visits")

router.use("/link", linksRouter)
router.use("/verify", verifyRouter)
router.use("/visit", visitRouter)

module.exports = router
