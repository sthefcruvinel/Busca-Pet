//importando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require("body-parser")
    const app = express()
    const mongoose = require('mongoose')
    const homepage = require("./routes/homepage")
    const login = require("./routes/login")
    const account = require("./routes/account")
    const register = require("./routes/register")
    const logout = require("./routes/logout")
    const path = require("path")
    const session = require('express-session')
    const flash = require('connect-flash')
    const bcrypt = require('bcryptjs')
    const multer = require('multer')
    const passport = require('passport')
    const upload = multer({ dest: 'uploads/' })
    require("./config/auth")(passport)
    var favicon = require('serve-favicon');

    //desativando o CORS
        app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')))
//configurações
    //session
        app.use(session({
            secret: "projetonode",
            resave: true,
            saveUninitialized: true
        }))
        app.use(passport.initialize())
        app.use(passport.session())
    //flash
        app.use(flash())
    //middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            next()
        })
    //body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //handlebars 
         app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
         app.set('view engine', 'handlebars')
    //mongoose        
        mongoose.set('strictQuery', true);
        mongoose.Promise = global.Promise;

        mongoose.connect('mongodb://127.0.0.1/buscapet').then(()=>{
            console.log('Conectado com sucesso!')
        }).catch((err)=>{
            console.log('Erro ao se conectar' + err)
        })
    //public
        app.use(express.static(path.join(__dirname, "public")))

//rotas
    app.use(login) //tela de login
    app.use(homepage) //tela inicial
    app.use(account) //tela minha conta
    app.use(register) //tela de registro
    app.use(logout) //tela inicial
    
//outros
const PORT = 3000
app.listen(PORT, ()=>{
    console.log("Servidor conectado!")
})