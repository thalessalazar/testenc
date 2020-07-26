const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const databaseConnection = require('./database/database');
const expressSession = require('express-session');

const userController = require('./controller/userController');
const user = require('./model/UserModel');

//view engine
app.set('view engine', 'ejs');

//session
app.use(expressSession({
    secret: 'jkhfasudhfkljasdhfkjashdfhlkajsdhk',
    cookie: { maxAge: 3000000 }
}));

//static
app.use(express.static('public'));

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database
databaseConnection
    .authenticate()
    .then(() => {
        console.log('conexão feita com sucesso');
    })
    .catch((error) => {
        console.log(error);
    })

app.use('/', userController);

app.get('/', (req, res) => {
    if (req.session.user) {
        console.log(req.session.user.menu1)
        menu = {
            menu1: req.session.user.menu1,
            menu2: req.session.user.menu2,
            menu3: req.session.user.menu3,
            menu4: req.session.user.menu4,
            menu5: req.session.user.menu5,
        }
        res.render('index', menu);
    }
    else {
        res.render('login', msg = false);
    }
});

app.listen('3333', () => {
    console.log('Servidor rodando');
})