$(function(){
  var playerX = new Player("X");
  var playerO = new Player("O");
  var board = new Board();
  var game = new Game();

  $("#start").click(function(){
    numPlayers = parseInt($('input[name="playerChoice"]:checked').val());
    for(var i=0; i<3; i++){
      for(var j=0; j<3; j++){
        board.space[i][j] = new Space(i,j);
      }
    }
    $("#00").click(function(){fillSpace(0, 0, "#00output", numPlayers,board,game,playerX,playerO)});
    $("#01").click(function(){fillSpace(0, 1, "#01output", numPlayers,board,game,playerX,playerO)});
    $("#02").click(function(){fillSpace(0, 2, "#02output", numPlayers,board,game,playerX,playerO)});
    $("#10").click(function(){fillSpace(1, 0, "#10output", numPlayers,board,game,playerX,playerO)});
    $("#11").click(function(){fillSpace(1, 1, "#11output", numPlayers,board,game,playerX,playerO)});
    $("#12").click(function(){fillSpace(1, 2, "#12output", numPlayers,board,game,playerX,playerO)});
    $("#20").click(function(){fillSpace(2, 0, "#20output", numPlayers,board,game,playerX,playerO)});
    $("#21").click(function(){fillSpace(2, 1, "#21output", numPlayers,board,game,playerX,playerO)});
    $("#22").click(function(){fillSpace(2, 2, "#22output", numPlayers,board,game,playerX,playerO)});

  });

});

//business logic
function Space(x, y){
  this.x = x;
  this.y = y;
  this.mark;
}

Space.prototype.spaceMark = function(player){
  this.mark = player.name;
  return this.mark;
}

function Board(){
  this.space = [];
  for(var x = 0; x < 3; x++){
    this.space[x] = [];
  }
}

function Player(name){
  this.name = name;
}

Player.prototype.mark = function(){
  return this.name;
}

function Game(){
  this.turn = "X";
  this.turnCounter = 0;
}


function win(space,x,y){
  if(space[x][y].mark === space[x][(y+1)%3].mark && space[x][y].mark === space[x][(y+2)%3].mark){
    gameOver(space[x][y].mark);
  }
  else if(space[x][y].mark === space[(x+1)%3][y].mark && space[x][y].mark === space[(x+2)%3][y].mark){
    gameOver(space[x][y].mark);
  }
  else if(space[1][1].mark && space[1][1].mark === space[0][0].mark && space[1][1].mark === space[2][2].mark){
    gameOver(space[1][1].mark);
  }
  else if(space[1][1].mark && space[1][1].mark === space[0][2].mark && space[1][1].mark === space[2][0].mark){
    gameOver(space[1][1].mark);
  }
}

