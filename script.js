let div_zero = "I'm afraid I can't do that, user.";

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b) {
    if(b === 0){
        return div_zero;
    }
    return a/b;
}

function operate(str){
    let operands = str.split(" ");
    switch (operands[1]){
        case "+":
            return add(+operands[0], +operands[2]);
            break;
        case "-":
            return subtract(+operands[0], +operands[2]);
            break;
        case "/":
            return divide(+operands[0], +operands[2]);
            break;
        case "*":
            return multiply(+operands[0], +operands[2]);
            break;
        default:
            return("Something went terribly wrong here.");
    }
}