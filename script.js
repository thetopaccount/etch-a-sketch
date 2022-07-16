let GRID_SIZE;
let PREVIOUS_COLOR = '#000000';
let SELECTED_COLOR = '#000000';
let mousedown = false;
let gridSizeElement = document.getElementById('grid-size');
let colorPickerElement = document.getElementById('color-picker');
let squareGridElement = document.getElementById('square-grid');
let eraserElement = document.getElementById('eraser-toggle');
let resetElement = document.getElementById('reset-grid');


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


// Event listeners start

gridSizeElement.addEventListener('keydown', (e) => {
  allowOnlyNumbers(e);
});


gridSizeElement.addEventListener('input', (e) => {
  limitChars(e.target, 2);
    
  if (e.target.value) {
    if (e.target.value == GRID_SIZE) {
      return;
    }
    else {
      squareGridElement.replaceChildren();
      GRID_SIZE = parseInt(e.target.value);
      createGrid(GRID_SIZE);
    }
  }
});

colorPickerElement.addEventListener('change', (e) => {
  SELECTED_COLOR = e.target.value;
});

squareGridElement.addEventListener('mousedown', (e) => {
  mousedown = true;
  e.target.style.backgroundColor = SELECTED_COLOR;
});

squareGridElement.addEventListener('mouseup', (e) => {
  mousedown = false;
});

squareGridElement.addEventListener('mouseover', (e) => {
  if (mousedown) {
    e.target.style.backgroundColor = SELECTED_COLOR;
  }
});

eraserElement.addEventListener('click', () => {
  if (!['white', '#ffffff'].includes(SELECTED_COLOR)) {
    PREVIOUS_COLOR = SELECTED_COLOR;
    SELECTED_COLOR = 'white';
    eraserElement.style.fontSize = '1.5em';
  }
  else {
    SELECTED_COLOR = PREVIOUS_COLOR;
    eraserElement.style.fontSize = '110%';
  }
});

resetElement.addEventListener('click', () => {
  squareGridElement.replaceChildren();
  GRID_SIZE = parseInt(gridSizeElement.value);
  createGrid(GRID_SIZE);
});

// Event listeners end


window.onload = () => {
  GRID_SIZE = 16;
  gridSizeElement.value = GRID_SIZE;
  colorPickerElement.value = '#000000';
  createGrid(GRID_SIZE);
}

