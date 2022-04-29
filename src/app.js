require("dotenv").config()
const express = require("express")
const routes = require("./routes")
const http = require("http")
const https = require("https")
const app = express()
const fs = require("fs")
const { sequelize } = require("./config/sequelize")
const path = require("path")
const bodyParser = require("body-parser")

sequelize.sync()

const httpsOptions = {
  cert: fs.readFileSync("../.ssl/nfkey_to.crt"),
  ca: fs.readFileSync("../.ssl/nfkey_to.ca-bundle"),
  key: fs.readFileSync("../.ssl/nfkey_to.p7b"),
}

const httpServer = http.createServer(app)
const httpsServer = https.createServer(httpsOptions, app)

app.use((req, res, next) => {
  if (req.protocol == "http") {
    res.redirect(301, `https://${req.headers.host}${req.url}`)
  }
  next()
})

app.use(express.static(path.resolve("client", "build")))
app.use(bodyParser.json())
app.use(routes)

// app.listen(process.env.PORT || 5000, () => {
//   console.log("nfkey server is running!")
// })
httpServer.listen(80, "nfkey.to")
httpsServer.listen(443, "nfkey.to")
