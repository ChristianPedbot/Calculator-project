const displayOne = document.getElementById("displayOne");
const buttonClear = document.getElementById("buttonClear");
const buttonPer = document.getElementById("buttonPer");
const buttonEqual = document.getElementById("buttonEqual");
const buttonRem = document.getElementById("buttonRem");
const buttonPoint = document.getElementById("buttonPoint");
const buttonNumber = document.querySelectorAll(".buttonNumber");
const buttonFunction = document.querySelectorAll(".buttonFunction");

const maxCharacteres = 15;
const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '%', 'Enter', '(', ')', 'c', 'C', 'Backspace'];

function evaluateExpression(expression) {
    const validChars = /^[0-9+\-*/().\s%]+=?$/;
    if (!validChars.test(expression)) {
        return 'Error: Invalid expression';
    }
    expression = expression.replace(/%/g, '*0.01');
    expression = expression.replace(/=/g, '');
    let result = eval(expression);
    if (!isFinite(result)) {
        return 'Error';
    }
    return result;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!chars.includes(key) || (key === '.' && displayOne.textContent.includes('.'))) {
        return;
    }
    if (key === 'c' || key === 'C') {
        buttonClear.click();
    } else if (key === 'Backspace') {
        buttonRem.click();
    } else if (displayOne.textContent.length < maxCharacteres) {
        if (key === 'Enter') {
            buttonEqual.click();
        } else if (key === '%' && !displayOne.textContent.includes('%')) {
            buttonPer.click();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            if (/[-+*/.]$/.test(displayOne.textContent)) {
                return;
            } else {
                displayOne.textContent += key;
            }
        } else {
            displayOne.textContent += key;
        }
    }
})

buttonPoint.addEventListener("click", function() {
    buttonPoint.disabled = true; 
})

buttonNumber.forEach(buttonNum => {
    buttonNum.addEventListener("click", function() {
        if (displayOne.textContent.length < maxCharacteres) {
            let number = this.textContent;
            displayOne.textContent += number;
        }
    })
})

buttonFunction.forEach(buttonFunct => {
    buttonFunct.addEventListener("click", function() {
        if (displayOne.textContent.length < maxCharacteres) {
            let funct = this.textContent;
            if (/[-+*/.]$/.test(displayOne.textContent)) {
                return;
            }
            displayOne.textContent += funct;
        }
    })
})

buttonPer.addEventListener("click", function() {
    displayOne.textContent += '%';
    let expression = displayOne.textContent;
    if (!expression.includes('%')) {
        displayOne.textContent += '%';
        return;
    }
    expression = expression.replace(/%/g, '*0.01');
    let result = evaluateExpression(expression);
    displayOne.textContent = result * 100 + '*';
})

buttonClear.onclick = function() {
    displayOne.textContent = "";
    lastResult = null;
    buttonPoint.disabled = false;
}

buttonRem.onclick = function() {
    lastResult = null;
    if (displayOne.textContent.endsWith("<-")) {
        displayOne.textContent = displayOne.textContent.slice(0, -3);
    } 
    else if (displayOne.textContent.length >= maxCharacteres) {
        displayOne.textContent = displayOne.textContent.slice(0, -1);
    } 
    else {
        displayOne.textContent = displayOne.textContent.slice(0, -3);
    }
    if (displayOne.textContent !== '.'){
        buttonPoint.disabled = false;
    }
}

let lastResult = null;
let previousExpression = null;
let lastOperator = null;

buttonEqual.onclick = function() {
    let expression = displayOne.textContent.trim();
    let operator = expression.match(/[\+\-\*\/]/);
    if (!operator) {
        operator = null;
    }
    if (lastResult === null) {lastResult = evaluateExpression(expression);
        displayOne.textContent = lastResult;
    } else {
        let newExpression = `${lastResult}${lastOperator}${previousExpression}`;
        let result = evaluateExpression(newExpression);
        lastResult = result;
        displayOne.textContent = result;
    }
    if (operator) {
        previousExpression = expression.split(operator).pop();
        lastOperator = operator;
    }
}
