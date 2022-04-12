const db = require("../config/sequelize")

const Link = db.sequelize.define(
  "links",
  {
    host: {
      type: db.Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    pathname: {
      type: db.Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    requirement_smart_contract: {
      type: db.Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    requirement_quantity: {
      type: db.Sequelize.INTEGER,
      unique: false,
      allowNull: false,
    },
    requirement_token_id: {
      type: db.Sequelize.STRING,
      unique: false,
      allowNull: true,
    },
    url: {
      type: db.Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
  }
  // Object.assign({}, db.preferences, {
  //   hooks: {
  //     afterValidate: (user) => {
  //       user.password = bcrypt.hashSync(user.password, 8)
  //     },
  //   },
  // })
)

module.exports = Link
