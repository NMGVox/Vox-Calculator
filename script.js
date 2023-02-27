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
*Rounding if numbers exceed a certain length. *DONE!*
*Add fading animation for division by zero. *DONE!*
*Backspace *DONE!*
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
        let hal = document.querySelector(".hal");
        hal.classList.add("halvisible");
        clearHelper();
        return;
    }
    return a/b;
}

function hidehal(e){
    if (this.classList.contains("halvisible")){
        this.classList.remove("halvisible");
    }
    return;
}

function updateHistory(){
    let txt = calc.history.join(" ");
    if (txt.length >= 40){
        history_text.textContent = txt.substring((txt.length - 40));
        return;
    }
    history_text.textContent = txt;
    return;
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
    return String(result);
}

function numericHelper(e){
    let entry = e.key ? e.key : this.value;
    if(calc.evalclear === true){
        clearHelper();
    }
    if(calc.display.length >= 15){
        return;
    }
    if(right_op_trigger){
        calc.r_Op += entry;
        calc.display = calc.r_Op;
        display_text.textContent = calc.display;
        return;
    }
    calc.l_Op += entry;
    calc.display = calc.l_Op;
    display_text.textContent = calc.display;
    return;
}

function decimalHelper(e){
    if(calc.evalclear === true){
        clearHelper();
    }
    if(calc.display.length >= 15){
        return;
    }
    if(!trigger_decimal){
        alert("cannot add another decimal to this operand");
        return;
    }
    if(right_op_trigger){
        calc.r_Op += ".";
        trigger_decimal = false;
        display_text.textContent = calc.r_Op;
    }
    else{
        calc.l_Op += ".";
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
    let entry = e.key ? e.key : this.value;
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
    calc.operator = entry;
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
    let result = evaluate();
    if(result.length > 15){
        let abbr = Number(result).toExponential(3);
        display_text.textContent = abbr;
        return;
     }
     display_text.textContent = result;
     return;
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

function keyboardInput(e) {
    console.log(e.keyCode);
    switch(true){
        case e.keyCode >= 96 && e.keyCode <= 105:
            numericHelper(e);
            return;
        case (e.keyCode >= 106 && e.keyCode <= 109) || e.keyCode === 111:
            operatorHelper(e);
            return;
        case e.keyCode === 110:
            decimalHelper();
            return;
        case e.keyCode === 46:
            clearHelper();
            return;
        case e.keyCode === 13:
            evalHelper();
            return;
        case e.keyCode === 8:
            backspaceHelper();
            return;
        case e.keyCode === 189:
            switchSign();
            return;
    }
    e.preventDefault();
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

let halvis = document.querySelector(".hal");
halvis.addEventListener('click', hidehal);

window.addEventListener('keydown', keyboardInput);