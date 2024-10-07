// Get references to HTML elements
class ShapeCalculator {
    private shapeSelect: HTMLSelectElement;
    private lengthInput: HTMLInputElement;
    private widthContainer: HTMLDivElement;
    private widthInput: HTMLInputElement;
    private calculateButton: HTMLButtonElement;
    private areaResult: HTMLSpanElement;
    private perimeterResult: HTMLSpanElement;

    constructor() {
        this.shapeSelect = document.getElementById('shape') as HTMLSelectElement;
        this.lengthInput = document.getElementById('length') as HTMLInputElement;
        this.widthContainer = document.getElementById('width-container') as HTMLDivElement;
        this.widthInput = document.getElementById('width') as HTMLInputElement;
        this.calculateButton = document.getElementById('calculate') as HTMLButtonElement;
        this.areaResult = document.getElementById('area') as HTMLSpanElement;
        this.perimeterResult = document.getElementById('perimeter') as HTMLSpanElement;

        this.addEventListeners();
    }

    private addEventListeners(): void {
        this.shapeSelect.addEventListener('change', this.toggleWidthInput.bind(this));
        this.calculateButton.addEventListener('click', this.calculate.bind(this));
    }

    private toggleWidthInput(): void {
        const selectedShape = this.shapeSelect.value;
        if (selectedShape === 'circle' || selectedShape === 'square') {
            this.widthContainer.style.display = 'none';
        } else {
            this.widthContainer.style.display = 'block';
        }
    }

    private calculate(): void {
        const selectedShape = this.shapeSelect.value;
        const length = parseFloat(this.lengthInput.value);
        const width = parseFloat(this.widthInput.value);

        if (isNaN(length) || (selectedShape == 'rectangle' && isNaN(width)) || length < 0 || (selectedShape !== 'circle' && width < 0)) {
            alert('Please enter valid positive numbers for dimensions.');
            return;
        }

        let area: number, perimeter: number;

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
