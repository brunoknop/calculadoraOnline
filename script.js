//Variaveis globais para transporte de dados
let _conteudoLblVisor = []
let _operadorSelecionado = false

//Visor da calculadora
const lblresultadoVisor = document.getElementById("lblresultadoVisor")
const resultadoVisor = document.getElementById("resultadoVisor")
resultadoVisor.addEventListener("keypress", function (e) {
  // Permitir apenas números e o ponto/virgula
  var charCode = e.which ?? e.keyCode
  var tecla = String.fromCharCode(charCode)
  var valorAtual = e.target.value

  if (
    charCode > 31 &&
    (charCode < 48 || charCode > 57) &&
    charCode != 46 &&
    charCode != 44
  ) {
    e.preventDefault()
  } else if (
    (tecla == "," || tecla == ".") &&
    (valorAtual.includes(",") || valorAtual.includes("."))
  ) {
    // Impedir mais de uma vírgula ou ponto
    e.preventDefault()
  } else if ((tecla == "," || tecla == ".") && valorAtual.length == 0) {
    // Impedir vírgula ou ponto no início
    e.preventDefault()
  } else {
    return true
  }
})

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
        _operadorSelecionado = true
      } else {
        _conteudoLblVisor[1] = this.textContent
        _operadorSelecionado = true
      }
      AtualizarLblVisor()
    }
  })
}

//Botões de números e suas funcionalidades
let botoes = document.getElementsByClassName("numeros")

for (let n = 0; n < botoes.length; n++) {
  botoes[n].addEventListener("click", function () {
    if (_operadorSelecionado) {
      _operadorSelecionado = false
      resultadoVisor.value = ""
    }
    if (this.textContent == "," && resultadoVisor.value != "") {
      AdicionaNumeroVisor(this.textContent)
      limpeza.textContent = "C"
    } else if (this.textContent != ",") {
      AdicionaNumeroVisor(this.textContent)
      limpeza.textContent = "C"
    }
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

function substituirVirgulaPorPonto(str) {
  return str.replace(/,/g, ".")
}

function ApresentarResultado() {
  let resultado
  switch (_conteudoLblVisor[1]) {
    case "+":
      resultado = Somar()
      break

    case "-":
      resultado = Subtrair()
      break

    case "÷":
      resultado = Dividir()
      break

    case "×":
      resultado = Multiplicar()
      break
  }
  lblresultadoVisor.textContent += resultadoVisor.value
  resultadoVisor.value = resultado
  _operadorSelecionado = true
}

function Somar() {
  return (
    Number(substituirVirgulaPorPonto(_conteudoLblVisor[0])) +
    Number(substituirVirgulaPorPonto(resultadoVisor.value))
  )
}

function Subtrair() {
  return (
    Number(substituirVirgulaPorPonto(_conteudoLblVisor[0])) -
    Number(substituirVirgulaPorPonto(resultadoVisor.value))
  )
}

function Dividir() {
  return (
    Number(substituirVirgulaPorPonto(_conteudoLblVisor[0])) /
    Number(substituirVirgulaPorPonto(resultadoVisor.value))
  )
}

function Multiplicar() {
  return (
    Number(substituirVirgulaPorPonto(_conteudoLblVisor[0])) *
    Number(substituirVirgulaPorPonto(resultadoVisor.value))
  )
}
