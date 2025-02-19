const Sequelize = require('sequelize');
const db = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

const User = db.define('users', {
  username: Sequelize.STRING,
  discord_id: Sequelize.STRING
})

const Plan = db.define('plans', {
  name: Sequelize.STRING,
  plan_tag: {
    type: Sequelize.STRING,
    allowNull: false
  },
  discord_id: Sequelize.STRING,
  username: Sequelize.STRING,
  goal: Sequelize.INTEGER,
  daily_avg: Sequelize.INTEGER,
  current_progress: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  }
});

const Track = db.define('tracks', {
  item_tag: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  item: Sequelize.STRING,
  username: Sequelize.STRING,
  discord_id: Sequelize.STRING,
  value: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  current_progress: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  }
});

Track.belongsTo(User);
Plan.belongsTo(User);
User.hasOne(Track);
User.hasOne(Plan);

module.exports = {
  db,
  Track,
  User,
  Plan
}
