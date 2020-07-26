const express = require('express');
const router = express.Router();
const userModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const { hashSync } = require('bcrypt');
const auth = require('../middleware/auth');

//redirecionamentos
router.get('/user', auth, (req, res) => {
    userModel.findAll().then(users => {
        res.render('user/index', { users: users });
    });
})

router.get('/admin/user/save', auth, (req, res) => {
    res.render('user/save');
});

router.get("/user/edit/:id", auth, (req, res) => {
    const id = req.params.id;
    console.log('Chegou na rota de redirecionamento de edição de usuario');

    userModel.findByPk(id).then(user => {
        if (user != undefined) {
            res.render('user/edit', { user: user });
        } else {
            console.log('erro no else')
            res.redirect('/');
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/');
    });

});

//CRUD
router.post('/user/save', auth, (req, res) => {
    var { name, login, password, menu1, menu2, menu3, menu4, menu5 } = req.body;

    if (menu1 == 's') menu1 = true; else menu1 = false;
    if (menu2 == 's') menu2 = true; else menu2 = false;
    if (menu3 == 's') menu3 = true; else menu3 = false;
    if (menu4 == 's') menu4 = true; else menu4 = false;
    if (menu5 == 's') menu5 = true; else menu5 = false;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    userModel.create({
        name: name,
        login: login,
        password: hash.toString(),
        menu1: menu1,
        menu2: menu2,
        menu3: menu3,
        menu4: menu4,
        menu5: menu5
    }).then(() => {
        console.log('Usuario Cadastrado com Sucesso!');
        res.redirect('/');
    });
});

//update
router.post("/user/update", auth, (req, res) => {
    var { id, name, login, menu1, menu2, menu3, menu4, menu5 } = req.body;

    if (menu1 == 's') menu1 = true; else menu1 = false;
    if (menu2 == 's') menu2 = true; else menu2 = false;
    if (menu3 == 's') menu3 = true; else menu3 = false;
    if (menu4 == 's') menu4 = true; else menu4 = false;
    if (menu5 == 's') menu5 = true; else menu5 = false;

    req.session.user = {
        login: login,
        menu1: menu1,
        menu2: menu2,
        menu3: menu3,
        menu4: menu4,
        menu5: menu5
    };

    userModel.update({
        name: name,
        login: login,
        menu1: menu1,
        menu2: menu2,
        menu3: menu3,
        menu4: menu4,
        menu5: menu5
    }, {
        where: {
            id: id
        }
    }).then(() => {
        console.log('Usuario alterado com sucesso');
        res.redirect('/');
    })
});

//delete
router.post('/user/delete', auth, (req, res) => {
    let id = req.body.id;

    if (id != undefined) {

        if (!isNaN(id)) {
            userModel.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/user');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/auth', (req, res) => {
    const { login, password } = req.body;

    userModel.findOne({
        where: { login: login }
    }).then(user => {
        if (login == user.login && bcrypt.compareSync(password, user.password) == true) {
            req.session.user = {
                login: user.login,
                menu1: user.menu1,
                menu2: user.menu2,
                menu3: user.menu3,
                menu4: user.menu4,
                menu5: user.menu5
            },
                menu = {
                    menu1: req.session.user.menu1,
                    menu2: req.session.user.menu2,
                    menu3: req.session.user.menu3,
                    menu4: req.session.user.menu4,
                    menu5: req.session.user.menu5,
                }
            res.render('index', menu);
        } else {
            res.render('login', msg = true);
        }
    }).catch((err) => {
        res.render('login', msg = true);
    });
});

router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.render('login');
});

module.exports = router;