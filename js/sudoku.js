let sudokuContent = [];

(function graphSudoku(){	// CREATE SUDOKU TABLE
	const table = document.createElement('table');

	for(let i=0; i<9; i++){	// CREATE TABLE LINES
		const tabLine = document.createElement('tr');

		for(let j=0; j<9; j++){	// CREATE TABLE COLUMNS
			const tabCol = document.createElement('td');

			tabCol.setAttribute('id','s' + i + '-' + j);
			if (j===2 || j===5){
				tabCol.setAttribute('class',tabCol.className + ' right');
			}
			if (i===2 || i===5){
				tabCol.setAttribute('class',tabCol.className + ' bottom');
			}
			tabLine.appendChild(tabCol);
		}
		table.appendChild(tabLine);
	}
	document.querySelector('body').appendChild(table);
})();

function setContentOnSudoku(content) {	// SET THE SUDOKU ON PAGE FROM TABLE
	for(let i=0; i< content.length; i++){
		for(let j=0; j< content[i].length; j++){
			document.getElementById('s' + i + '-' + j).textContent = content[i][j];
		}
	}
}

(function setContent(){	// GENERATE SUDOKU
	for(let i=0; i<9; i++){	// CREATE TABLE LINES
		sudokuContent[i] = [];
		for(let j=0; j<9; j++) {	// CREATE TABLE COLUMNS
			let caseValue = j+i+1;
			caseValue = (caseValue < 10) ? caseValue : caseValue-9;	// RESTART IF VALUE BIGGER THAN 9
			sudokuContent[i][j] = caseValue;
		}
	}
	setContentOnSudoku(sudokuContent);
})();

function aleatoryShake(sudoku, times) {	// CHANGE sudoku'S LINES times TIMES
	for (let i=0; i<times; i++){
		const firstLine = Math.floor(Math.random()*9);	// TAKE RANDOMLY 2 LINES
		const secondLine = (function () {
			let random = Math.floor(Math.random()*9);
			while (random === firstLine){
				random = Math.floor(Math.random()*9);
			}
			return random;
		})();

		const stockLine = sudokuContent[firstLine];

		sudokuContent[firstLine] = sudokuContent[secondLine];
		sudokuContent[secondLine] = stockLine;
		setContentOnSudoku(sudokuContent);
	}
}

/*
function Sudoku(id, content, difficulty) {
	this.id = id;
	this.content = content;
	this.difficulty = difficulty;

	this.generateContent = function () {

	};
	this.generateDifficulty = function () {

	};
}*/
