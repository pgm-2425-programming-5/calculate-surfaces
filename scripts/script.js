"use strict";
// Get references to HTML elements
class ShapeCalculator {
    constructor() {
        this.shapeSelect = document.getElementById('shape');
        this.lengthInput = document.getElementById('length');
        this.widthContainer = document.getElementById('width-container');
        this.widthInput = document.getElementById('width');
        this.calculateButton = document.getElementById('calculate');
        this.areaResult = document.getElementById('area');
        this.perimeterResult = document.getElementById('perimeter');
        this.addEventListeners();
    }
    addEventListeners() {
        this.shapeSelect.addEventListener('change', this.toggleWidthInput.bind(this));
        this.calculateButton.addEventListener('click', this.calculate.bind(this));
    }
    toggleWidthInput() {
        const selectedShape = this.shapeSelect.value;
        if (selectedShape === 'circle' || selectedShape === 'square') {
            this.widthContainer.style.display = 'none';
        }
        else {
            this.widthContainer.style.display = 'block';
        }
    }
    calculate() {
        const selectedShape = this.shapeSelect.value;
        const length = parseFloat(this.lengthInput.value);
        const width = parseFloat(this.widthInput.value);
        if (isNaN(length) || (selectedShape == 'rectangle' && isNaN(width)) || length < 0 || (selectedShape !== 'circle' && width < 0)) {
            alert('Please enter valid positive numbers for dimensions.');
            return;
        }
        let area, perimeter;
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
                return;
        }
        this.areaResult.textContent = area.toFixed(2);
        this.perimeterResult.textContent = perimeter.toFixed(2);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new ShapeCalculator();
});
