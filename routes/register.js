const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
    res.render("register/index")
})

router.post('/', (req, res) => {
    var erros = []

    if (!req.body.usuarioNome || typeof req.body.usuarioNome == undefined || req.body.usuarioNome == null){
        erros.push({texto: "Nome inválido"})
    }
    if (!req.body.usuarioEmail || typeof req.body.usuarioEmail == undefined || req.body.usuarioEmail == null){
        erros.push({texto: "Email inválido"})
    }
    if (!req.body.usuarioSenha || typeof req.body.usuarioSenha == undefined || req.body.usuarioSenha == null){
        erros.push({texto: "Senha inválida"})
    }
    if(req.body.usuarioSenha.length < 5){
        erros.push({texto: "Senha muito curta"})
    }
    if(req.body.usuarioSenha != req.body.usuarioSenhaValida){
        erros.push({texto: "As senhas não são iguais, tente novamente"})
    }
    if(erros.length > 0){
        res.render("login/", {erros: erros})
    }else{
        Usuario.findOne({email: req.body.usuarioEmail}).then((usuario) =>{
            if (usuario){
                req.flash("error_msg", "Já existe uma conta com este email")
                res.redirect("/login")
            }else{

                const novoUsuario = new Usuario ({
                    nome: req.body.usuarioNome,
                    contato: req.body.usuarioContato,
                    email: req.body.usuarioEmail,
                    senha: req.body.usuarioSenha
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) =>{
                        if(erro){
                            req.flash("error_msg", "Houve um erro")
                            res.redirect("/login")
                        }
                        novoUsuario.senha = hash 

                        novoUsuario.save().then(() => {
                            req.flash("success_msg", "Inserido com sucesso")
                            res.redirect("/login")
                        }).catch(() => {
                            req.flash("error_msg", "Erro ao inserir")
                            res.redirect("/login")
                        })
                    })
                })
            }
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno")
        })

    }
})

module.exports = router