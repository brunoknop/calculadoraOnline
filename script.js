//Variaveis globais para transporte de dados
let _conteudoVisorSecundario = []
let _operadorSelecionado = false

//Visor da calculadora
const visorSecundario = document.getElementById("visorSecundario")
const visorPrincipal = document.getElementById("visorPrincipal")

function AdicionarNumeroAoVisor(numero) {
  if (numero != ",") document.getElementById("limpeza").textContent = "C"
  if (_operadorSelecionado) {
    _operadorSelecionado = false
    visorPrincipal.textContent = ""
  }
  if (
    numero == "," &&
    (visorPrincipal.textContent.includes(",") ||
      visorPrincipal.textContent.length == 0)
  ) {
    return true
  } else {
    visorPrincipal.textContent += numero
  }
}

function LimparVisores() {
  visorSecundario.textContent = ""
  visorPrincipal.textContent = ""
  _conteudoVisorSecundario = []
  document.getElementById("limpeza").textContent = "AC"
}

function AtualizarLblVisor() {
  visorSecundario.textContent = ""
  for (let i = 0; i < _conteudoVisorSecundario.length; i++) {
    visorSecundario.textContent += _conteudoVisorSecundario[i]
  }
}

function ExecutarAcaoDeOperador(operador) {
  if (
    visorPrincipal.textContent != 0 ||
    (_conteudoVisorSecundario[1] != "%" &&
      _conteudoVisorSecundario.length != 3 &&
      operador != "=")
  ) {
    if (_conteudoVisorSecundario.length == 2 && operador != "=")
      ContinuarContaComNovoOperador(operador)
    else if (_conteudoVisorSecundario.length == 2 && operador == "=")
      ApresentarResultadoFinal()
    else if (_conteudoVisorSecundario.length == 3 && operador != "=")
      UtilizarResultadoFinalEmNovaOperacao(operador)
    else if (
      _conteudoVisorSecundario.length == 3 &&
      _conteudoVisorSecundario[1] != "%" &&
      operador == "="
    )
      IncrementarComUltimoOperadorEscolhido()
    else AdicionarValorEOperadorAoHistorico(operador)
    AtualizarLblVisor()
  }
}

function ContinuarContaComNovoOperador(operador) {
  let resultado = EfetuarOperacao(operador, visorPrincipal.textContent)
  LimparVisores()
  _conteudoVisorSecundario.push(resultado)
  _conteudoVisorSecundario.push(operador)
  visorPrincipal.textContent = resultado
  _operadorSelecionado = true
}

function ApresentarResultadoFinal() {
  let resultado = EfetuarOperacao(
    _conteudoVisorSecundario[1],
    visorPrincipal.textContent
  )
  _conteudoVisorSecundario.push(visorPrincipal.textContent)
  visorPrincipal.textContent = resultado
  _operadorSelecionado = true
}

function UtilizarResultadoFinalEmNovaOperacao(operador) {
  _conteudoVisorSecundario = []
  _conteudoVisorSecundario.push(visorPrincipal.textContent)
  _conteudoVisorSecundario.push(operador)
  _operadorSelecionado = true
}

function IncrementarComUltimoOperadorEscolhido() {
  _conteudoVisorSecundario[0] = visorPrincipal.textContent
  let resultado = EfetuarOperacao(
    _conteudoVisorSecundario[1],
    _conteudoVisorSecundario[2]
  )
  visorPrincipal.textContent = resultado
  _operadorSelecionado = true
}

function AdicionarValorEOperadorAoHistorico(operador) {
  _conteudoVisorSecundario.push(visorPrincipal.textContent)
  _conteudoVisorSecundario.push(operador)
  _operadorSelecionado = true
}

function EfetuarOperacao(operador, segundoValor) {
  let resultado
  switch (operador) {
    case "+":
      resultado = Somar(_conteudoVisorSecundario[0], segundoValor)
      break

    case "-":
      resultado = Subtrair(_conteudoVisorSecundario[0], segundoValor)
      break

    case "÷":
      resultado = Dividir(_conteudoVisorSecundario[0], segundoValor)
      break

    case "×":
      resultado = Multiplicar(_conteudoVisorSecundario[0], segundoValor)
      break

    case "%":
      resultado = Porcentar(_conteudoVisorSecundario[0], segundoValor)
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
  if (visorPrincipal.textContent.length != 0) {
    if (
      _conteudoVisorSecundario.length == 3 &&
      _conteudoVisorSecundario[1] == "%"
    ) {
      _conteudoVisorSecundario = []
    }
    if (_conteudoVisorSecundario.length == 0) {
      _conteudoVisorSecundario.push(visorPrincipal.textContent)
      _conteudoVisorSecundario.push("%")
      visorPrincipal.textContent += "%"
      _operadorSelecionado = true
    } else {
      visorPrincipal.textContent += "%"
    }
  }
  AtualizarLblVisor()
}

function PositivarOuNegativar() {
  if (visorPrincipal.textContent[0] == "-")
    visorPrincipal.textContent = visorPrincipal.textContent.replace("-", "")
  else visorPrincipal.textContent = "-" + visorPrincipal.textContent
}
