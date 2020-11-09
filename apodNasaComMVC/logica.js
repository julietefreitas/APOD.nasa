class Model {
  constructor (){
    this._titulo = "";
    this._imagem = "";
  }
  buscaNovaImagem (dataEscolhida) {
    console.log("Estou buscando uma nova foto");
    //console.log(dataEscolhida)
    var pedido = new XMLHttpRequest();
    pedido.addEventListener("load", function() {
        if (pedido.status == 200) {
          console.log("entrei aqui")
            let resposta = pedido.responseText;
            let response = JSON.parse(resposta);
            console.log(response);
            //console.log(response.title);
            this._titulo = response.title;
            //console.log(this._titulo);
            this._imagem = response.hdurl;
            //console.log(this._imagem);
        } else {
            console.log(pedido.status);
            console.log(pedido.responseText);
        }
    });
    pedido.open("GET", `https://api.nasa.gov/planetary/apod?api_key=I4y6ybtnYwrnLo5eCltnNadJdutyBuhCeFGpVkaA&date=${dataEscolhida}`,false); 
    pedido.send();
  }
 /*  processaRequest (responseString) {
    console.log("Processei a request");
    let response = JSON.parse(responseString);
    return response;
  }

  atualizaDados(dados){
    console.log("Atualizei os dados");
    this._imagem = dados.hdurl;
    this._titulo = dados.title;
  } */
  getImagem () {
    //console.log("Retornando imagem");
    console.log(this._imagem);
    return this._imagem;
  }
  getTitulo () {
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
  imagem.src = `${model.getImagem()}`;
  //console.log(model.getImagem());
  //console.log(model.getTitulo());
  paragrafo.innerHTML = model.getTitulo();
  //document.getElementById("#formulario").innerHTML = "";
  }
}

class Controller {
  constructor () {console.log("Fui criada")
  }
  
  adicionaNovaFoto(data) {
    console.log("aaa")
    let novaImagem = new Model();
    novaImagem.buscaNovaImagem(data);

    let view = new View ();
    view.visualizar(novaImagem);
    //console.log(novaImagem.processaRequest(armazena));

  }
}

let botao = document.querySelector("#submit");
let data = document.querySelector("#input-data")
//console.log(data.value)

botao.addEventListener("click",function (){
  let controle = new Controller ();
  controle.adicionaNovaFoto(data.value);
});
