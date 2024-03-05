const displayOne = document.getElementById("displayOne");
const buttonClear = document.getElementById("buttonClear");
const buttonPer = document.getElementById("buttonPer");
const buttonEqual = document.getElementById("buttonEqual");
const buttonRem = document.getElementById("buttonRem");
const buttonNumber = document.querySelectorAll(".buttonNumber");
const buttonFunction = document.querySelectorAll(".buttonFunction");

const maxCharacteres = 15;

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
    if (displayOne.textContent.length < maxCharacteres) {
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
        if (displayOne.textContent.length < maxCharacteres) {
            let number = this.textContent;
            let expression = displayOne.textContent + number;
            if (expression.match(/[0-9]+\.\+[0-9]/)) {
                return;
            }
            displayOne.textContent += number;
        }
    })
})

buttonFunction.forEach(buttonFunct => {
    buttonFunct.addEventListener("click", function() {
        if (displayOne.textContent.length < maxCharacteres) {
            let funct = this.textContent;
            let displayOneContent = displayOne.textContent.trim(); 
            let lastChar = displayOneContent[displayOneContent.length - 1]; 
            if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/'|| lastChar === '.') {
                return;
            } else {
                displayOne.textContent += funct;
            }
        }
    })
})



let firstNumber = '';
let expression = '';
let operator = '';

/*buttonEqual.onclick = function() {
    expression = displayOne.textContent;
    let expressionSplit = expression.split("");
    if (expressionSplit[1] === "+") {
        operator = "+"; 
    } else if (expressionSplit[1] === "-"){
        operator = "-";
    } else if (expressionSplit[1] === "*"){
        operator = "*";
    } else if (expressionSplit[1] === "/"){
        operator = "/";
    }
    if (expression.includes('/0') || expression.includes('*0')) {
        displayOne.textContent = '0';
        expression = expression.replace(/=+$/, '');
        return;
    }
    if (displayOne.textContent.length === maxCharacteres){
        displayOne.textContent = "limit reached";
    } else {
        let result = evaluateExpression(expression);
        if (firstNumber !== '' && operator !== '') {
            if (operator === "+") {
                result = result + parseInt(firstNumber);
            }
            else if (operator === "-") {
                result = result - parseInt(firstNumber);
            }
            else if (operator === "*") {
                result = result * parseInt(firstNumber);
            }
            else if (operator === "/") {
                result = result / parseInt(firstNumber);
            }
        }

        displayOne.textContent = result;
        if (!isNaN(result) && operator !== '') {
            firstNumber = expression.split(/[+\-*\/]/)[0];
        }
    }


}*/

buttonEqual.onclick = function() {
    let expression = displayOne.textContent;
    if (expression.includes('/0') || expression.includes('*0')) {
        displayOne.textContent = '0';
        return;
    }
    if (displayOne.textContent.length === maxCharacteres){
        displayOne.textContent = "limit reached";
    } else {
        let result = evaluateExpression(expression);
        displayOne.textContent = result;
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
}

buttonRem.onclick = function() {
    if (displayOne.textContent.endsWith("<-")) {
        displayOne.textContent = displayOne.textContent.slice(0, -3);
    } else if (displayOne.textContent.length >= maxCharacteres) {
        displayOne.textContent = displayOne.textContent.slice(0, -1);
    } else {
        displayOne.textContent = displayOne.textContent.slice(0, -3);
    }
}



