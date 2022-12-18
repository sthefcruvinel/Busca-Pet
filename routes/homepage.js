const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Pets")
const Pet = mongoose.model("pets")

router.get('/', (req, res) => {
    Pet.find().lean().then((pets) => {
        res.render("homepage/index", {pets: pets})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao buscar os animais")
        res.redirect("/homepage")
    })
})


router.post('/', (req, res) => {
    const novoCadastro = {
        nome: req.body.nomePet,
        genero: req.body.petSexo,
        idade: req.body.idadePet,
        endereco: req.body.localPet,
        contato: req.body.contatoPet,
        obs: req.body.obsPet,
        status: req.body.statusPet
    }
    new Pet(novoCadastro).save().then(()=>{
        console.log("Cadastrado com sucesso")
    }).catch((err) => {
        console.log("Erro na criação" + err)
    })
})

module.exports = router
