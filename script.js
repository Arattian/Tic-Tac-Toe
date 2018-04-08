let gameArr = [[-1, -1, -1],
               [-1, -1, -1],
               [-1, -1, -1]]; // 3x3 array (-1 === not clicked tale)
let plvspl = document.getElementById('plvspl');
let plvspc = document.getElementById('plvspc');
let currentPlayer = "Player1";

// default gameMod player vs player
let gameMod = 0;

//plvspl mode variables
let t = 1;

//plvspc mode variables
let move = 0;
let cornerTales = [0, 2, 6, 8];

plvspl.addEventListener('click', function () {
    reset('plvspl');
});
plvspc.addEventListener('click', function () {
    reset('plvspc');
});

//reset's all changes and change game mod
function reset(mod) {
    if (document.getElementById("winner").innerHTML === "") {
        let clear = document.getElementsByTagName('I');
        for (let i = 0; i < clear.length; i++) {
            clear[i].classList.remove('show');
            clear[i].classList.add('hidden');
        }
        gameArr = [[-1, -1, -1],
                   [-1, -1, -1],
                   [-1, -1, -1]];
        currentPlayer = "Player1";
        t = 1;
        move = 0;
        if (mod === 'plvspl') {
            gameMod = 0;
        } else if (mod === 'plvspc') {
            gameMod = 1;
        }
    }
}

//adding event listeners for click event and hover effect's on different game modes
let shape = document.getElementsByClassName('shape');
for (let i = 0; i < shape.length; i++) {
    shape[i].addEventListener('mouseover', function () {
        let elem = shape[i].getElementsByTagName("i");
        if (gameMod === 0) {
            if (t === 1 && elem[0].classList.contains("hidden") && elem[1].classList.contains("hidden")) {
                elem[0].classList.add("show");
            } else if (t === 0 && elem[0].classList.contains("hidden") && elem[1].classList.contains("hidden")) {
                elem[1].classList.add("show");
            }
        } else {
            if (elem[0].classList.contains("hidden") && elem[1].classList.contains("hidden")) {
                elem[0].classList.add("show");
            }
        }
    })
    shape[i].addEventListener('mouseout', function () {
        let elem = shape[i].getElementsByTagName("i");
        if (gameMod === 0) {
            if (t === 1 && elem[0].classList.contains("hidden") && elem[1].classList.contains("hidden")) {
                elem[0].classList.remove("show");
            } else if (t === 0 && elem[0].classList.contains("hidden") && elem[1].classList.contains("hidden")) {
                elem[1].classList.remove("show");
            }
        } else {
            if (elem[0].classList.contains("hidden") && elem[1].classList.contains("hidden")) {
                elem[0].classList.remove("show");
            }
        }
    })
    shape[i].addEventListener('click', function () {
        game(shape[i], i);
    })
}


function game(div, taleNumber) {
    let y = div.getElementsByTagName("I");
    if (gameMod === 0) {
        if (t === 1 && y[1].classList.contains("hidden")) {
            y[0].classList.remove("hidden");
            currentPlayer = "Player1";
            t = 0; //=> x;
        } else if (t === 0 && y[0].classList.contains("hidden")) {
            y[1].classList.remove("hidden");
            currentPlayer = "Player2";
            t = 1; //=> o;
        }
        matrix(taleNumber, t);
    } else if (gameMod === 1) {
        if (y[0].classList.contains("hidden") && y[1].classList.contains("hidden")) {
            y[0].classList.remove("hidden");
            matrix(taleNumber, 1);
            currentPlayer = "Player";
            if (checkWinner() === true) {
                return true;
            }
            if (move < 4) {
                aiTurn();
            }
        }
    }
}

function matrix(taleNumber, t) {

    //making 3x3 matrix

    switch (taleNumber) {
        case 0:
            gameArr[0][0] = t;
            break;
        case 1:
            gameArr[0][1] = t;
            break;
        case 2:
            gameArr[0][2] = t;
            break;
        case 3:
            gameArr[1][0] = t;
            break;
        case 4:
            gameArr[1][1] = t;
            break;
        case 5:
            gameArr[1][2] = t;
            break;
        case 6:
            gameArr[2][0] = t;
            break;
        case 7:
            gameArr[2][1] = t;
            break;
        case 8:
            gameArr[2][2] = t;
            break;
    }
    checkWinner();
    return gameArr;
}

