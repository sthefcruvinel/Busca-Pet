//importando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require("body-parser")
    const app = express()
    const mongoose = require('mongoose')
    const logged = require("./routes/logged")
    const homepage = require("./routes/homepage")
    const login = require("./routes/login")
    const account = require("./routes/account")
    const path = require("path")
    const session = require('express-session')
    const flash = require('connect-flash')

//configurações
    //session
        app.use(session({
            secret: "projetonode",
            resave: true,
            saveUninitialized: true
        }))
    //flash
        app.use(flash())
    //middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
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
    app.use('/logged', logged) //usuário logado
    app.use('/login', login) //tela de login
    app.use('/homepage', homepage) //tela inicial
    app.use('/account', account) //tela inicial
    
//outros
const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Servidor conectado!")
})