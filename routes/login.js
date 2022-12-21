const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require('bcryptjs')
const passport = require('passport')

    router.get('/login', (req, res) => {
        res.render("login/index")
    })

    router.post('/login', (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: "/homepage",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next)
    })

module.exports = router