$(function(){
  var playerX = new Player("X");
  var playerO = new Player("O");
  var board = new Board();
  var game = new Game();
  function fillSpace(x, y, output, players){
    if( board.space[x][y].mark === undefined){
      if(game.turn === "X"){
        board.space[x][y].spaceMark(playerX)
        $(output).html("<img src='img/X.png'>");
        game.turn = "O";
        game.turnCounter++;
      }
      else {
        if (players === 1) {
          computerMove();
          board.space[randOne][randTwo].spaceMark(playerO)
          debugger;
          $(output).html("<img src='img/o.png'>");
          game.turn = "X";
          game.turnCounter++;
        }
        else {
          board.space[x][y].spaceMark(playerO)
          $(output).html("<img src='img/o.png'>");
          game.turn = "X";
          game.turnCounter++;
        }
      }
      win(board.space,x,y);
    }
    if(game.turnCounter === 9){
      gameOver("Nobody");
    }
  }
  $("#start").click(function(){
    numPlayers = parseInt($('input[name="playerChoice"]:checked').val());
    for(var i=0; i<3; i++){
      for(var j=0; j<3; j++){
        board.space[i][j] = new Space(i,j);
      }
    }
  })
  $("#11").click(function(){fillSpace(0, 0, "#11output", numPlayers)});
  $("#12").click(function(){fillSpace(0, 1, "#12output", numPlayers)});
  $("#13").click(function(){fillSpace(0, 2, "#13output", numPlayers)});
  $("#21").click(function(){fillSpace(1, 0, "#21output", numPlayers)});
  $("#22").click(function(){fillSpace(1, 1, "#22output", numPlayers)});
  $("#23").click(function(){fillSpace(1, 2, "#23output", numPlayers)});
  $("#31").click(function(){fillSpace(2, 0, "#31output", numPlayers)});
  $("#32").click(function(){fillSpace(2, 1, "#32output", numPlayers)});
  $("#33").click(function(){fillSpace(2, 2, "#33output", numPlayers)});

});
// });


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
    $("body").html("<h1>congratulations, "+ player + " won!</h1>"
                  + "<br> <button type='button' id='playAgain' class='btn btn-primary'>Play Again!</button>");
    $("#playAgain").click(function() {
      location.reload(true)
    });
}


function computerMove() {
    randOne = Math.floor(Math.random()*3);
    randTwo = Math.floor(Math.random()*3);
  // var moveArray = [];
  // for(var i=0; i<3; i++){
  //   for(var j=0; j<3; j++){
  //     if(boardArray[i][j].mark === undefined) {
  //       moveArray.push(boardArray[i][j]);
  //     }
  //   }
  // }
  // moveArray[Math.floor(Math.random()*moveArray.length)];
}
