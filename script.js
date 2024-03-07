const displayOne = document.getElementById("displayOne");
const buttonClear = document.getElementById("buttonClear");
const buttonPer = document.getElementById("buttonPer");
const buttonEqual = document.getElementById("buttonEqual");
const buttonRem = document.getElementById("buttonRem");
const buttonNumber = document.querySelectorAll(".buttonNumber");
const buttonFunction = document.querySelectorAll(".buttonFunction");
const buttonPoint = document.getElementById("buttonPoint");

const maxCharacteres = 15;

function evalManual(expression) {
    expression = expression.replace(/=/g, '');
    return eval(expression);
}

function evaluateExpression(expression) {
    var validChars = /^[0-9+\-*/().\s%]+=?$/;
    if (!validChars.test(expression)) {
        return 'Error';
    }
    try {
        expression = expression.replace(/%/g, '*0.01');
        let result = evalManual(expression);
        if (!isFinite(result)) {
            return 'Error';
        }
        return result;
    } catch (error) {r
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

let hasDecimal = false;

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

buttonEqual.onclick = function() {
    let expression = displayOne.textContent;
    let result = evaluateExpression(expression);
    displayOne.textContent = String(result);
    console.log(result);
    let operator = expression.match(/[\+\-\*\/]/);
    operator = operator ? operator[0] : null;
    
    if (expression.includes('/0') || expression.includes('*0')) {
        displayOne.textContent = '0';
    }
    if (displayOne.textContent.length === maxCharacteres){
        displayOne.textContent = "limit reached";
        return;
    } 
    let lastNumber = parseFloat(expression.split(operator).pop());
    if (lastResult === null) {
        lastResult = lastNumber;

    }
    let conta = evaluateExpression(lastResult + operator + lastNumber);
    if (conta !== result){
        displayOne.textContent = result;
    } 
    else if (!expression.includes('+')){
        displayOne.textContent = (conta);
    }

     

}

buttonPer.addEventListener("click", function() {
    let expression = displayOne.textContent;
    if (!expression.includes('%')) {
        displayOne.textContent += '%';
    } else {
        expression = expression.replace(/%/g, '*0.01');
        let result = evaluateExpression(expression);
        displayOne.textContent = result * 100 + '*';
    }
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
    } else if (displayOne.textContent.length >= maxCharacteres) {
        displayOne.textContent = displayOne.textContent.slice(0, -1);
    } else {
        displayOne.textContent = displayOne.textContent.slice(0, -3);
    }
    if (displayOne.textContent !== '.'){
        buttonPoint.disabled = false;
    }
}

buttonPoint.addEventListener("click", function() {
    buttonPoint.disabled = true; 
});