class Model {
  constructor (){
    this._titulo = "";
    this._imagem = "";
  }
  buscaNovaImagem (dataEscolhida) {
    console.log("Estou buscando uma nova foto");
    //console.log(dataEscolhida)
    var pedido = new XMLHttpRequest();
    pedido.addEventListener("load", () => {
        if (pedido.status == 200) {
            this._atualizaDados(this._processaRequest(pedido.responseText));
        } else {
            console.log(pedido.status);
            console.log(pedido.responseText);
        }
    });
    pedido.open("GET", `https://api.nasa.gov/planetary/apod?api_key=I4y6ybtnYwrnLo5eCltnNadJdutyBuhCeFGpVkaA&date=${dataEscolhida}`,false); 
    pedido.send();
  }
  _processaRequest (responseString) {
    console.log("Processei a request");
    let response = JSON.parse(responseString);
    return response;
  }

  _atualizaDados(dados){
    console.log("Atualizei os dados");
    this._imagem = dados.hdurl;
    this._titulo = dados.title;
  } 
  get imagem () {
    //console.log("Retornando imagem");
    console.log(this._imagem);
    return this._imagem;
  }
  get titulo () {
    //console.log("Retornando titulo")
    return this._titulo;
  }
}

class View {
  constructor() {console.log("Criei uma view")}

visualizar (model) {
  let imagem = document.querySelector("#imagem");
  let paragrafo = document.querySelector("#paragrafo");
  console.log(imagem);
  imagem.src = model.imagem;
  paragrafo.innerHTML = model.titulo;
  }
}

class Controller {
  constructor () {console.log("Fui criada")}
  adicionaNovaFoto(data) {
    //console.log("aaa")
    let novaImagem = new Model();
    novaImagem.buscaNovaImagem(data);

    let view = new View ();
    view.visualizar(novaImagem);
    //console.log(novaImagem.processaRequest(armazena));
  }
}

let botao = document.querySelector("#submit");
let data = document.querySelector("#inputDate")
//console.log(data.value)

botao.addEventListener("click",function (){
  let controle = new Controller ();
  controle.adicionaNovaFoto(data.value);
});
