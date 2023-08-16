import { BOARD_SIZE } from "./consts";
import { checkWin } from "./utils";
function main() {
  // <div class="board" id="board" style="width: 400px; height: 400px;"></div>

  let board = document.createElement("div");
  board.className = "board";
  board.id = "board";
  board.style.width = "400px";
  board.style.height = "400px";

  for (let rindex = 0; rindex < BOARD_SIZE; rindex++) {
    let row = document.createElement("div");

    row.className = "boardRow";
    for (let cindex = 0; cindex < BOARD_SIZE; cindex++) {
      let boardCol = document.createElement("div");
      boardCol.className = "boardCol";
      boardCol.onmousedown = handleMouseDown;

      let cell = document.createElement("div");
      cell.className = "boardCell";
      cell.id = rindex + "-" + cindex;
      boardCol.appendChild(cell);
      row.appendChild(boardCol);
    }
    board.appendChild(row);
  }
  let panel = document.getElementById("panel-body");
  if (panel != null) panel.appendChild(board);

  var currValue = -1; // player - O, computer - X
  var gameOver = false;
  //number array number[0] - row, number[1] - column
  //initiate area
  var area = new Array(BOARD_SIZE);
  for (var i = 0; i < BOARD_SIZE; i++) {
    area[i] = new Array(BOARD_SIZE);
    for (var j = 0; j < BOARD_SIZE; j++) {
      area[i][j] = 0;
    }
  }
  function handleMouseDown(e) {
    var message = document.getElementById("message");
    var player = document.getElementById("player");
    if (gameOver) {
      if (message != null) {
        message.innerHTML = "Status - Game Over";
      }
      return;
    }

    if (message != null) {
      message.innerHTML = "Status - Inprogress";
    }
    var cell = e.target;

    // check class exist in the div element
    if (cell.firstChild.classList.contains("boardCellBlack")) return "";
    if (cell.firstChild.classList.contains("boardCellWhite")) return "";
    var indexes = cell.firstChild.id.split("-");
    var getedId = "" + indexes[0] + "-" + indexes[1];
    //  let element = document.getElementById(getedId);
    //      if (element != null && element.classList != null)
    //        element.className = deserve();
    //  } else
    currValue = currValue * -1;
    cell.firstChild.className = deserve(currValue);
    area[indexes[0]][indexes[1]] = currValue;
    function deserve(val) {
      if (val === 1) {
        // get element player
        var player = document.getElementById("player");
        if (player != null) {
          player.innerHTML = "Active Player: White";
        }
        return "boardCellBlack";
      } else {
        var player = document.getElementById("player");
        if (player != null) {
          player.innerHTML = "Active Player: Black";
        }
        return "boardCellWhite";
      }
    }
    let winState = checkWin(indexes[0], indexes[1], area);
    if (winState !== "") {
      var message = document.getElementById("message");
      if (message != null) {
        gameOver = true;
        if (message != null) {
          message.innerHTML = "Status - Game Over";
        }
        if (winState === "White Wins") {
          //message.addClass("looseState");

          if (player != null) {
            player.innerHTML = "Player: White Wins";
          }
          message.innerHTML = "Status - Game Over";
        } else {
          if (player != null) {
            player.innerHTML = "Player: Black Wins";
          }
        }
      }
    }
  }

  let reset = document.getElementById("newGame");
  if (reset != null) reset.onclick = handleNewGame;
  function handleNewGame(e) {
    var message = document.getElementById("message");
    var player = document.getElementById("player");
    //remove class from all cells
    let items = Array.from(document.querySelectorAll("[class$=White]"));
    items.map((cell) => {
      if(cell != null ){
        cell.className = "boardCell";
      }
    });
    items = Array.from(document.querySelectorAll("[class$=Black]"));
    items.map((cell) => {
      if(cell != null ){
        cell.className = "boardCell";
      }
    });

    gameOver = false;
    if (player != null) {
      player.innerHTML = "Active Player: Black";
    }
    if (message != null) {
      message.innerHTML = "Status: New Game";
    }
    //initiate area
    currValue = -1; // black  -1, white  1
    area = new Array(BOARD_SIZE);
    for (var i = 0; i < BOARD_SIZE; i++) {
      area[i] = new Array(BOARD_SIZE);
      for (var j = 0; j < BOARD_SIZE; j++) {
        area[i][j] = 0;
      }
    }
  }
}

main();
