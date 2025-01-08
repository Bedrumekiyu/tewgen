
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

let currentInput = '';
let previousInput = '';
let operator = '';

function updateDisplay() {
    display.value = currentInput || previousInput || '0';
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        
        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === '') return; 
            if (previousInput !== '') {
                calculate(); 
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        } else if (value === 'C') {
            
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay(); 
        } else {
            
            currentInput += value;
        }

        updateDisplay();
    });
});


function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
}


equalsButton.addEventListener('click', () => {
    calculate();
    updateDisplay();
});
