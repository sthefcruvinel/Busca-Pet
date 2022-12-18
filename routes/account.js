const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

router.get('/', (req, res) => {
    Usuario.find().lean().then((usuarios) => {
        res.render("userpage/index", {usuarios: usuarios})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro")
        res.redirect("/login")
    })
})

module.exports = router