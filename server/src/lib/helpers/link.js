const { Link } = require("../../models")

function getLink(host, pathname) {
  return Link.findOne({ where: { host, pathname } })
}

module.exports = { getLink }
