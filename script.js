const GRID_SIZE = 16;


function createGrid(row) {
  if (row > 0) {
    let rowElement = createRow((GRID_SIZE - row) + 1);
    document.getElementById('square-grid').appendChild(rowElement);
    row -= 1;
    createGrid(row);
  }
}


function createSquare() {
  let squareDiv = document.createElement('div');
  squareDiv.classList.add('square-cell');
  return squareDiv;
}


function createRow(rowNumber) {
  let rowDiv = document.createElement('div');
  rowDiv.id = `row-${rowNumber}`;
  rowDiv.classList.add('grid-row');
  rowDiv.style.height = `${100/GRID_SIZE}%`;
  
  for (let i=0; i<GRID_SIZE; i++) {
    let squareElement = createSquare();
    rowDiv.appendChild(squareElement);
  }
  
  return rowDiv;
}


createGrid(GRID_SIZE);

