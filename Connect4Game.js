var rowCount = 6;
var colCount = 7;

var player1Name = "";
var player2Name = "";

$(document).ready(function () {
    // Empty on OK or Cancel
    while (player1Name === "" || player1Name == null) {
        player1Name = prompt("Player One: Enter your Name; you are Blue");
    }

    while (player2Name === "" || player2Name == null) {
        player2Name = prompt("Player Two: Enter your Name, you are Red");
    }

    $("h3").text(player1Name + ": it is your turn. Pick a column to drop in!")
})

var colorToMatch = "rgb(128, 128, 128)";

var currentPlayer = 1;
var currentColor = "blue";
var currentPlayerName = player1Name;

function changeCellColor(row, col, color) {
    return $("table tr").eq(row).find("td").eq(col).css('background-color', color);
}

function getCellColor(rowIndex, colIndex) {
    return $("table tr").eq(rowIndex).find("td").eq(colIndex).css('background-color');
}

function getNextCell(col) {
    for (var row = rowCount-1; row > -1; row--) {
        var color = getCellColor(row, col);
        if (color === colorToMatch) {
            return row;
        }
    }
}

function is4Connected(color1, color2, color3, color4) {
    return (color1 !== colorToMatch && 
        color1 === color2 && 
        color1 === color3 && 
        color1 === color4
        );
}

function reportWinner(playerName) {
    $("h1").text(playerName + ": You have won!");
    $("h2").fadeOut("slow");
    $("h3").fadeOut("slow");
    $("table").fadeOut("slow");
}

function isFourConnectedHorizontal() {
    for (var row = 0; row < rowCount; row++) {
        for (var col = 0; col < colCount-3; col++) {
            if (is4Connected(getCellColor(row, col), getCellColor(row, col+1), getCellColor(row, col+2), getCellColor(row, col+3))) {
                return true;
            }
        }
    }

    return false;
}

function isFourConnectedVertical() {
    for (var col = 0; col < colCount; col++) {
        for (var row = 0; row < rowCount-3; row++) {
            if (is4Connected(getCellColor(row, col), getCellColor(row+1, col), getCellColor(row+2, col), getCellColor(row+3, col))) {
                return true;
            }
        }
    }

    return false;
}

function isFourConnectedDiagonal() {
    // Check negative slope
    for (var row = 0; row < rowCount; row++) {
        for (var col = 0; col < colCount-3; col++) {
            if (is4Connected(getCellColor(row, col), getCellColor(row+1, col+1), getCellColor(row+2, col+2), getCellColor(row+3, col+3))) {
                return true;
            }
        }
    }

    // Check positive slope
    for (var row = rowCount-1; row >= 0; row--) {
        for (var col = 0; col < colCount-3; col++) {
            if (is4Connected(getCellColor(row, col), getCellColor(row-1, col+1), getCellColor(row-2, col+2), getCellColor(row-3, col+3))) {
                return true;
            }
        }
    }

    return false;
}

$('td').on('click', function () {
    if (currentPlayer === 1) {
        var col = $(this).closest("td").index();
        var row = getNextCell(col);
        changeCellColor(row, col, currentColor);
        
        if (isFourConnectedHorizontal() || isFourConnectedVertical() || isFourConnectedDiagonal()) {
            reportWinner(currentPlayerName);
            return;
        }

        currentPlayer = 2;
        currentColor = "red";
        currentPlayerName = player2Name;
        $("h3").text(currentPlayerName + ": it is your turn.");
        
    }
    else {
        var col = $(this).closest("td").index();
        var row = getNextCell(col);
        changeCellColor(row, col, currentColor);
        
        if (isFourConnectedHorizontal() || isFourConnectedVertical() || isFourConnectedDiagonal()) {
            reportWinner(currentPlayerName);
            return; 
        }

        currentPlayer = 1;
        currentColor = "blue";
        currentPlayerName = player1Name;
        $("h3").text(currentPlayerName + ": it is your turn.");
        
    }
})