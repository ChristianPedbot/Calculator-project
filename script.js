const display = document.getElementById("display");
const buttonClear = document.getElementById("buttonClear");
const buttonEqual = document.getElementById("buttonEqual");
const buttonNumber = document.querySelectorAll(".buttonNumber");
const buttonFunction = document.querySelectorAll(".buttonFunction");

buttonNumber.forEach(buttonNum => {
    buttonNum.addEventListener("click", function() {
        let number = this.textContent;
        display.textContent += number;
    });
});

buttonFunction.forEach(buttonFunct => {
    buttonFunct.addEventListener("click", function() {
        let funct = this.textContent;
        display.textContent += funct;
    });
});

buttonClear.onclick = function() {
    display.textContent = "";
}

function evaluateExpression(expression) {

    // Verifica se a expressão contém caracteres inválidos
    var validChars = /^[0-9+\-*/().\s]+=?$/;
    if (!validChars.test(expression)) {
        return 'Erro';
    }
    try {
        var result = evalManual(expression);
        if (!isFinite(result)) {
            return 'Erro';
        }
        return result;
    } catch (error) {
        return 'Erro';
    }
}

function evalManual(expression) {
    expression = expression.replace(/=/g, '');
    return eval(expression);
}

buttonEqual.onclick = function() {
    var expression = display.textContent;
    var result = evaluateExpression(expression);
    display.textContent = result;
}