function aiTurn() {
    let y = document.getElementsByClassName("shape");
    if (move === 0) {
        if (gameArr[0][0] === 1 || gameArr[0][2] === 1 || gameArr[2][0] === 1 || gameArr[2][2] === 1) {
            y[4].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(4, 0);
            move++;
        } else {
            switch (true) {
                case gameArr[0][1] === 1:
                    y[0].getElementsByTagName("i")[1].classList.remove("hidden");
                    matrix(0, 0);
                    break;
                case gameArr[2][1] === 1:
                    y[1].getElementsByTagName("i")[1].classList.remove("hidden");
                    matrix(1, 0);
                    break;
                case gameArr[1][0] === 1:
                    y[0].getElementsByTagName("i")[1].classList.remove("hidden");
                    matrix(0, 0);
                    break;
                case gameArr[1][2] === 1:
                    y[2].getElementsByTagName("i")[1].classList.remove("hidden");
                    matrix(2, 0);
                    break;
                case gameArr[1][1] === 1:
                    r = Math.floor(Math.random() * 4);
                    y[cornerTales[r]].getElementsByTagName("i")[1].classList.remove("hidden");
                    matrix(cornerTales[r], 0);
                    break;
            }
            move++;
        }

    } else {
        currentPlayer = "Computer";
        aiMove();
        move++;
    }
}

