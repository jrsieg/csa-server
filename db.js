//import the sequilize package
const Sequelize = require('sequelize');



//create a new instance of Sequelize, connecting us to a database
const database = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

database.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err => console.log(err));

const CSA = database.import('./models/csa');
const User = database.import('./models/user');

CSA.belongsToMany(User, {through: 'CustomerDB'});
User.belongsToMany(CSA, {through: 'CustomerDB'});

module.exports = database;