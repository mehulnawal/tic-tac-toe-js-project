/*

1. enable users enter x or o in the any box
2. if he has entered in it then user cannot enter again in it 
3. then the next move be random of opposite in the boxes which are left;

*/

let turn = document.querySelector(".turn");
let xTurn = document.querySelector("#xTurn");
let oTurn = document.querySelector("#oTurn");
let i = document.querySelector("i");
let sign = document.getElementById("sign");
let body = document.querySelector("body");
let selectOption;
let currentMove = "";
let restart = document.getElementById("restart");
let date = document.getElementById("date");
let strike = document.querySelector(".winning-strike")

// setting date 
function changeDate() {

    let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let month = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let newDate = new Date();
    let newMonth = month[newDate.getMonth()];
    let newDay = day[newDate.getDay()];
    date.innerText = `${newMonth}, ${newDay} ${newDate.getDate()}`;
};

window.onload = changeDate();

// adding activeTurn in x
xTurn.addEventListener("click", function () {
    oTurn.classList.remove("activeTurn");
    this.classList.toggle("activeTurn");
    sign.innerHTML = '<i class="fa-solid fa-xmark fw-normal"></i> Turn';
    currentMove = 'x';
});

// adding activeTurn in o
oTurn.addEventListener("click", function () {
    xTurn.classList.remove("activeTurn");
    this.classList.toggle("activeTurn");
    sign.innerHTML = '<i class="fa-solid fa-o fw-normal"></i> Turn';
    currentMove = 'o';
});

let boxBody = document.querySelectorAll(".boxBody");
let userSelectX = 0, userSelectO = 0;

