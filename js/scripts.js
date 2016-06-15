$(function(){
  var playerX = new Player("X");
  var playerO = new Player("O");
  var board = new Board();
  var game = new Game();
  function fillSpace(x, y, output){
    if( board.space[x][y].mark === undefined){
      if(game.turn === "X"){
        $(output).text(board.space[x][y].spaceMark(playerX));
        game.turn = "O";
        game.turnCounter++;
      }
      else{
        $(output).text(board.space[x][y].spaceMark(playerO));
        game.turn = "X";
        game.turnCounter++;
      }
      win(board.space,x,y);
    }
    if(game.turnCounter === 9){
      gameOver("Nobody");
    }
  }
  $("#start").click(function(){
    for(var i=0; i<3; i++){
      for(var j=0; j<3; j++){
        board.space[i][j] = new Space(i,j);
      }
    }
  })
    $("#11").click(function(){fillSpace(0, 0, "#11output")});
    $("#12").click(function(){fillSpace(0, 1, "#12output")});
    $("#13").click(function(){fillSpace(0, 2, "#13output")});
    $("#21").click(function(){fillSpace(1, 0, "#21output")});
    $("#22").click(function(){fillSpace(1, 1, "#22output")});
    $("#23").click(function(){fillSpace(1, 2, "#23output")});
    $("#31").click(function(){fillSpace(2, 0, "#31output")});
    $("#32").click(function(){fillSpace(2, 1, "#32output")});
    $("#33").click(function(){fillSpace(2, 2, "#33output")});
});

//business logic
function Space(x, y){
  this.x = x;
  this.y = y;
  this.mark;
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

function Game(){
  this.turn = "X";
  this.over = 0;
  this.turnCounter = 0;
}

Player.prototype.mark = function(){
  return this.name;
}

Space.prototype.spaceMark = function(player){
  this.mark = player.name;
  return this.mark;
}

Space.prototype.markBy = function(){
  return this.mark;
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

function gameOver(player){
    $("body").html("<h1>congratulations, "+ player + " won!</h1>");
}
