const Sequelize = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

module.exports = { Sequelize, sequelize }
