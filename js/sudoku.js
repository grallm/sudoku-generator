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

			tabCol.addEventListener('click', function (e) {	// CHANGE VALUE ON CLICK
				const content = parseInt(e.target.innerHTML);
				/^s(\d)-(\d)$/.exec(e.target.id);
				if(content < 9){
					e.target.innerHTML = content+1;
					sudokuContent[RegExp.$1][RegExp.$2] = content+1;
				}else{
					e.target.innerHTML = content-8;
					sudokuContent[RegExp.$1][RegExp.$2] = content-8;
				}
			});
			tabCol.addEventListener('select', function (e) {	// PREVENT SELECT
				e.preventDefault();
			});
		}
		table.appendChild(tabLine);
	}
	document.querySelector('body').appendChild(table);
})();

function checkSudoku(content) {
	for(let i=0; i<9; i++) {
		const column = (function () {
			let columnContent = [];
			for(let k=0; k<9; k++) {
				columnContent.push(content[k][i]);
			}
			return columnContent;
		})();
		for (let j = 1; j < 10; j++) {
			if (content[i].indexOf(j) === -1) {
				return false;	// ERROR ON LINE
			}

			if (column.indexOf(j) === -1){
				return false;	// ERROR ON COLUMN
			}
		}
	}
	for(let a=0; a<9; a+3) {
		for(let b=0; b<9; b+3) {
			const block = (function () {
				let blockContent = [];
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 3; j++) {
						blockContent.push(content[a+i][b+j]);
					}
				}
				return blockContent;
			})();
			for (let i = 1; i < 10; i++) {
				if (block.indexOf(i) === -1) {
					return false;
				}
			}
		}
	}
	return true;
}

function setContentOnSudoku(content) {	// SET THE SUDOKU ON PAGE FROM TABLE
	const contL= content.length;
	for(let i=0; i< contL; i++){
		const contLi = content[i].length;
		for(let j=0; j<contLi; j++){
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
