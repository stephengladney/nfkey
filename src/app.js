require("dotenv").config()
const express = require("express")
const routes = require("./routes")
const app = express()
const { sequelize } = require("./config/sequelize")
const path = require("path")
const bodyParser = require("body-parser")

sequelize.sync()

app.use(express.static(path.resolve("client", "build")))
app.use(bodyParser.json())
app.use(routes)

app.use((req, res, next) => {
  if (req.protocol === "http") {
    res.redirect(`https://${req.headers.host}/${req.url}`)
  }
  next()
})

app.listen(process.env.PORT || 5000, () => {
  console.log("nfkey server is running!")
})
