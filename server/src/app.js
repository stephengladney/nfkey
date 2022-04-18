require("dotenv").config()
const express = require("express")
const routes = require("./routes")
const pg = require("pg")
const app = express()
const { sequelize } = require("./config/sequelize")

sequelize.sync()

// app.use(express.static(resolve(__dirname, "../../client/build")))

app.use(routes)
// app.use(cors({ origin: "*" }))
// app.use(bodyParser.urlencoded({ extended: true }))

app.listen(5000, () => {
  console.log("nfkey server is running!")
})
