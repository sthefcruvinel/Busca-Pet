function gerarPdf(){
    var petNome = document.getElementById('pet_nome').value;
    var petLocal = document.getElementById('local_pet').value;
    var petContato = document.getElementById('contato_pet').value;
    var petObs = document.getElementById('obs_pet').value;
    var doc = new jsPDF();
    doc.setFontSize(40);
    doc.text(30, 25, 'PROCURA-SE ' + petNome.toUpperCase());
    doc.addImage(base64String, 'JPG', 15, 40, 180, 180)
    doc.save(petNome + '.pdf');
}

var base64String; //variável global que contém string da imagem em base64 

function converterImagem(){  
    var file = document.querySelector(
        'input[type=file]')['files'][0];
    var reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        imageBase64Stringsep = base64String; 
    }
    reader.readAsDataURL(file);
}

function registraUser(){
    var divRegistro = document.getElementById('registro');
    var divLogin = document.getElementById('login');
    divRegistro.style.display = 'flex';
    divLogin.style.display = 'none';
}

function cadastroAnimal(){
    var cadAnimalDesaparecido = document.getElementById('novo-cadastro');
    cadAnimalDesaparecido.style.display = 'flex';
    var cadAnimalDesaparecido = document.getElementById('cad-animal-desaparecido');
    cadAnimalDesaparecido.style.display = 'none';
    var cadAnimalAdocao = document.getElementById('cad-animal-adocao');
    cadAnimalAdocao.style.display = 'none';
}

function animalDesaparecido(){
    var novoCadastro = document.getElementById('novo-cadastro');
    var cadAnimalDesaparecido = document.getElementById('cad-animal-desaparecido');
    cadAnimalDesaparecido.style.display = 'flex';
    novoCadastro.style.display = 'none';
}

function animalAdocao(){
    var novoCadastro = document.getElementById('novo-cadastro');
    var cadAnimalAdocao = document.getElementById('cad-animal-adocao');
    cadAnimalAdocao.style.display = 'flex';
    novoCadastro.style.display = 'none';
}
