
function createGrid(row) {
  if (row > 0 && row <= GRID_SIZE) {
    let rowElement = createRow((GRID_SIZE - row) + 1);
    document.getElementById('square-grid').appendChild(rowElement);
    row -= 1;
    createGrid(row);
  }
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


function createSquare() {
  let squareDiv = document.createElement('div');
  squareDiv.classList.add('square-cell');
  return squareDiv;
}


const limitChars = (element, maxCharLength) => {
  if (element.value.length > maxCharLength) {
    element.value = element.value.substr(0, maxCharLength);
  }
}


const allowOnlyNumbers = (element) => {
  let code = (element.keyCode ? element.keyCode : element.which);
  let specialKeyCodes = [8, 37, 38, 39, 40, 46];
  
  if (!specialKeyCodes.includes(code) && !(code >= 48 && code <= 57)) {
    element.preventDefault();
  }
}


let GRID_SIZE;
let gridSizeElement = document.getElementById('grid-size');


// Event listeners start

gridSizeElement.addEventListener('keydown', (e) => {
  allowOnlyNumbers(e);
});


gridSizeElement.addEventListener('input', (e) => {
  limitChars(e.target, 2);
  document.getElementById('square-grid').replaceChildren();
    
  if (e.target.value) {
    GRID_SIZE = parseInt(e.target.value);
    createGrid(GRID_SIZE);
  }
});

// Event listeners end


window.onload = () => {
  gridSizeElement.value = null;
}

