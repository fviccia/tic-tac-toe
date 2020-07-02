let playerFactory = (number, name) => {
  let greeting = 'Hi ' + name + ' now you are player number ' + number; 
  return { number, name, greeting};
};

let Players = (function () {
  let playerOne;
  let playerTwo;
  function _askForNames(){
    Players.playerOne = playerFactory(1, prompt('Please enter player one name.', 'Player One'));
    alert(Players.playerOne.greeting);
    Players.playerTwo = playerFactory(2, prompt('Please enter player two name.', 'Player Two'));
    alert(Players.playerTwo.greeting);
    DisplayController._showPlayers();
  };
  return {playerOne, playerTwo, _askForNames};
})();

let DisplayController = (function() {
  let showPlayerOne = document.getElementById('playerOne');
  let showPlayerOneMarker = document.getElementById('playerOneMarker');
  let showPlayerTwo = document.getElementById('playerTwo');
  let showPlayerTwoMarker = document.getElementById('playerTwoMarker');
  let showWinner = document.getElementById('showWinner');
  let start = document.getElementById('start');

  function _showPlayers() {
    showPlayerOne.innerHTML = Players.playerOne.name;
    showPlayerOneMarker.innerHTML = 'X';
    showPlayerTwo.innerHTML = Players.playerTwo.name;
    showPlayerTwoMarker.innerHTML = 'O';
  }
  function _render() {
    for (let i = 0; i < GameBoard.board.length; i++) {
      document.getElementById(i).innerHTML = GameBoard.board[i];
    }
  };
  function _showWinner() {
    showWinner.innerHTML = GameFlow.winner;
  }
  function _restart(params) {
    if (GameFlow.gameOver == false) {
      start.innerHTML = 'Re Start Game';
    }
  }

  return {_render, _showPlayers,_showWinner, _restart};
})();

function clicked (box) {
  let playerMark;
  if (GameFlow.gameOver == false){
  if (GameFlow.playerOneTurn) {
    playerMark = 'X';
  } else {
    playerMark = 'O';
  };

  if (GameBoard.board[box] == ''){
    GameBoard.board[box] = playerMark;
  };
  }
  GameFlow.playerOneTurn = !GameFlow.playerOneTurn; 
  DisplayController._render();
  checkWinner();
};

let GameFlow = (function () {
  let playerOneTurn = true;
  let gameOver = true;
  let winner = "";
  function _startGame() {
    GameFlow.gameOver = false;
    if (GameFlow.winner == ""){
      Players._askForNames();
    }
    if (GameFlow.winner != "") {
      GameFlow.playerOneTurn = true;
      GameFlow.winner = "";
      GameBoard._reset();
      DisplayController._render();
      DisplayController._showWinner();
    }
    DisplayController._restart();
  }

  return {playerOneTurn, gameOver, winner, _startGame};
})();

let GameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];
  function _reset() {
    GameBoard.board = ['', '', '', '', '', '', '', '', ''];
  };
  return {board, _reset};
})();


function checkWinner () {
  if (
    (GameBoard.board[0] == 'X' && GameBoard.board[3] == 'X' && GameBoard.board[6] == 'X') ||
    (GameBoard.board[1] == 'X' && GameBoard.board[4] == 'X' && GameBoard.board[7] == 'X') ||
    (GameBoard.board[2] == 'X' && GameBoard.board[5] == 'X' && GameBoard.board[8] == 'X') ||
    (GameBoard.board[0] == 'X' && GameBoard.board[1] == 'X' && GameBoard.board[2] == 'X') ||
    (GameBoard.board[3] == 'X' && GameBoard.board[4] == 'X' && GameBoard.board[5] == 'X') ||
    (GameBoard.board[6] == 'X' && GameBoard.board[7] == 'X' && GameBoard.board[8] == 'X') ||
    (GameBoard.board[0] == 'X' && GameBoard.board[4] == 'X' && GameBoard.board[8] == 'X') ||
    (GameBoard.board[2] == 'X' && GameBoard.board[4] == 'X' && GameBoard.board[6] == 'X')
    ){  
      GameFlow.winner = "Congratulations " + Players.playerOne.name + " it's the winner!";
      GameFlow.gameOver = true;
    } else if (
    (GameBoard.board[0] == 'O' && GameBoard.board[3] == 'O' && GameBoard.board[6] == 'O') ||
    (GameBoard.board[1] == 'O' && GameBoard.board[4] == 'O' && GameBoard.board[7] == 'O') ||
    (GameBoard.board[2] == 'O' && GameBoard.board[5] == 'O' && GameBoard.board[8] == 'O') ||
    (GameBoard.board[0] == 'O' && GameBoard.board[1] == 'O' && GameBoard.board[2] == 'O') ||
    (GameBoard.board[4] == 'O' && GameBoard.board[3] == 'O' && GameBoard.board[5] == 'O') ||
    (GameBoard.board[6] == 'O' && GameBoard.board[7] == 'O' && GameBoard.board[8] == 'O') ||
    (GameBoard.board[0] == 'O' && GameBoard.board[4] == 'O' && GameBoard.board[8] == 'O') ||
    (GameBoard.board[2] == 'O' && GameBoard.board[4] == 'O' && GameBoard.board[6] == 'O')
    ){
      GameFlow.winner = "Congratulations " + Players.playerTwo.name + " it's the winner!";
      GameFlow.gameOver = true;
    } else if (
      GameBoard.board[0] != '' &&
      GameBoard.board[1] != '' &&
      GameBoard.board[2] != '' &&
      GameBoard.board[3] != '' &&
      GameBoard.board[4] != '' &&
      GameBoard.board[5] != '' &&
      GameBoard.board[6] != '' &&
      GameBoard.board[7] != '' &&
      GameBoard.board[8] != ''
    ){
      GameFlow.winner = "The game it's a Tie";
      GameFlow.gameOver = true;
    }
    if (GameFlow.winner != '') {
      DisplayController._showWinner();
    }
}   

