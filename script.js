//Variaveis globais para transporte de dados
let _conteudoLblVisor = []

//Visor da calculadora
const lblresultadoVisor = document.getElementById("lblresultadoVisor")
const resultadoVisor = document.getElementById("resultadoVisor")

//Botões auxiliares e suas funcionalidades
const limpeza = document.getElementById("limpeza")
limpeza.addEventListener("click", function () {
  _conteudoLblVisor = []
  LimparVisor()
  limpeza.textContent = "AC"
})

const maisMenos = document.getElementById("maisMenos")
const cento = document.getElementById("cento")

//Botões operadores e suas funcionalidades
let operadores = document.getElementsByClassName("operadores")

for (let n = 0; n < operadores.length; n++) {
  operadores[n].addEventListener("click", function () {
    if (this.textContent == "=") ApresentarResultado()
    else {
      if (_conteudoLblVisor.length == 3) _conteudoLblVisor = []
      if (_conteudoLblVisor.length <= 0) {
        AdicionarValorAoLbl(resultadoVisor.value)
        AdicionarValorAoLbl(this.textContent)
      } else {
        _conteudoLblVisor[1] = this.textContent
      }
      AtualizarLblVisor()
    }
  })
}

//Botões de números e suas funcionalidades
let botoes = document.getElementsByClassName("numeros")

for (let n = 0; n < botoes.length; n++) {
  botoes[n].addEventListener("click", function () {
    if (_conteudoLblVisor.length == 2) resultadoVisor.value = "" //resolver questão da limpeza da tela
    AdicionaNumeroVisor(this.textContent)
    limpeza.textContent = "C"
  })
}

function AtualizarLblVisor() {
  lblresultadoVisor.textContent = ""
  for (let n = 0; n < _conteudoLblVisor.length; n++) {
    lblresultadoVisor.textContent += _conteudoLblVisor[n]
  }
}

function LimparVisor() {
  lblresultadoVisor.textContent = ""
  resultadoVisor.value = ""
}

function AdicionaNumeroVisor(numero) {
  resultadoVisor.value += numero
}

function AdicionarValorAoLbl(valor) {
  _conteudoLblVisor.push(valor)
}

function ApresentarResultado() {
  let resultado
  switch (_conteudoLblVisor[1]) {
    case "+":
      //executa a soma
      break

    case "-":
      // executa subtração
      break

    case "÷":
      //exevuta a divisão
      break

    case "×":
      //executa a multiplicação
      break
  }
  resultadoVisor.value = resultado
}
