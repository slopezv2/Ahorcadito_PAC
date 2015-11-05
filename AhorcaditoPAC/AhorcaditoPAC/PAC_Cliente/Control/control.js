var palabras = [];
var chosenWord = "";
var ayuda = "";
var chars = [''];
var timeFail = 0;
$(document).ready(function () {
    //alert("Antes");
    $.ajax({
        url: "../Abstraccion/palabras.json",
        dataType: "text",
        success: function (data) {
            palabras = $.parseJSON(data);
        }
    });
    alert();
    startGame(); 
    document.getElementById("btHelp").addEventListener("click", displayHelp, false);
    document.getElementById("btTry").addEventListener("click", checkInput, false);
});

function startGame() {
    var numPalabras = palabras.length;
    var wordIndex = Math.floor(Math.random() * (numPalabras - 1));
    chosenWord = palabras[wordIndex].palabra;
    ayuda = palabras[wordIndex].ayuda;
    drawSpace();
}
function displayHelp() {
   alert(ayuda);
}
function doYouWin() {
    for (var i = 0; i < chosenWord.length; i++) {
        if (chars.indexOf(chosenWord.charAt(i)) == -1 && chosenWord.charAt(i) != ' ') {
            return false;
        }
    }
    return true;
}
function checkInput() {
        var ch = $('#letter').prop("value");
        if (chosenWord.indexOf(ch) != -1) {
            if (chars.indexOf(ch) == -1 && ch != ' ') {
                drawLetter(ch);
                chars.push(ch);
            }
            if (doYouWin()) {
                displayVictory();
            }
        } else {
            timeFail++;
            drawWrong(timeFail);
        }
        $('#letter').val("");
    
}
function displayVictory() {
    alert("Muy bien, ganaste");
}
function drawSpace() {
    var canvas = document.getElementById("myCanvas");
    var cWidth = canvas.width / 2;
    var cHeight = canvas.height / 2;
    var ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.beginPath();
    var j = 0;
    for (var i = 0; i < chosenWord.length; i++) {
        cWidth += j * 20;
        if (cWidth >= canvas.width) {
            cWidth = canvas.width / 2;
            cHeight += 40;
            j = 0;
        }
        if (chosenWord.charAt(i) != ' ') {
            ctx.fillText("_", cWidth, cHeight);
        }
        j++;
    }
    ctx.stroke();
}

function drawWrong(time) {
    var canvas = document.getElementById("myCanvas");
    var cWidth = canvas.width;
    var cHeight = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    switch (time) {
        case 1:
            ctx.strokeStyle = 'black';
            ctx.moveTo(cWidth / 8, cWidth);
            ctx.lineTo(cWidth / 8, cWidth - 100);
            posX = cWidth / 8;
            posY = cWidth - 100
            break;
        case 2:
            ctx.strokeStyle = 'black';
            ctx.moveTo(posX, posY - 2);
            ctx.lineTo(posX, posY - 102);
            posY = posY - 102;
            break;
        case 3:
            ctx.strokeStyle = 'black';
            ctx.moveTo(posX + 2, posY);
            ctx.lineTo(posX + 52, posY);
            posX = posX + 52;
            break;
        case 4:
            ctx.strokeStyle = 'black';
            ctx.moveTo(posX, posY + 2);
            ctx.lineTo(posX, posY + 52);
            posY = posY + 52;
            break;
        case 5:
            var img = document.getElementById("deathImage");
            ctx.drawImage(img, posX - 24, posY + 2, 48, 108);
            alert("No eras tan bueno como creias");
            playing = false;
            break;
    };
    ctx.stroke();
}

function drawLetter(character) {
    var canvas = document.getElementById("myCanvas");
    var cWidth = canvas.width / 2;
    var cHeight = canvas.height / 2;
    var ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.beginPath();
    var j = 0;
    for (var i = 0; i < chosenWord.length; i++) {
        cWidth += (j * 20);
        if (cWidth >= canvas.width) {
            cWidth = canvas.width / 2;
            cHeight += 40;
            j = 0;
        }
        if (character == chosenWord.charAt(i)) {
            ctx.fillText(character, cWidth, cHeight - 2);
        }
        j++;
    }
    ctx.stroke();
}

