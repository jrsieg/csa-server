//import the sequilize package
const Sequelize = require('sequelize');



//create a new instance of Sequelize, connecting us to a database
const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION 
        },
    }
});

database.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err => console.log(err));

const CSA = database.import('./models/csa');
const User = database.import('./models/user');

CSA.belongsToMany(User, {through: 'CustomerDB'});
User.belongsToMany(CSA, {through: 'CustomerDB'});

module.exports = database;