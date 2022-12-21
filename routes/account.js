const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/Pets")
const Pet = mongoose.model("pets")

router.get('/account/:id', (req, res) => {
    var string = req.params.id
    id = string.slice(26, 50)
    Pet.find({usuario:id}).lean().then((pets) =>{
        Usuario.findOne({_id:id}).lean().then((usuario) => {
        res.render("userpage/index", {usuario: usuario, pets: pets})
    })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro")
        res.redirect("/login")
    })
})

module.exports = router