function aiMove() {
    let y = document.getElementsByClassName("shape");

    //computer attack

    switch (true) {
        //alternative attack strategy
        case gameArr[0][0] === 1 && gameArr[2][1] === 1 && move === 1 && gameArr[1][1] === 0:
            y[3].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(3, 0);
            return;
        case gameArr[0][2] === 1 && gameArr[2][1] === 1 && move === 1 && gameArr[1][1] === 0:
            y[5].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(5, 0);
            return;
        case gameArr[2][0] === 1 && gameArr[0][1] === 1 && move === 1 && gameArr[1][1] === 0:
            y[0].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(0, 0);
            return;
        case gameArr[2][2] === 1 && gameArr[0][1] === 1 && move === 1 && gameArr[0][0] != 0:
            y[0].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(0, 0);
            return;

        case gameArr[0][0] === 0 && gameArr[0][1] === 0 && gameArr[0][2] != 1:
            y[2].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(2, 0);
            return;
        case gameArr[0][1] === 0 && gameArr[0][2] === 0 && gameArr[0][0] != 1:
            y[0].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(0, 0);
            return;
        case gameArr[1][0] === 0 && gameArr[1][1] === 0 && gameArr[1][2] != 1:
            y[5].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(5, 0);
            return;
        case gameArr[1][1] === 0 && gameArr[1][2] === 0 && gameArr[1][0] != 1:
            y[3].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(3, 0);
            return;
        case gameArr[2][0] === 0 && gameArr[2][1] === 0 && gameArr[2][2] != 1:
            y[8].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(8, 0);
            return;
        case gameArr[2][1] === 0 && gameArr[2][2] === 0 && gameArr[2][0] != 1:
            y[6].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(6, 0);
            return;
            //check col 2-x
        case gameArr[0][0] === 0 && gameArr[1][0] === 0 && gameArr[2][0] != 1:
            y[6].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(6, 0);
            return;
        case gameArr[1][0] === 0 && gameArr[2][0] === 0 && gameArr[0][0] != 1:
            y[0].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(0, 0);
            return;
        case gameArr[0][1] === 0 && gameArr[1][1] === 0 && gameArr[2][1] != 1:
            y[7].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(7, 0);
            return;
            break;
        case gameArr[1][1] === 0 && gameArr[2][1] === 0 && gameArr[0][1] != 1:
            y[1].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(1, 0);
            return;
        case gameArr[0][2] === 0 && gameArr[1][2] === 0 && gameArr[2][2] != 1:
            y[8].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(8, 0);
            return;
        case gameArr[1][2] === 0 && gameArr[2][2] === 0 && gameArr[0][2] != 1:
            y[2].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(2, 0);
            return;
            //check diagonal
        case gameArr[0][0] === 0 && gameArr[1][1] === 0 && gameArr[2][2] != 1:
            y[8].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(8, 0);
            return;
        case gameArr[1][1] === 0 && gameArr[2][2] === 0 && gameArr[0][0] != 1:
            y[0].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(0, 0);
            return;
        case gameArr[0][2] === 0 && gameArr[1][1] === 0 && gameArr[2][0] != 1:
            y[6].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(6, 0);
            return;
        case gameArr[1][1] === 0 && gameArr[2][0] === 0 && gameArr[0][2] != 1:
            y[2].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(2, 0);
            return;
            //check corners
        case gameArr[0][0] === 0 && gameArr[0][2] === 0 && gameArr[0][1] != 1:
            y[1].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(1, 0);
            return;
        case gameArr[1][0] === 0 && gameArr[1][2] === 0 && gameArr[1][1] != 1:
            y[4].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(4, 0);
            return;
        case gameArr[2][0] === 0 && gameArr[2][2] === 0 && gameArr[2][1] != 1:
            y[7].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(7, 0);
            return;
        case gameArr[0][0] === 0 && gameArr[0][2] === 0 && gameArr[0][1] != 1:
            y[3].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(3, 0);
            return;
        case gameArr[0][1] === 0 && gameArr[2][1] === 0 && gameArr[1][1] != 1:
            y[4].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(4, 0);
            return;
        case gameArr[0][2] === 0 && gameArr[2][2] === 0 && gameArr[1][2] != 1:
            y[5].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(5, 0);
            return;
    }

    //computer defence

    switch (true) {
        case gameArr[0][0] === 1 && gameArr[0][1] === 1 && gameArr[0][2] != 0:
            y[2].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(2, 0);
            return;
        case gameArr[0][1] === 1 && gameArr[0][2] === 1 && gameArr[0][0] != 0:
            y[0].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(0, 0);
            return;
        case gameArr[1][0] === 1 && gameArr[1][1] === 1 && gameArr[1][2] != 0:
            y[5].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(5, 0);
            return;
        case gameArr[1][1] === 1 && gameArr[1][2] === 1 && gameArr[1][0] != 0:
            y[3].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(3, 0);
            return;
        case gameArr[2][0] === 1 && gameArr[2][1] === 1 && gameArr[2][2] != 0:
            y[8].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(8, 0);
            return;
        case gameArr[2][1] === 1 && gameArr[2][2] === 1 && gameArr[2][0] != 0:
            y[6].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(6, 0);
            return;
            //check col 2-x
        case gameArr[0][0] === 1 && gameArr[1][0] === 1 && gameArr[2][0] != 0:
            y[6].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(6, 0);
            return;
        case gameArr[1][0] === 1 && gameArr[2][0] === 1 && gameArr[0][0] != 0:
            y[0].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(0, 0);
            return;
        case gameArr[0][1] === 1 && gameArr[1][1] === 1 && gameArr[2][1] != 0:
            y[7].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(7, 0);
            return;
        case gameArr[1][1] === 1 && gameArr[2][1] === 1 && gameArr[0][1] != 0:
            y[1].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(1, 0);
            return;
        case gameArr[0][2] === 1 && gameArr[1][2] === 1 && gameArr[2][2] != 0:
            y[8].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(8, 0);
            return;
        case gameArr[1][2] === 1 && gameArr[2][2] === 1 && gameArr[0][2] != 0:
            y[2].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(2, 0);
            return;
            //check diagonal
        case gameArr[0][0] === 1 && gameArr[1][1] === 1 && gameArr[2][2] != 0:
            y[8].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(8, 0);
            return;
        case gameArr[1][1] === 1 && gameArr[2][2] === 1 && gameArr[0][0] != 0:
            y[0].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(0, 0);
            return;
        case gameArr[0][2] === 1 && gameArr[1][1] === 1 && gameArr[2][0] != 0:
            y[6].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(6, 0);
            break;
        case gameArr[1][1] === 1 && gameArr[2][0] === 1 && gameArr[0][2] != 0:
            y[2].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(2, 0);
            return;
            //check corner
        case gameArr[0][0] === 1 && gameArr[0][2] === 1 && gameArr[0][1] != 0:
            y[1].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(1, 0);
            return;
        case gameArr[1][0] === 1 && gameArr[1][2] === 1 && gameArr[1][1] != 0:
            y[4].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(4, 0);
            return;
        case gameArr[2][0] === 1 && gameArr[2][2] === 1 && gameArr[2][1] != 0:
            y[7].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(7, 0);
            return;
        case gameArr[0][0] === 1 && gameArr[2][0] === 1 && gameArr[1][0] != 0:
            y[3].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(3, 0);
            return;
        case gameArr[0][1] === 1 && gameArr[2][1] === 1 && gameArr[1][1] != 0:
            y[4].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(4, 0);
            return;
        case gameArr[0][2] === 1 && gameArr[2][2] === 1 && gameArr[1][2] != 0:
            y[5].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(5, 0);
            return;
        case gameArr[0][0] === 1 && gameArr[2][2] === 1 && gameArr[0][1] != 0:
            y[1].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(1, 0);
            return;
        case gameArr[0][2] === 1 && gameArr[2][0] === 1 && gameArr[2][1] != 0:
            y[7].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(7, 0);
            return;
            //add some random moves if no good moves found
        case gameArr[1][1] === -1:
            y[4].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(4, 0);
            return;
        case gameArr[0][0] === -1:
            y[0].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(0, 0);
            return;
        case gameArr[0][2] === -1:
            y[2].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(2, 0);
            return;
        case gameArr[2][0] === -1:
            y[6].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(6, 0);
            return;
        case gameArr[2][2] === -1:
            y[8].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(8, 0);
            return;
        case gameArr[0][1] === -1:
            y[1].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(1, 0);
            return;
        case gameArr[1][0] === -1:
            y[3].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(3, 0);
            return;
        case gameArr[1][2] === -1:
            y[5].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(5, 0);
            return;
        case gameArr[2][1] === -1:
            y[7].getElementsByTagName("i")[1].classList.remove("hidden");
            matrix(7, 0);
            return;
    }
}

