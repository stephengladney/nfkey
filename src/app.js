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

// const httpsOptions = {
//   cert: fs.readFileSync("./.ssl/nfkey_to.crt"),
//   ca: fs.readFileSync("./.ssl/nfkey_to.ca-bundle"),
//   key: fs.readFileSync("./.ssl/example_com.key"),
// }

// const httpServer = http.createServer(app)
// const httpsServer = https.createServer(httpsOptions, app)

app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] != "https") {
    res.redirect("https://nfkey.to" + req.url)
  } else next()
})

app.use(express.static(path.resolve("client", "build")))
app.use(bodyParser.json())
app.use(routes)

app.listen(process.env.PORT || 5000, () => {
  console.log("nfkey server is running!")
})
// httpServer.listen(process.env.PORT || 80, "nfkey.to")
// httpsServer.listen(process.env.PORT, "nfkey.to")
