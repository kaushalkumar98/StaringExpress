const Sequelize = require("sequelize");
const sequalize = require("../utils/database");

const Player = sequalize.define("player", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dob: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birthPlace: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  career: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  matches: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  fifties: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  centuries: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  wickets: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  average: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Player;