function checkWinner() {

    if (gameArr[0].indexOf(-1) === -1 && gameArr[1].indexOf(-1) === -1 && gameArr[2].indexOf(-1) === -1) {
        document.getElementById("winner").innerHTML = "Tie!";
        document.getElementById("winner").style.display = "block";
        return;
    }

    for (let i = 0; i < gameArr.length; i++) {
        for (let j = 0; j < gameArr[i].length; j++) {
            switch (true) {

                case gameArr[i][0] === 0 && gameArr[i][1] === 0 && gameArr[i][2] === 0: // x rows
                    drawLine("row", i);
                    return true;
                case gameArr[0][j] === 0 && gameArr[1][j] === 0 && gameArr[2][j] === 0: // x columns
                    drawLine("col", j);
                    return true;
                case gameArr[0][0] === 0 && gameArr[1][1] === 0 && gameArr[2][2] === 0: // x diagonal 0-4-8
                    drawLine("diagonal", 2);
                    return true;
                case gameArr[0][2] === 0 && gameArr[1][1] === 0 && gameArr[2][0] === 0: // x diagonal 2-4-6
                    drawLine("diagonal", 3);
                    return true;

                case gameArr[i][0] === 1 && gameArr[i][1] === 1 && gameArr[i][2] === 1: // o rows
                    drawLine("row", i);
                    return true;
                case gameArr[0][j] === 1 && gameArr[1][j] === 1 && gameArr[2][j] === 1: // o columns
                    drawLine("col", j, );
                    return true;
                case gameArr[0][0] === 1 && gameArr[1][1] === 1 && gameArr[2][2] === 1: // o diagonal 0-4-8
                    drawLine("diagonal", 2, );
                    return true;
                case gameArr[0][2] === 1 && gameArr[1][1] === 1 && gameArr[2][0] === 1: // o diagonal 2-4-6
                    drawLine("diagonal", 3, );
                    return true;

            }
        }
    }
}


function drawLine(line, n) {
    let myLine = document.getElementById("win");
    switch (true) {
        case n === 0 && line === "row":
            myLine.classList.add("row");
            myLine.style.top = "75px";
            myLine.style.left = "20px";
            break;
        case n === 1 && line === "row":
            myLine.classList.add("row");
            myLine.style.top = "215px";
            myLine.style.left = "20px";
            break;
        case n === 2 && line === "row":
            myLine.classList.add("row");
            myLine.style.top = "355px";
            myLine.style.left = "20px";
            break;
    }
    switch (true) {
        case n === 0 && line === "col":
            myLine.classList.add("col");
            myLine.style.top = "20px";
            myLine.style.left = "75px";
            break;
        case n === 1 && line === "col":
            myLine.classList.add("col");
            myLine.style.top = "20px";
            myLine.style.left = "215px";
            break;
        case n === 2 && line === "col":
            myLine.classList.add("col");
            myLine.style.top = "20px";
            myLine.style.left = "355px";
            break;
    }
    switch (true) {
        case n === 2 && line === "diagonal":
            myLine.classList.add("diagonal1");
            break;
        case n === 3 && line === "diagonal":
            myLine.classList.add("diagonal2");
            break;
    }
    congrats(currentPlayer);
}

function congrats(winner) {
    document.getElementById("winner").innerHTML = winner + " win's!";
    document.getElementById("winner").style.display = "block";
}

function restart() {
    location.reload();
}
