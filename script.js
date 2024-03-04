const displayOne = document.getElementById("displayOne");
const displayTwo = document.getElementById("displayTwo");
const buttonClear = document.getElementById("buttonClear");
const buttonPer = document.getElementById("buttonPer");
const buttonEqual = document.getElementById("buttonEqual");
const buttonRem = document.getElementById("buttonRem");
const buttonNumber = document.querySelectorAll(".buttonNumber");
const buttonFunction = document.querySelectorAll(".buttonFunction");


const MAX_CHARACTERS = 15;

function evalManual(expression) {
    expression = expression.replace(/=/g, '');
    return eval(expression);
}

function evaluateExpression(expression) {
    var validChars = /^[0-9+\-*/().\s%]+=?$/;
    if (!validChars.test(expression)) {
        return 'Erro';
    }
    try {
        expression = expression.replace(/%/g, '*0.01');
        let result = evalManual(expression);
        if (!isFinite(result)) {
            return 'Erro';
        }
        return result;
    } catch (error) {
        return 'Error';
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === 'c' || key === 'C') {
        buttonClear.click();
        return;
    }
    if (key === 'Backspace') {
        buttonRem.click();
        return;
    }
    if (displayOne.textContent.length < MAX_CHARACTERS) {
        if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === 'Enter'|| key === '(' || key === ')'){
            if (key === 'Enter') {
                buttonEqual.click();
                return;
            }
            if (key === '%' && !displayOne.textContent.includes('%')) {
                buttonPer.click();
            } else if (key === '.' && displayOne.textContent.includes('.')) {
                return;
            } else {
                displayOne.textContent += key;
            }
        }
    }
})

buttonPer.addEventListener("click", function() {
    displayOne.textContent += '%';
})

buttonNumber.forEach(buttonNum => {
    buttonNum.addEventListener("click", function() {
        if (displayOne.textContent.length < MAX_CHARACTERS) {
            let number = this.textContent;
            if (number === '.' && displayOne.textContent.includes('.')) {
                return;
            }
            displayOne.textContent += number;
        }
    })
})

buttonFunction.forEach(buttonFunct => {
    buttonFunct.addEventListener("click", function() {
        if (displayOne.textContent.length < MAX_CHARACTERS) {
            let funct = this.textContent;
            let displayOneContent = displayOne.textContent.trim(); 
            let lastChar = displayOneContent[displayOneContent.length - 1]; 
            if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
                return;
            } else {
                displayOne.textContent += funct;
            }
        }
    })
})

buttonEqual.onclick = function() {
    let expression = displayOne.textContent;
    if (expression.includes('/0') || expression.includes('*0')) {
        displayOne.textContent = '0';
        expression = expression.replace(/=+$/, '');
        return;
    }
    if (displayOne.textContent.length === MAX_CHARACTERS){
        displayTwo.textContent = "limit reached";
    } else {
        let result = evaluateExpression(expression);
        displayTwo.textContent = result;
        displayOne.textContent = expression.replace(/=/g, '');
    }

}

buttonPer.addEventListener("click", function() {
    let expression = displayOne.textContent;
    if (!expression.includes('%')) {
        displayOne.textContent += '%';
    } else {
        expression = expression.replace(/%/g, '*0.01');
        let result = evaluateExpression(expression);
        displayOne.textContent = result * 100 + "*";
    }
})

buttonClear.onclick = function() {
    displayOne.textContent = "";
    displayTwo.textContent = "";
}

buttonRem.onclick = function() {
    if (displayOne.textContent.endsWith("<-")) {
        displayOne.textContent = displayOne.textContent.slice(0, -3);
    } else if (displayOne.textContent.length >= MAX_CHARACTERS) {
        displayOne.textContent = displayOne.textContent.slice(0, -1);
    } else {
        displayOne.textContent = displayOne.textContent.slice(0, -3);
    }
}
