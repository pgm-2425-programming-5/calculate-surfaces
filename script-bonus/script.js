var shapes = [];
var shapeSelect = document.getElementById('shape');
var lengthInput = document.getElementById('length');
var widthContainer = document.getElementById('width-container');
var widthInput = document.getElementById('width');
var calculateButton = document.getElementById('calculate');
var areaResult = document.getElementById('area');
var perimeterResult = document.getElementById('perimeter');
var shapeList = document.getElementById('shape-list');
shapeSelect.addEventListener('change', function () {
    var selectedShape = shapeSelect.value;
    if (selectedShape === 'circle' || selectedShape === 'square') {
        widthContainer.style.display = 'none';
    }
    else {
        widthContainer.style.display = 'block';
    }
});
calculateButton.addEventListener('click', function () {
    var selectedShape = shapeSelect.value;
    var length = parseFloat(lengthInput.value);
    var width = parseFloat(widthInput.value);
    if (isNaN(length) || (selectedShape === 'rectangle' && isNaN(width)) || length < 0 || (selectedShape !== 'circle' && width < 0)) {
        alert('Please enter valid positive numbers for dimensions.');
        return;
    }
    var area, perimeter;
    switch (selectedShape) {
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
        default:
            break;
    }
    areaResult.textContent = area.toFixed(2);
    perimeterResult.textContent = perimeter.toFixed(2);
    var shape = {
        type: selectedShape,
        length: length,
        width: selectedShape === 'rectangle' ? width : undefined,
        radius: selectedShape === 'circle' ? length : undefined,
        sideLength: selectedShape === 'square' ? length : undefined,
    };
    shapes.push(shape);
    displayShapes();
});
function displayShapes() {
    shapeList.innerHTML = '';
    shapes.forEach(function (shape, index) {
        var listItem = document.createElement('li');
        listItem.textContent = "Shape ".concat(index + 1, ": ").concat(getShapeDescription(shape));
        shapeList.appendChild(listItem);
    });
}
function getShapeDescription(shape) {
    switch (shape.type) {
        case 'rectangle':
            return "Rectangle (Length: ".concat(shape.length, ", Width: ").concat(shape.width, ")");
        case 'square':
            return "Square (Side Length: ".concat(shape.sideLength, ")");
        case 'circle':
            return "Circle (Radius: ".concat(shape.radius, ")");
        default:
            return '';
    }
}
