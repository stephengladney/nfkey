const express = require("express")
const routes = require("./routes")

const app = express()

// app.use(express.static(resolve(__dirname, "../../client/build")))
app.use(routes)

app.listen(5000, () => {
  console.log("nfkey server is running!")
})