for (let i = 0; i < boxBody.length; i++) {
    boxBody[i].addEventListener("click", function () {

        boxBody[i].style.pointerEvents = "pointer";

        if ((xTurn.classList.contains("activeTurn") || (oTurn.classList.contains("activeTurn")))) {
            if (boxBody[i].click != "") {
                xTurn.style.cursor = "default";
                oTurn.style.cursor = "default";
                xTurn.style.pointerEvents = "none";
                oTurn.style.pointerEvents = "none";
                boxBody[i].style.pointerEvents = "none";
            }

            if (currentMove == "x") {
                boxBody[i].innerHTML = '<i class="fa-solid fa-xmark fw-normal"></i>';
                currentMove = "o";
                sign.innerHTML = '<i class="fa-solid fa-o fw-normal"></i> Turn';
                xTurn.classList.remove("activeTurn");
                oTurn.classList.add("activeTurn");
            }
            else if (currentMove == "o") {
                boxBody[i].innerHTML = '<i class="fa-solid fa-o fw-normal"></i>';
                currentMove = "x";
                sign.innerHTML = '<i class="fa-solid fa-xmark fw-normal"></i> Turn';
                oTurn.classList.remove("activeTurn");
                xTurn.classList.add("activeTurn");
            }

            // winning patterns
            let WRow1 = boxBody[0].innerHTML !== "" &&
                boxBody[0].innerHTML == boxBody[1].innerHTML &&
                boxBody[0].innerHTML == boxBody[2].innerHTML;

            let WRow2 = boxBody[3].innerHTML !== "" &&
                boxBody[3].innerHTML == boxBody[4].innerHTML &&
                boxBody[3].innerHTML == boxBody[5].innerHTML;

            let WRow3 = boxBody[6].innerHTML !== "" &&
                boxBody[6].innerHTML == boxBody[7].innerHTML &&
                boxBody[6].innerHTML == boxBody[8].innerHTML;

            let WCol1 = boxBody[0].innerHTML !== "" &&
                boxBody[0].innerHTML == boxBody[3].innerHTML &&
                boxBody[0].innerHTML == boxBody[6].innerHTML;

            let WCol2 = boxBody[1].innerHTML !== "" &&
                boxBody[1].innerHTML == boxBody[4].innerHTML &&
                boxBody[1].innerHTML == boxBody[7].innerHTML;

            let WCol3 = boxBody[2].innerHTML !== "" &&
                boxBody[2].innerHTML == boxBody[5].innerHTML &&
                boxBody[2].innerHTML == boxBody[8].innerHTML;

            let WDiag1 = boxBody[0].innerHTML !== "" &&
                boxBody[0].innerHTML == boxBody[4].innerHTML &&
                boxBody[0].innerHTML == boxBody[8].innerHTML;

            let WDiag2 = boxBody[2].innerHTML !== "" &&
                boxBody[2].innerHTML == boxBody[4].innerHTML &&
                boxBody[2].innerHTML == boxBody[6].innerHTML;

            // checking which player has won - x or o
            let winnerSymbol = null;

            if (WRow1) {
                winnerSymbol = boxBody[0].innerHTML;
            }
            else if (WRow2) { winnerSymbol = boxBody[3].innerHTML; }
            else if (WRow3) { winnerSymbol = boxBody[6].innerHTML; }
            else if (WCol1) { winnerSymbol = boxBody[0].innerHTML; }
            else if (WCol2) { winnerSymbol = boxBody[1].innerHTML; }
            else if (WCol3) { winnerSymbol = boxBody[2].innerHTML; }
            else if (WDiag1) { winnerSymbol = boxBody[0].innerHTML; }
            else if (WDiag2) { winnerSymbol = boxBody[2].innerHTML; }

            if (WRow1 || WRow2 || WRow3 || WCol1 || WCol2 || WCol3 || WDiag1 || WDiag2) {
                xTurn.classList.remove("activeTurn");
                oTurn.classList.remove("activeTurn");
                sign.innerHTML = `${winnerSymbol} Wins! 🎉`;
                showingStrike();

                if (winnerSymbol.includes('fa-o')) {
                    oTurn.style.backgroundColor = "green";
                    oTurn.style.color = "white";
                } else if (winnerSymbol.includes('fa-xmark')) {
                    xTurn.style.backgroundColor = "green";
                    xTurn.style.color = "white";
                }

                if (WRow1) {
                    strike.style.top = "17%";
                    strike.style.left = "0%";
                }
                else if (WRow2) {
                    strike.style.top = "50%";
                    strike.style.left = "0%";
                }
                else if (WRow3) {
                    strike.style.top = "83%";
                    strike.style.left = "0%";
                }
                else if (WCol1) {
                    strike.style.top = "50%";
                    strike.style.left = "-34%";
                    strike.style.transform = `rotate(${90}deg)`;
                }
                else if (WCol2) {
                    strike.style.top = "50%";
                    strike.style.left = "-0.2%";
                    strike.style.transform = `rotate(${90}deg)`;
                }
                else if (WCol3) {
                    strike.style.top = "50%";
                    strike.style.left = "33%";
                    strike.style.transform = `rotate(${90}deg)`;
                }
                else if (WDiag1) {
                    strike.style.top = "50%";
                    strike.style.left = "0%";
                    strike.style.transform = `rotate(${45}deg)`;
                }
                else if (WDiag2) {
                    strike.style.top = "50%";
                    strike.style.left = "-0.2%";
                    strike.style.transform = `rotate(${135}deg)`;
                }
            }
        }
        else {
            alert("Please select X or O before making a move!");
        }
    })
}

// restart the game - features
restart.addEventListener("click", function () {
    let finalAsk = "Do you really want to restart the game ?";

    if (confirm(finalAsk) == true) {
        sign.innerHTML = '';
        oTurn.classList.remove("activeTurn");
        xTurn.classList.remove("activeTurn");
        for (let i = 0; i < boxBody.length; i++) {
            boxBody[i].innerHTML = "";
            boxBody[i].style.pointerEvents = "auto";
        }
        xTurn.style.pointerEvents = "auto";
        oTurn.style.pointerEvents = "auto";
        xTurn.style.cursor = "pointer";
        oTurn.style.cursor = "pointer";
        strike.style.display = "none";
        xTurn.style.backgroundColor = "white";
        xTurn.style.color = "black";

    }
})

// winning patterns
/*

1, 2, 3
4, 5, 6
7, 8, 9
1, 4, 7
2, 5, 8
3, 6, 9
1, 5, 9
3, 5, 7

*/

// function to show winning strike 
function showingStrike() {
    strike.style.display = "block";
    boxBody.forEach(box => {
        box.style.pointerEvents = "none";
    });
};