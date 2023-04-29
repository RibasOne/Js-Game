
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var tempoMosquito = 2000

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'facil'){
    tempoMosquito = 2000 
}else if(nivel === 'normal'){
    tempoMosquito = 1250
}else if(nivel === 'dificil'){
    tempoMosquito = 750
}

function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth

    //console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

function posicaoRandomica(){

    //remover mosquito anterior (caso exista)
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        if(vidas > 3){
            window.location.href = 'gameover.html'
        }else{
            document.getElementById('v' + vidas).src = "imgs/coracao_vazio.png"
            vidas++
        }
    }

    var posX = Math.floor(Math.random() * largura) - 90
    var posY = Math.floor(Math.random() * altura) - 90

    if(posX < 0)
        posX = 0
    if(posY < 0)
        posY = 0

    console.log(posX, posY)

    //criar elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imgs/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posX + 'px'
    mosquito.style.top = posY + 'px'
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove()
    }

    document.body.appendChild(mosquito)

    ladoAleatorio()
}

posicaoRandomica()

function tamanhoAleatorio() {
    
    var classe = Math.floor(Math.random() * 3)

    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }

}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch(classe){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

var criaMosquito = setInterval(function(){
    posicaoRandomica()
}, tempoMosquito)

var cronometro = setInterval(function(){

    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'winner.html'
    }else{
        document.getElementById('cronometro').innerHTML = tempo 
        tempo--
    }

}, 1000)