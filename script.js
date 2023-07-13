//Variaveis globais para transporte de dados
let _conteudoLblVisor = []
let _conteudoVisor = []

//Visor da calculadora
const lblresultadoVisor = document.getElementById("lblresultadoVisor")
const resultadoVisor = document.getElementById("resultadoVisor")

//Botões auxiliares e suas funcionalidades
const limpeza = document.getElementById("limpeza")
limpeza.addEventListener("click", LimparVisor)

const maisMenos = document.getElementById("maisMenos")

const cento = document.getElementById("cento")


//Botões operadores e suas funcionalidades
const divisao = document.getElementById("divisao")

const multiplicacao = document.getElementById("multiplicacao")

const subtracao = document.getElementById("subtracao")

const adicao = document.getElementById("adicao")

const resultado = document.getElementById("resultado")

//Botões de números e suas funcionalidades
let botoes = document.getElementsByClassName("numeros")

for (let i = 0; i < botoes.length; i++) {
  botoes[i].addEventListener("click", function () {
    AdicionaNumeroVisor(this.textContent)
    limpeza.textContent = "C"
  })
}

//funções da calculadora
function MostrarResultado(resultado) {
  //apresenta o resultado no visor
}

function AlteraLblVisor(operacao) {
  //apresenta a conta respectiva ao resultado
}

function LimparVisor() {
  _conteudoLblVisor = []
  _conteudoVisor = []
  lblresultadoVisor.textContent = ""
  resultadoVisor.value = ""
  limpeza.textContent = "AC"
}

function AdicionaNumeroVisor(numero) {
  resultadoVisor.value += numero
}
