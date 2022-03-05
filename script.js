//initial data
let tabela = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: ''
}

let turn = '';
let winner = '';

document.querySelector(".reset").addEventListener("click", reset)
document.querySelector(".area").addEventListener("click", play)

function play(event) {
  const { item } = event.srcElement.dataset
  tabela[item] = turn;
  event.srcElement.innerHTML = turn

  if (checkGameOver()) {
    printMessage("Fim de Jogo! Deu Velha!")
  } else {
    if (checkWinner(tabela)) {
      printMessage(`O Jogador ${winner} venceu!`);
      document.querySelector('.infocorpo.resultado').innerHTML = winner
    } else {
      const nextTurn = turn == "X" ? "O" : "X"
      setTurnLabel(nextTurn)
    }
  }
}

function printMessage(message) {
  setTimeout(() => {
    alert(message);
  }, 50)
}


function checkGameOver() {
  for (square in tabela) {
    if (tabela[square] == '') {
      return false;
    }
  }
  return true;
}

function checkWinner({ a1, a2, a3, b1, b2, b3, c1, c2, c3 }) {
  if (((a1 == a2 && a1 == a3) || (a1 == b1 && a1 == c1) || (a1 == b2 && a1 == c3)) && a1 != '') {
    winner = a1;
    return true;
  } else if (((b2 == b1 && b2 == b3) || (b2 == a2 && b2 == c2) || (b2 == c1 && b2 == a3)) && b2 != '') {
    winner = b2;
    return true;
  } else if (((c3 == c2 && c3 == c1) || (c3 == b3 && c3 == a3)) && c3 != '') {
    winner = c3;
    return true;
  }

  return false
}

function setTurnLabel(turnOf) {
  turn = turnOf;
  document.querySelector('.infocorpo.vez').innerHTML = turnOf;
}


function reset() {
  let random = Math.floor(Math.random() * 2);
  const turnOf = random === 1 ? "X" : "O";

  const squares = document.querySelector(".area").children;
  for (let i = 0; i < squares.length; i++) {
    const eachSquare = squares[i];
    tabela[eachSquare.dataset.item] = ''
    eachSquare.innerHTML = ''
  }

  document.querySelector('.infocorpo.resultado').innerHTML = "--"

  setTurnLabel(turnOf)
}

function initialize() {
  reset();
}

initialize();