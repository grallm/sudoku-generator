(function graphSudoku(){	// CREATE SUDOKU TABLE
	const table = document.createElement('table');

	for(let i=0; i<9; i++){	// CREATE TABLE LINES
		const tabLine = document.createElement('tr');

		for(let j=0; j<9; j++){	// CREATE TABLE COLUMNS
			const tabCol = document.createElement('td');
			
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

function Sudoku(content, difficulty) {
	this.content = content;
	this.difficulty = difficulty;
	
	this.generateContent = function () {

	}
}