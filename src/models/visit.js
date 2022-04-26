const db = require("../config/sequelize")

const Visit = db.sequelize.define(
  "links",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: db.Sequelize.INTEGER,
      unique: true,
    },
    page: {
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

module.exports = Visit
