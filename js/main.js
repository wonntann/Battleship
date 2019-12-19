$(function() {
    var playerBoard = [];
    var playerShips = [];
    var compBoard = [];
    var compShips = [];
    var compGuessBoard = [];
    init();

    function Ship(name, length, board){
        this.name = name;
        this.sunk = false;
        this.squares = [];
        this.board = board;

        this.place = function() {
           var placed = false;
           var vertical = Math.round(Math.random()) == 0;
           while(!placed) {
            if(vertical) {
                var c = Math.floor(Math.random() * this.board.length);
                var r = Math.floor(Math.random() * (this.board.length-length));
                for (var i=0; i < length; i++) {
                    this.squares.push([r + i, c]);
                    if(this.board[r+i][c] == "S") {
                        this.squares = [];
                        break;
                    }
                }
            } else { //Left off on 12/18/19

            }
           }
        }
    }

    function init() {
        playerBoard = [];

        compBoard = [];
        compGuessBoard = [];
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; i < 10; i++) {
                row.push("W");
                var id = i + "_" + j;
                $("#player").append("<div id='"+id+"' class='gridsquare'></div>");
                $("#computer").append("<div id='"+id+"' class='gridsquare'></div>");
                }
//           Add row to the player board
            playerBoard.push(row);
//          Add row to computer board
            compBoard.push(row.slice());
//           Add row to compGuessBoard board
            compGuessBoard.push(row.slice());
            }
        }
});