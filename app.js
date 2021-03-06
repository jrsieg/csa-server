require('dotenv').config();

const Express = require('express');

const app = Express();

app.use(require('./middleware/headers'));

const database = require('./db');

database.sync();

app.use(Express.json());

app.use(Express.static(__dirname + '/public'));
console.log(__dirname);
 


app.get('/', (request, response) => response.render('index'));

const csa = require('./controllers/csaController');
app.use('/csa', csa);

const user = require('./controllers/userController');
app.use('/user', user);

const junction = require('./controllers/junctionController');
app.use('/junction', junction);


app.listen(process.env.PORT, function(){ console.log(`app is listening on port ${process.env.PORT}`)});