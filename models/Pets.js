const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Pets = new Schema({

    nome: {
        type: String,
        require: true,
    },
    genero: {
        type: String,
        require: true
    },
    idade:{
        type: String,
        require: true
    },
    endereco:{
        type: String,
        required: true
    },
    contato:{
        type: String,
        required: true
    },
    obs: {
        type: String,
        required: false,
        default: "Ajude a encontrar este pet que está desaparecido!"
    },
    status:{
        type: String,
        required: true,
    },
    usuario: {
        type: Number,
        required: false
    }
})

mongoose.model('pets', Pets)