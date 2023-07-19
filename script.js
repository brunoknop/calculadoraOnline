//Variaveis globais para transporte de dados
let _conteudoLblVisor = []
let _operadorSelecionado = false

//Visor da calculadora
const lblresultadoVisor = document.getElementById("lblresultadoVisor")
const resultadoVisor = document.getElementById("resultadoVisor")
resultadoVisor.addEventListener("keypress", function (e) {
  /*
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
  */

  //não permitir que nenhuma tecla seja pressionada
  e.preventDefault()
})

function AdicionarNumeroAoVisor(numero) {
  if (numero != ",") document.getElementById("limpeza").textContent = "C"
  if (_operadorSelecionado) {
    _operadorSelecionado = false
    resultadoVisor.value = ""
  }
  let valorAtual = resultadoVisor.value
  if (numero == "," && (valorAtual.includes(",") || valorAtual.includes("."))) {
    return true
  } else if (numero == "," && valorAtual.length == 0) {
    return true
  } else {
    resultadoVisor.value += numero
  }
}

function LimparVisor() {
  lblresultadoVisor.textContent = ""
  resultadoVisor.value = ""
  _conteudoLblVisor = []
  document.getElementById("limpeza").textContent = "AC"
}

function AtualizarLblVisor() {
  lblresultadoVisor.textContent = ""
  for (let n = 0; n < _conteudoLblVisor.length; n++) {
    lblresultadoVisor.textContent += _conteudoLblVisor[n]
  }
}

function ExecutarAcaoDeOperador(operador) {
  if (resultadoVisor.value != 0) {
    if (_conteudoLblVisor.length == 2 && operador != "=") {
      let resultado = EfetuarOperacao(operador, resultadoVisor.value)
      LimparVisor()
      _conteudoLblVisor.push(resultado)
      _conteudoLblVisor.push(operador)
      resultadoVisor.value = resultado
      _operadorSelecionado = true
    } else if (_conteudoLblVisor.length == 2 && operador == "=") {
      let resultado = EfetuarOperacao(
        _conteudoLblVisor[1],
        resultadoVisor.value
      )
      _conteudoLblVisor.push(resultadoVisor.value)
      resultadoVisor.value = resultado
      _operadorSelecionado = true
    } else if (_conteudoLblVisor.length == 3 && operador != "=") {
      _conteudoLblVisor = []
      _conteudoLblVisor.push(resultadoVisor.value)
      _conteudoLblVisor.push(operador)
      _operadorSelecionado = true
    } else if (_conteudoLblVisor.length == 3 && operador == "=") {
      _conteudoLblVisor[0] = resultadoVisor.value
      let resultado = EfetuarOperacao(
        _conteudoLblVisor[1],
        _conteudoLblVisor[2]
      )
      resultadoVisor.value = resultado
      _operadorSelecionado = true
    } else {
      _conteudoLblVisor.push(resultadoVisor.value)
      _conteudoLblVisor.push(operador)
      _operadorSelecionado = true
    }
    AtualizarLblVisor()
  }
}

function EfetuarOperacao(operador, valor) {
  let resultado
  switch (operador) {
    case "+":
      resultado = Somar(valor)
      break

    case "-":
      resultado = Subtrair(valor)
      break

    case "÷":
      resultado = Dividir(valor)
      break

    case "×":
      resultado = Multiplicar(valor)
      break
  }
  return substituirPontoPorVirgula(resultado)
}

function substituirVirgulaPorPonto(str) {
  return String(str).replace(/,/g, ".")
}

function substituirPontoPorVirgula(str) {
  return String(str).replace(".", ",")
}

function Somar(valor) {
  return (
    Number(substituirVirgulaPorPonto(_conteudoLblVisor[0])) +
    Number(substituirVirgulaPorPonto(valor))
  )
}

function Subtrair(valor) {
  return (
    Number(substituirVirgulaPorPonto(_conteudoLblVisor[0])) -
    Number(substituirVirgulaPorPonto(valor))
  )
}

function Dividir(valor) {
  return (
    Number(substituirVirgulaPorPonto(_conteudoLblVisor[0])) /
    Number(substituirVirgulaPorPonto(valor))
  )
}

function Multiplicar(valor) {
  return (
    Number(substituirVirgulaPorPonto(_conteudoLblVisor[0])) *
    Number(substituirVirgulaPorPonto(valor))
  )
}
