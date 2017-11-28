// add your code here to make the calculator work

var operations = [""];

function resetResult() {
	$('#result').html('');
	operations = [""];
}

function displayResult() {
	$('#result').html('');
	for(i = 0 ; i < operations.length ; i++) {
		$('#result').append(' '+operations[i]);
	}
	console.log(operations);
}

$('.btn').click(function() {
	switch( $(this).html() ) {

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
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			addNumber($(this).html());
			break;

	}

	displayResult();
	
});

function addNumber(number) {
	if( result == true ) {
		resetResult();
	}
	if ( operations[operations.length-1] === "+"
			|| operations[operations.length-1] === "-"
			|| operations[operations.length-1] === "*"
			|| operations[operations.length-1] === "/"
		 )
	{
		operations.push(number);
	} else {
		operations[operations.length-1] += number;
	}
	result = false;
}

function addOperator(operator) {
	if ( operations[operations.length-1] === "+"
		|| operations[operations.length-1] === "-"
		|| operations[operations.length-1] === "*"
		|| operations[operations.length-1] === "/"
	 ) {
		operations[operations.length-1] = operator;
	} else {
		operations.push(operator);
	}
	result = false;
}

function calculator() {
	if ( operations[operations.length-1] === "+"
			|| operations[operations.length-1] === "-"
			|| operations[operations.length-1] === "*"
			|| operations[operations.length-1] === "/"
		 )
	{
		operations.pop();
	}

	if ( operations.length == 1 ) {
		return true;
	}

	while ( operations.length >= 3 )
	{
		partialCalculator();
	}

	result = true;

	console.log(resultat);

}

var result = false;

function partialCalculator() {

	var index = 1;
	for( i = 1 ; i < operations.length ; i+=2 ) {
		if ( operations[i] == "/" ) {
			index = i;
		}
	}
	for( i = 1 ; i < operations.length ; i+=2 ) {
		if ( operations[i] == "*" ) {
			index = i;
		}
	}

	switch( operations[index] ) {
		case '+':
			resultat = parseInt(operations[index-1]) + parseInt(operations[index+1]);
			break;
		case '-':
			resultat = operations[index-1] - operations[index+1];
			break;
		case '*':
			resultat = operations[index-1] * operations[index+1];
			break;
		case '/':
			resultat = operations[index-1] / operations[index+1];
			break;
	}

	operations.splice(index-1, 2);
	operations[index-1] = resultat;

}

$(document).keypress(function(event) {

	if ( event.keyCode >= 48 && event.keyCode <= 57 ) {
		addNumber(String.fromCharCode(event.keyCode));
	}

	if ( event.keyCode == 42 || event.keyCode == 43 || event.keyCode == 45 || event.keyCode == 47 ) {
		addOperator(String.fromCharCode(event.keyCode));
	}

	if ( event.keyCode == 13 ) {
		calculator();
	}

	console.log(event.keyCode);
	displayResult();
});
