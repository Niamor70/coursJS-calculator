var operations = [""];

function resetResult() {
    $('#result').html('');
    operations = [""];
}

function displayResult() {
    var elem = $('#result');
    elem.html('');
    for (var i = 0; i < operations.length; i++) {
        elem.append(' ' + operations[i]);
    }
}

$('.btn').click(function () {
    switch ($(this).html()) {

        case "=":
            calculator();
            break;
        case "c":
            resetResult();
            break;
        case "+":
        case "-":
        case "/":
        case "*":
            addOperator($(this).html());
            break;
        default:
            addNumber($(this).html());
            break;

    }

    displayResult();

});

function isOperator(operator) {
    return operator === "+" || operator === "-" || operator === "*" || operator === "/";
}

function addNumber(number) {
    if (result) {
        resetResult();
    }
    if (isOperator(operations[operations.length - 1])) {
        operations.push(number);
    } else {
        operations[operations.length - 1] += number;
    }
    result = false;
}

function addOperator(operator) {
    if (isOperator(operations[operations.length - 1])) {
        operations[operations.length - 1] = operator;
    } else {
        operations.push(operator);
    }
    result = false;
}

function calculator() {
    if (isOperator(operations[operations.length - 1])) {
        operations.pop();
    }

    if (operations.length === 1) {
        return true;
    }

    while (operations.length >= 3) {
        partialCalculator();
    }

    result = true;

}

var result = false;

function partialCalculator() {

    var index = 1;
    for (var i = 1; i < operations.length; i += 2) {
        if (operations[i] === "*" || operations[i] === "/") {
            index = i;
        }
    }

    switch (operations[index]) {
        case '+':
            resultat = parseInt(operations[index - 1]) + parseInt(operations[index + 1]);
            break;
        case '-':
            resultat = operations[index - 1] - operations[index + 1];
            break;
        case '*':
            resultat = operations[index - 1] * operations[index + 1];
            break;
        case '/':
            resultat = operations[index - 1] / operations[index + 1];
            break;
    }

    operations.splice(index - 1, 2);
    operations[index - 1] = Math.round(resultat * 100) / 100;

}

$(document).keypress(function (event) {

    if (event.keyCode >= 48 && event.keyCode <= 57) {
        addNumber(String.fromCharCode(event.keyCode));
    }

    if (event.keyCode === 42 || event.keyCode === 43 || event.keyCode === 45 || event.keyCode === 47) {
        addOperator(String.fromCharCode(event.keyCode));
    }

    if (event.keyCode === 13) {
        calculator();
    }

    displayResult();
});
