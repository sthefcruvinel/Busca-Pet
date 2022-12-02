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
var imgResult; //variável global que contém string da imagem sem regex (para inserir novamente no html)

function converterImagem(id){  
    var f = document.getElementById(id).files;
    var file = f[0]
    var reader = new FileReader();
    reader.onload = function () {
        imgResult = reader.result
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


function crudPet(){
    var nome = document.getElementById('nomePet').value;
    var idade = document.getElementById('idadePet').value;
    var local = document.getElementById('localPet').value;
    var obs = document.getElementById('obsPet').value;
    var imagem = document.createElement('img');
    imagem.className = "card-img-top";
    imagem.src = imgResult;
    imagem.width = "250";
    imagem.height = "250";
    //falta pegar a imagem base64 e colocar no html dinamicamente
    var divConteudo = document.getElementById('conteudo-cards');
    divConteudo.innerHTML += `<div class="col-sm-3 pt-2">
                                <div class="card text-center">
                                ${imagem.outerHTML}
                                <div class="card-body">
                                    <h5 class="card-title">${nome}, ${idade}</h5>
                                    <p class="card-text">${obs}</p>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Cras justo odio</li>
                                        <li class="list-group-item">Dapibus ac facilisis in</li>
                                        <li class="list-group-item">Vestibulum at eros</li>
                                    </ul>
                                </div>
                                </div>
                              </div>`
}