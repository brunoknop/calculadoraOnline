//Variaveis globais para transporte de dados
let _conteudoLblVisor = []
let _operadorSelecionado = false

//Visor da calculadora
const lblresultadoVisor = document.getElementById("lblresultadoVisor")
const resultadoVisor = document.getElementById("resultadoVisor")
resultadoVisor.addEventListener("keypress", function (e) {
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
  for (let i = 0; i < _conteudoLblVisor.length; i++) {
    lblresultadoVisor.textContent += _conteudoLblVisor[i]
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
    } else if (
      _conteudoLblVisor.length == 3 &&
      _conteudoLblVisor[1] != "%" &&
      operador == "="
    ) {
      _conteudoLblVisor[0] = resultadoVisor.value
      let resultado = EfetuarOperacao(
        _conteudoLblVisor[1],
        _conteudoLblVisor[2]
      )
      resultadoVisor.value = resultado
      _operadorSelecionado = true
    } else if (
      _conteudoLblVisor[1] == "%" &&
      _conteudoLblVisor.length == 3 &&
      operador == "="
    ) {
      return
    } else {
      _conteudoLblVisor.push(resultadoVisor.value)
      _conteudoLblVisor.push(operador)
      _operadorSelecionado = true
    }
    AtualizarLblVisor()
  }
}

function EfetuarOperacao(operador, segundoValor) {
  let resultado
  switch (operador) {
    case "+":
      resultado = Somar(_conteudoLblVisor[0], segundoValor)
      break

    case "-":
      resultado = Subtrair(_conteudoLblVisor[0], segundoValor)
      break

    case "÷":
      resultado = Dividir(_conteudoLblVisor[0], segundoValor)
      break

    case "×":
      resultado = Multiplicar(_conteudoLblVisor[0], segundoValor)
      break

    case "%":
      resultado = Porcentar(_conteudoLblVisor[0], segundoValor)
  }
  return substituirPontoPorVirgula(resultado)
}

function substituirVirgulaPorPonto(str) {
  return String(str).replace(/,/g, ".")
}

function substituirPontoPorVirgula(str) {
  return String(str).replace(".", ",")
}

function Somar(primeiroValor, segundoValor) {
  if (segundoValor.includes("%")) {
    segundoValor =
      Number(substituirVirgulaPorPonto(primeiroValor)) *
      (Number(substituirVirgulaPorPonto(segundoValor.replace("%", ""))) / 100)
  }

  return (
    Number(substituirVirgulaPorPonto(primeiroValor)) +
    Number(substituirVirgulaPorPonto(segundoValor))
  )
}

function Subtrair(primeiroValor, segundoValor) {
  if (segundoValor.includes("%")) {
    segundoValor =
      Number(substituirVirgulaPorPonto(primeiroValor)) *
      (Number(substituirVirgulaPorPonto(segundoValor.replace("%", ""))) / 100)
  }

  return (
    Number(substituirVirgulaPorPonto(primeiroValor)) -
    Number(substituirVirgulaPorPonto(segundoValor))
  )
}

function Dividir(primeiroValor, segundoValor) {
  if (segundoValor.includes("%")) {
    segundoValor =
      Number(substituirVirgulaPorPonto(primeiroValor)) *
      (Number(substituirVirgulaPorPonto(segundoValor.replace("%", ""))) / 100)
  }

  return (
    Number(substituirVirgulaPorPonto(primeiroValor)) /
    Number(substituirVirgulaPorPonto(segundoValor))
  )
}

function Multiplicar(primeiroValor, segundoValor) {
  if (segundoValor.includes("%")) {
    segundoValor =
      Number(substituirVirgulaPorPonto(segundoValor.replace("%", ""))) / 100
  }

  return (
    Number(substituirVirgulaPorPonto(primeiroValor)) *
    Number(substituirVirgulaPorPonto(segundoValor))
  )
}

function Porcentar(primeiroValor, segundoValor) {
  return (
    (Number(substituirVirgulaPorPonto(primeiroValor)) / 100) *
    Number(substituirVirgulaPorPonto(segundoValor))
  )
}

function AplicarPorcentagem() {
  if (resultadoVisor.value.length != 0) {
    if (_conteudoLblVisor.length == 3 && _conteudoLblVisor[1] == "%") {
      _conteudoLblVisor = []
    }
    if (_conteudoLblVisor.length == 0) {
      console.log("conteudoLblVisorZero")
      _conteudoLblVisor.push(resultadoVisor.value)
      _conteudoLblVisor.push("%")
      _operadorSelecionado = true
    }
  }
  AtualizarLblVisor()
}

function PositivarOuNegativar() {
  if (resultadoVisor.value[0] == "-")
    resultadoVisor.value = resultadoVisor.value.replace("-", "")
  else resultadoVisor.value = "-" + resultadoVisor.value
}
