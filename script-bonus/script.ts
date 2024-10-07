// Define interfaces for different shapes
interface Rectangle {
  type: 'rectangle';
  length: number;
  width: number;
}

interface Circle {
  type: 'circle';
  radius: number;
}

interface Square {
  type: 'square';
  sideLength: number;
}

// Array of shapes
const shapes: (Rectangle | Circle | Square)[] = [];

// Get references to HTML elements
const shapeSelect = document.getElementById('shape') as HTMLSelectElement;
const lengthInput = document.getElementById('length') as HTMLInputElement;
const widthContainer = document.getElementById('width-container') as HTMLDivElement;
const widthInput = document.getElementById('width') as HTMLInputElement;
const calculateButton = document.getElementById('calculate') as HTMLButtonElement;
const areaResult = document.getElementById('area') as HTMLSpanElement;
const perimeterResult = document.getElementById('perimeter') as HTMLSpanElement;
const shapeList = document.getElementById('shape-list') as HTMLUListElement;

// Initialize event listeners
function initEventListeners() {
  shapeSelect.addEventListener('change', toggleWidthInput);
  calculateButton.addEventListener('click', calculateShape);
}

// Toggle width input based on selected shape
function toggleWidthInput() {
  const selectedShape = shapeSelect.value;
  widthContainer.style.display = (selectedShape === 'circle' || selectedShape === 'square') ? 'none' : 'block';
}

// Calculate area and perimeter based on selected shape
function calculateShape() {
  const selectedShape = shapeSelect.value as 'rectangle' | 'circle' | 'square';
  const length = parseFloat(lengthInput.value);
  const width = parseFloat(widthInput.value);

  if (isNaN(length) || (selectedShape === 'rectangle' && isNaN(width)) || length < 0 || (selectedShape !== 'circle' && width < 0)) {
    alert('Please enter valid positive numbers for dimensions.');
    return;
  }

  const { area, perimeter } = getShapeCalculations(selectedShape, length, width);

  areaResult.textContent = area.toFixed(2);
  perimeterResult.textContent = perimeter.toFixed(2);

  const shape = createShapeObject(selectedShape, length, width);
  shapes.push(shape);

  displayShapes();
}

// Get area and perimeter calculations based on shape type
function getShapeCalculations(type: 'rectangle' | 'circle' | 'square', length: number, width: number) {
  let area: number, perimeter: number;

  switch (type) {
    case 'rectangle':
      area = length * width;
      perimeter = 2 * (length + width);
      break;
    case 'square':
      area = length * length;
      perimeter = 4 * length;
      break;
    case 'circle':
      area = Math.PI * Math.pow(length, 2);
      perimeter = 2 * Math.PI * length;
      break;
  }

  return { area, perimeter };
}

// Create shape object based on type
function createShapeObject(type: 'rectangle' | 'circle' | 'square', length: number, width: number): Rectangle | Circle | Square {
  switch (type) {
    case 'rectangle':
      return { type, length, width };
    case 'square':
      return { type, sideLength: length };
    case 'circle':
      return { type, radius: length };
  }
}

// Display the shapes in the HTML
function displayShapes() {
  shapeList.innerHTML = '';

  shapes.forEach((shape, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Shape ${index + 1}: ${getShapeDescription(shape)}`;
    shapeList.appendChild(listItem);
  });
}

// Get a description of the shape
function getShapeDescription(shape: Rectangle | Circle | Square): string {
  switch (shape.type) {
    case 'rectangle':
      return `Rectangle (Length: ${shape.length}, Width: ${shape.width})`;
    case 'square':
      return `Square (Side Length: ${shape.sideLength})`;
    case 'circle':
      return `Circle (Radius: ${shape.radius})`;
    default:
      return '';
  }
}

// Initialize the application
function init() {
  initEventListeners();
}

init();
