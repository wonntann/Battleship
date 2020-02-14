$(function () {
    var playerBoard = [];
    var playerShips = [];
    var compBoard = [];
    var compHits = [];
    var compGuessBoard = [];
    var compShips = [];
    var playerTurn = true;
    var turnDelay = 2000;
    init();

    function Ship(name, length, board) {
        this.name = name;
        this.sunk = false;
        this.squares = [];
        this.board = board;
        this.place = function () {
            var placed = false;
            var vertical = Math.round(Math.random()) == 0;
            while (!placed) {
                if (vertical) {
                    var c = Math.floor(Math.random() * this.board.length);
                    var r = Math.floor(Math.random() * (this.board.length - length));
                    for (var i = 0; i < length; i++) {
                        this.squares.push([r + i, c]);
                        if (this.board[r + i][c] == "S") {
                            this.squares = [];
                            break;
                        }
                    }
                } else {
                    var r = Math.floor(Math.random() * this.board.length);
                    var c = Math.floor(Math.random() * (this.board.length - length));
                    for (var i = 0; i < length; i++) {
                        this.squares.push([r, c + i]);
                        if (this.board[r][c + i] == "S") {
                            this.squares = [];
                            break;
                        }
                    }
                }
                if (this.squares.length == length) {
                    placed = true;
                    for (var i = 0; i < this.squares.length; i++) {
                        var r = this.squares[i][0];
                        var c = this.squares[i][1];
                        this.board[r][c] = "S";
                    }
                }
            }
        } /* End function Ship */

        /*#### Add function checkSunk 1/15/20 ##### */
        /* How to tell if the ship is sunk*/

        this.checkSunk = function () {
            /* Iterates through the ship's list of quares and checks the cooresponding position in the board */
            for (var i = 0; i < this.squares.length; i++) {
                var r = this.squares[i][0];
                var c = this.squares[i][1];
                if (this.board[r][c] === "S") {
                    return false;
                }
            }
            /* If a square's value indicates part of a ship, we  know that the ship is not sunk and returns false */
            this.sunk = true;
            return true;
        }
        this.place();
    }

    function drawBoard(board, player) {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                var color = "#1ad1ff";
                if (board[i][j] == "S" && player === "player") {
                    color = "gray";
                } /* Use different colors to indicate hits and misses */
                else if (board[i][j] == "H") {
                    color = "#e60000";
                } else if (board[i][j] == "M") {
                    color = "#ffff1a";
                }
                $("#" + player + " > #" + i + "_" + j).css("background-color", color);
            }
        }
    }
    /* Function to see checkWon */
    function checkWon(ships) {
        for (var i = 0; i < ships.length; i++) {
            if (!ships[i].sunk) {
                return false;
            }
        }
        return true;
    }


    /* Function compTurn for computer turn */
    function compTurn() {
        var r = 0;
        var c = 0;
        do {
            if (compHits.length >= 1) {
                var idx = Math.floor(Math.random() * compHits.length);
                do {
                    r = compHits[idx][0];
                    c = compHits[idx][1];
                    switch (Math.floor(Math.random() * 4)) {
                        case 0:
                            r++;
                            break;
                        case 1:
                            r--;
                            break;
                        case 2:
                            c++;
                            break;
                        case 3:
                            c--;
                            break;
                    }
                } while (r < 0 || c < 0 || r >= compGuessBoard.length || c >= compGuessBoard.length)
            } else {
                r = Math.floor(Math.random() * compGuessBoard.length);
                c = Math.floor(Math.random() * compGuessBoard.length);
            }
        } while (compGuessBoard[r][c] !== "W")
        if (playerBoard[r][c] === "S") {
            playerBoard[r][c] = "H";
            compGuessBoard[r][c] = "H";
            compHits.push([r, c]);
            $('#ptext').html("Hit!");
            for (var i = 0; i < playerShips.length; i++) {
                if (!playerShips[i].sunk && playerShips[i].checkSunk()) {
                    $('#ptext').html("Your " + playerShips[i].name + " was sunk!");
                    for (var j = 0; j < playerShips[i].squares.length; j++) {
                        var r = playerShips[i].squares[j][0];
                        var c = playerShips[i].squares[j][1];
                        for (var k = 0; k < compHits.length; k++) {
                            if (compHits[k][0] === r && compHits[k][1] === c) {
                                compHits.splice(k, 1);
                                break;
                            }
                        }
                    }
                    break;
                }
            }
        } else /* ############### Ended off on class 2/5/2020 ###########*/ {
            playerBoard[r][c] = "M";
            compGuessBoard[r][c] = "M";
            $('#ptext').html("Miss!");
        }
        drawBoard(playerBoard, "player");
        if (checkWon(playerShips)) {
            $("#main-text").html("The computer wins!")
        } else {
            setTimeout(function () {
                if (turnDelay > 0) {
                    $('#ptext').html("")
                };
                playerTurn = true;
            }, turnDelay);
        }
    }

    function init() {
        playerTurn = true;
        playerBoard = [];
        playerShips = [];
        compBoard = [];
        compGuessBoard = [];
        compShips = [];
        compHits = [];
        $(".gridsquare").remove();
        $('#ptext').html("Your Grid");
        $('#ctext').html("Enemy Grid");
        $("#main-text").html("Sink Your Opponent's Ships!");
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push("W");
                var id = i + "_" + j;
                $("#player").append("<div id='" + id + "' class='gridsquare'><div>");
                $("#computer").append("<div id='" + id + "' class='gridsquare'><div>");
            }
            //           Add row to the player board
            playerBoard.push(row);
            //          Add row to computer board
            compBoard.push(row.slice());
            //           Add row to compGuessBoard board
            compGuessBoard.push(row.slice());
        }
        /* Ended off class 1/8/20 */
        playerShips.push(new Ship("Carrier", 5, playerBoard));
        playerShips.push(new Ship("Battleship", 4, playerBoard));
        playerShips.push(new Ship("Cruiser", 3, playerBoard));
        playerShips.push(new Ship("Submarine", 3, playerBoard));
        playerShips.push(new Ship("Destroyer", 2, playerBoard));
        compShips.push(new Ship("Carrier", 5, compBoard));
        compShips.push(new Ship("Battleship", 4, compBoard));
        compShips.push(new Ship("Cruiser", 3, compBoard));
        compShips.push(new Ship("Submarine", 3, compBoard));
        compShips.push(new Ship("Destroyer", 2, compBoard));

        drawBoard(playerBoard, "player");
/* Click Event on class gridSquare */
        $("#computer > .gridsquare").click(function () {
            if (playerTurn) {
                var id = $(this).attr("id").split("_");
                var r = parseInt(id[0]);
                var c = parseInt(id[1]);
                /******#### END 1/22 ####*****/
                if (compBoard[r][c] === "H" || compBoard[r][c] === "M") {
                    return;
                }
                playerTurn = false;
                if (compBoard[r][c] === "S") {
                    compBoard[r][c] = "H";
                    $('#ctext').html("Hit!");
                    for (var i = 0; i < compShips.length; i++) {
                        if (!compShips[i].sunk && compShips[i].checkSunk()) {
                            $('#ctext').html("You sunk my " + compShips[i].name + "!");
                            break;
                        }
                    }
                } else {
                    compBoard[r][c] = "M";
                    $('#ctext').html("Miss!");
                }
                drawBoard(compBoard, "computer");
                if (checkWon(compShips)) {
                    $("#main-text").html("You win!")
                } else {
                    setTimeout(function () {
                        if (turnDelay > 0) {
                            $('#ctext').html("")
                        };
                        compTurn();
                    }, turnDelay);
                }
            }
        });
    }

    $("#delay-btn").click(function () {
        var text = $(this).html();
    });
});
