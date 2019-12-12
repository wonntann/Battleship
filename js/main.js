$(function() {
    var playerBoard = [];
    var compBoard = [];
    var compGuessBoard = [];
    init();

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
//           Add row to the player board
//           Add row to computer board
//           Add row to compGuessBoard board
            }
        }
    }
});