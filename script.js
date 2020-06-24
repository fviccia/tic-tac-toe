let GameBoard = (function () {
  let gameBoard = [];
})();

let Players = (function () {
  let playerOneName = '';
  let playerTwoName = '';
})();

let GameFlow = (function () {

})();

let DisplayController = (function() {
  
})();

let playerFactory = (number, name) => {
  let greeting = 'Hi ' + name + ' now you are player number ' + number; 
  return { number, name, greeting};
};