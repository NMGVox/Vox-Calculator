let div_zero = "Dividing by zero, huh?";
let calc = {
    "l_Op": "",
    "r_Op": "",
    "operator": "",
    "display": "",
    "history": [],
    "evalclear": false,
}
let right_op_trigger = false;
let trigger_decimal = true;
let display_text = document.querySelector("#display");
let history_text = document.querySelector('#history');

//Notes for self, right_trigger is switched to true when an operator is pressed.
//What if a user presses a numeric button right after eval is run? 
//Have a flag that changes when eval is run. If a numeric is pressed when the flag is true, clear everything.
/*
TO-DO 2-24-2023
*What if a user presses a numeric button right after eval is run? *DONE!*
*Rounding if numbers exceed a certain length.
*Add fading animation for division by zero.
*Backspace
*Keyboard support
*/


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
        //Change to picture fading in and out.
        clearHelper();
        return div_zero;
    }
    return a/b;
}

function updateHistory(){
    history_text.textContent = calc.history.join(" ");
}

function evaluate(){
    let result;
    console.log(calc);
    switch (calc.operator){
        case "+":
            result =  add(+calc.l_Op, +calc.r_Op);
            break;
        case "-":
            result = subtract(+calc.l_Op, +calc.r_Op);
            break;
        case "/":
            result = divide(+calc.l_Op, +calc.r_Op);
            break;
        case "*":
            result = multiply(+calc.l_Op, +calc.r_Op);
            break;
        default:
            return("Something went terribly wrong here.");
    }
    calc.history.push(calc.operator);
    calc.history.push(calc.r_Op);
    updateHistory();
    calc.r_Op = "";
    calc.display = result;
    calc.l_Op = result;
    trigger_decimal = true;
    calc.evalclear = true;
    return result;
}

function numericHelper(e){
    if(calc.evalclear === true){
        clearHelper();
    }
    if(right_op_trigger){
        calc.r_Op += this.value;
        calc.display = calc.r_Op;
        display_text.textContent = calc.display;
        return;
    }
    calc.l_Op += this.value;
    calc.display = calc.l_Op;
    display_text.textContent = calc.display;
    return;
}

function decimalHelper(e){
    if(calc.evalclear === true){
        clearHelper();
    }
    if(!trigger_decimal){
        alert("cannot add another decimal to this operand");
        return;
    }
    if(right_op_trigger){
        calc.r_Op += this.value;
        trigger_decimal = false;
        display_text.textContent = calc.r_Op;
    }
    else{
        calc.l_Op += this.value;
        trigger_decimal = false;
        display_text.textContent = calc.l_Op;
    }
    return;
}

function clearHelper(){
    calc.display = "";
    calc.l_Op = "";
    calc.r_Op = "";
    calc.operator = "";
    calc.history = [];
    updateHistory();
    display_text.textContent  = calc.display;
    right_op_trigger = false;
    calc.evalclear = false;
    return;
}

//Backspace helper should only run on the left or right operand. If evalclear is enabled, don't clear the display text.
function backspaceHelper(e){
    if(calc.evalclear === true){
        return;
    }
    if(right_op_trigger){
        calc.r_Op = "";
        calc.display = calc.r_Op;
    }
    else{
        calc.l_Op = "";
        calc.display = calc.l_Op;
    }
    display_text.textContent = calc.display;
    return;
}

//Only allow an operator to be entered if a left operand exists. If both operands and an operator exists, evaluate the term. Only push a left operator to 
//the history array if it is the FIRST left operator manually entered by the user.
function operatorHelper(e) {
    trigger_decimal = true;
    if (calc.operator && calc.r_Op){
        display.textContent = evaluate();
    }
    if(!right_op_trigger){
        calc.history.push(calc.l_Op);
        updateHistory();
    }
    right_op_trigger = true;
    calc.display = "";
    calc.operator = this.value;
    if(calc.evalclear === true){
        calc.evalclear = false;
    }
    return;
}

function evalHelper(e) {
    if(calc.r_Op === ""){
        calc.l_Op === "" ? alert("please provide a lefthand operand") : 
            calc.operator === "" ? alert("Please provide an operator"):
                alert("Please provide a righthand operator");
        return;
    }
    display_text.textContent = evaluate();
}

function switchSign(e) {
    let res; 
    if(right_op_trigger){
        calc.r_Op = String(+calc.r_Op * -1);
        res = calc.r_Op;
    }
    else{
        calc.l_Op = String(+calc.l_Op * -1);
        res = calc.l_Op;
    }
    display_text.textContent = res;
}


let numericbtns = Array.from(document.querySelectorAll(".numeric"));
numericbtns.forEach(btn => {
    btn.addEventListener('click', numericHelper);
});

let clearbtns = Array.from(document.querySelectorAll(".clear"));
clearbtns.forEach(btn => {
    btn.addEventListener('click', clearHelper);
});

let operator_btns = Array.from(document.querySelectorAll(".operator"));
operator_btns.forEach(btn => {
    btn.addEventListener('click', operatorHelper);
});

let evalbtn = document.querySelector(".evaluate");
evalbtn.addEventListener('click', evalHelper);

let neg_pos_btn = document.querySelector(".neg-pos");
neg_pos_btn.addEventListener('click', switchSign);

let decimalbtn = document.querySelector(".decimal");
decimalbtn.addEventListener('click', decimalHelper);

let backbtn = document.querySelector(".backspace");
backbtn.addEventListener('click', backspaceHelper);