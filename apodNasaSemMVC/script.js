let botaoAdicionar = document.querySelector("#botao");
let imagem = document.querySelector("#imagemDoDia");
let titulo = document.querySelector("#titulo");
let paragrafo = document.querySelector("#paragrafo");
let data = document.querySelector("#data");
let subtitulo = document.querySelector("#title");
let explanation = document.querySelector("#explanation");


botaoAdicionar.addEventListener("click", function() {
    var pedido = new XMLHttpRequest();

    pedido.open("GET", `https://api.nasa.gov/planetary/apod?api_key=I4y6ybtnYwrnLo5eCltnNadJdutyBuhCeFGpVkaA&date=2020-11-07`); 

    pedido.addEventListener("load", function() {
        if (pedido.status == 200) {
            let resposta = pedido.responseText;
            let recebidos = JSON.parse(resposta);
            titulo.innerHTML = `Astronomy Picture of the Day`;
            paragrafo.innerHTML = `Discover the cosmos! Each day a different image or photograph
            of our fascinating universe is featured, along with a brief 
            explanation written by a professional astronomer.`;
            data.innerHTML = recebidos.date;
            imagem.src = recebidos.hdurl;
            subtitulo.innerHTML = recebidos.title;
            explanation.innerHTML = `<b>Explanation:</b> ${recebidos.explanation}`;
            botaoAdicionar.remove(); 
        } else {
            console.log(pedido.status);
        }
    });
    pedido.send();
});