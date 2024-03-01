const display = document.getElementById("display");
const buttonClear = document.getElementById("buttonClear");
const buttonEqual = document.getElementById("buttonEqual");
const buttonNumber = document.querySelectorAll(".buttonNumber");
const buttonFunction = document.querySelectorAll(".buttonFunction");

const MAX_CHARACTERS = 20;

function evalManual(expression) {
    expression = expression.replace(/=/g, '');
    return eval(expression);
}

function evaluateExpression(expression) {
    var validChars = /^[0-9+\-*/().\s]+=?$/;
    if (!validChars.test(expression)) {
        return 'Erro';
    }
    try {
        let result = evalManual(expression);
        if (!isFinite(result)) {
            return 'Erro';
        }
        return result;
    } catch (error) {
        return 'Erro';
    }
}

buttonNumber.forEach(buttonNum => {
    buttonNum.addEventListener("click", function() {
        if (display.textContent.length < MAX_CHARACTERS) {
            let number = this.textContent;
            display.textContent += number;
        }
    });
});

buttonFunction.forEach(buttonFunct => {
    buttonFunct.addEventListener("click", function() {
        if (display.textContent.length < MAX_CHARACTERS) {
            let funct = this.textContent;
            let displayContent = display.textContent.trim(); 
            let lastChar = displayContent[displayContent.length - 1]; 
            if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
                return;
            } else {
                display.textContent += funct;
            }
        }
    });
});

buttonClear.onclick = function() {
    display.textContent = "";
}

buttonEqual.onclick = function() {
    let expression = display.textContent;
    if (expression.includes('/0') || expression.includes('*0')) {
        display.textContent = '0';
        expression = expression.replace(/=+$/, '');
        return;
    }
    let result = evaluateExpression(expression);
    display.textContent = result;
}