function fillSpace(x, y, output, players, board,game,playerX,playerO){
  if( board.space[x][y].mark === undefined){
    if(game.turn === "X"){
      board.space[x][y].spaceMark(playerX)
      $(output).html("<img src='img/X.png'>");
      game.turn = "O";
      game.turnCounter++;
      win(board.space,x,y);

      if (players === 1) {
        var randOne = x;
        var randTwo = y;
        if(game.turnCounter<9){
          while( board.space[randOne][randTwo].mark !== undefined){
            randOne = Math.floor(Math.random()*3);
            randTwo = Math.floor(Math.random()*3);
          }
          board.space[randOne][randTwo].spaceMark(playerO)
          var spaceID = randOne.toString() + randTwo.toString() + "output";
          $("#" + spaceID).html("<img src='img/o.png'>");
          game.turn = "X";
          game.turnCounter++;
          }
          win(board.space,randOne,randTwo);
      }
        else if (players === 0) {
          if(game.turnCounter === 1 && x === 0 && y === 0 || game.turnCounter === 1 && x === 0 && y === 2 || game.turnCounter === 1 && x === 2 && y === 0 || game.turnCounter === 1 && x === 2 && y === 2) {
            board.space[1][1].spaceMark(playerO)
            var spaceID = "1" + "1" + "output";
            $("#" + spaceID).html("<img src='img/o.png'>");
            game.turn = "X";
            game.turnCounter++;
            win(board.space,x,y);
          }
          else if(game.turnCounter === 1 && x === 1 && y === 1) {
            board.space[0][2].spaceMark(playerO)
            var spaceID = "0" + "2" + "output";
            $("#" + spaceID).html("<img src='img/o.png'>");
            game.turn = "X";
            game.turnCounter++;
            win(board.space,x,y);
          }
          else if(game.turnCounter === 1 && x === 1 && y === 0 || game.turnCounter === 1 && x === 0 && y === 1 || game.turnCounter === 1 && x === 2 && y === 1 || game.turnCounter === 1 && x === 1 && y === 2) {
            board.space[1][1].spaceMark(playerO)
            var spaceID = "1" + "1" + "output";
            $("#" + spaceID).html("<img src='img/o.png'>");
            game.turn = "X";
            game.turnCounter++;
            win(board.space,x,y);
          }
          else if (game.turnCounter > 1) {
            for (i =0; i <=2; i++) {
              for(j = 0; j <=2; j++) {
                if(board.space[i][j].mark ==="O" && board.space[i][(j+1)%3].mark === "O" && board.space[i][(j+2)%3].mark === undefined) {
                    board.space[i][(j+2)%3].spaceMark(playerO);
                    var spaceID = i.toString() + ((j+2)%3).toString() + "output";
                    $("#" + spaceID).html("<img src='img/o.png'>");
                    game.turn = "X";
                    game.turnCounter++;
                    win(board.space,i,(j+2)%3);
                    return;
                }
                else if(board.space[i][j].mark ==="O" && board.space[(i+1)%3][j].mark === "O" && board.space[(i+2)%3][j].mark === undefined) {
                    board.space[(i+2)%3][j].spaceMark(playerO);
                    var spaceID = ((i+2)%3).toString() + j.toString() + "output";
                    $("#" + spaceID).html("<img src='img/o.png'>");
                    game.turn = "X";
                    game.turnCounter++;
                    win(board.space,(i+2)%3,j);
                    return;
                }
                else if(board.space[i][j].mark ==="O" && board.space[(i+1)%3][(j+1)%3].mark === "O" && board.space[(i+2)%3][(j+2)%3].mark === undefined) {
                    board.space[(i+2)%3][(j+2)%3].spaceMark(playerO);
                    var spaceID = ((i+2)%3).toString() + ((j+2)%3).toString() + "output";
                    $("#" + spaceID).html("<img src='img/o.png'>");
                    game.turn = "X";
                    game.turnCounter++;
                    win(board.space,(i+2)%3,(j+2)%3);
                    return;
                }
                else if(board.space[i][j].mark ==="X" && board.space[i][(j+1)%3].mark === "X" && board.space[i][(j+2)%3].mark === undefined) {
                    board.space[i][(j+2)%3].spaceMark(playerO);
                    var spaceID = i.toString() + ((j+2)%3).toString() + "output";
                    $("#" + spaceID).html("<img src='img/o.png'>");
                    game.turn = "X";
                    game.turnCounter++;
                    win(board.space,i,(j+2)%3);
                    return;
                }
                else if(board.space[i][j].mark ==="X" && board.space[(i+1)%3][j].mark === "X" && board.space[(i+2)%3][j].mark === undefined ) {
                    board.space[(i+2)%3][j].spaceMark(playerO);
                    var spaceID = ((i+2)%3).toString() + j.toString() + "output";
                    $("#" + spaceID).html("<img src='img/o.png'>");
                    game.turn = "X";
                    game.turnCounter++;
                    win(board.space,(i+2)%3,j);
                    return;
                }
                else if(board.space[i][j].mark ==="X" && board.space[(i+1)%3][(j+1)%3].mark === "X" && board.space[(i+2)%3][(j+2)%3].mark === undefined) {
                    board.space[(i+2)%3][(j+2)%3].spaceMark(playerO);
                    var spaceID = ((i+2)%3).toString() + ((j+2)%3).toString() + "output";
                    $("#" + spaceID).html("<img src='img/o.png'>");
                    game.turn = "X";
                    game.turnCounter++;
                    win(board.space,(i+2)%3,(j+2)%3);
                    return;
                }
                else {
                  var randOne = x;
                  var randTwo = y;
                  if(game.turnCounter<9){
                    while( board.space[randOne][randTwo].mark !== undefined){
                      randOne = Math.floor(Math.random()*3);
                      randTwo = Math.floor(Math.random()*3);
                    }
                    board.space[randOne][randTwo].spaceMark(playerO);
                    var spaceID = randOne.toString() + randTwo.toString() + "output";
                    $("#" + spaceID).html("<img src='img/o.png'>");
                    game.turn = "X";
                    game.turnCounter++;
                    }
                    win(board.space,randOne,randTwo);
                    return;
                }
              }
            }
          }
        }
      }
      else {
        board.space[x][y].spaceMark(playerO)
        $(output).html("<img src='img/o.png'>");
        game.turn = "X";
        game.turnCounter++;
      }
  }
  if(game.turnCounter === 9){
    gameOver("Nobody");
  }
}

function gameOver(player){
    $("#results").html("<h1>congratulations, "+ player + " won!</h1>"
                  + "<br> <button type='button' id='playAgain' class='btn btn-primary'>Play Again!</button>");
    $("#playAgain").click(function() {
      location.reload(true)
    });
}
