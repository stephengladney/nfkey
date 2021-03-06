const db = require("../config/sequelize")

const Link = db.sequelize.define(
  "links",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: db.Sequelize.INTEGER,
      unique: true,
    },
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
      allowNull: true,
    },
    requirement_token_id: {
      type: db.Sequelize.STRING,
      unique: false,
      allowNull: true,
    },
    destination_url: {
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
