var squares = document.querySelectorAll(".squares");
var isEasy = false;
var randResult;
var theSquare;
var theSquareColor;
var easyLevel;
var hardLevel;
var newGame;

function randomizeSquareColor() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
	}
}

function placeRgbText() {
	document.querySelector("#rgb").innerHTML = theSquareColor;
}

function initFields() {	
	if(isEasy === false){
		randResult = Math.floor(Math.random() * squares.length - 1);
	} else {
		randResult = Math.floor(Math.random() * (squares.length - 4));
	} 

	theSquare = squares[(randResult === -1) ? 0 : randResult];
	theSquareColor = theSquare.style.background.replace("rgb", "");
	easyLevel = document.querySelector("#easyLevel");
	hardLevel = document.querySelector("#hardLevel");
	hardLevel.style.background = (isEasy === true) ? "#FFDEAD" : "rgb(80, 180, 240)";
	newGame = document.querySelector("#newGame");
	document.querySelector(".hedder").style.background = "rgb(80, 180, 240)";
	document.getElementById("correctAnwser").innerHTML = "";
}

function chooseEasy() {	
	easyLevel.style.cursor = "pointer";
	easyLevel.addEventListener("click", function() {
		if (isEasy === false) {
			isEasy = true;
			easyLevel.style.background = "rgb(80, 180, 240)";
			initProcess();
		}
	});
}

function chooseHard() {
	hardLevel.style.cursor = "pointer";
	hardLevel.addEventListener("click", function() {
		if (isEasy === true) {
			isEasy = false;
			easyLevel.style.background = "#FFDEAD"
			initProcess();
		}
	});
}

function chooseSquare() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.cursor = "pointer";
		squares[i].addEventListener("click", function(){
			if (this.style.background.replace("rgb", "") === theSquareColor) {
				document.getElementById("correctAnwser").innerHTML = "<strong>CORRECT!!!</strong>"
				document.querySelector(".hedder").style.background = this.style.background;
			} else {
				this.style.background = "rgb(230, 230, 230)";
			}	
		});
	}
}

function clickNewGame() {
	newGame.style.cursor = "pointer";
	newGame.addEventListener("click", function(){
	initProcess();
	})
}

function buildEasyBoard() {
	if (isEasy === true) {
		for (var i = 3; i < squares.length; i++) {
		 		squares[i].style.background = "rgb(230, 230, 230)";
		}
	}
}

function initProcess() {	
	randomizeSquareColor();
	initFields();
	placeRgbText();
	chooseEasy();
	chooseHard();
	chooseSquare();
	clickNewGame();
	buildEasyBoard();
}

initProcess();