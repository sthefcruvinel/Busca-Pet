const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Pets")
const Pet = mongoose.model("pets")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

router.get('/', (req, res) => {
    Pet.find().lean().then((pets) => {
        res.render("homepage/index", {pets: pets})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao buscar os animais")
        res.redirect("/homepage")
    })
})

router.post('/', upload.single('fotoPet'), (req, res) => {
    const novoCadastro = {
        nome: req.body.nomePet,
        genero: req.body.petSexo,
        idade: req.body.idadePet,
        endereco: req.body.localPet,
        contato: req.body.contatoPet,
        imagem: req.body.fotoPetFantasma,
        obs: req.body.obsPet,
        status: req.body.statusPet
    }
    console.log(req.body.fotoPetFantasma)
    new Pet(novoCadastro).save().then(()=>{
        console.log("Cadastrado com sucesso")
        res.redirect("/homepage")
    }).catch((err) => {
        console.log("Erro na criação: " + err)
        res.redirect("/homepage")
    })
})

module.exports = router
