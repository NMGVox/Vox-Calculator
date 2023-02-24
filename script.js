let div_zero = "I'm afraid I can't do that, user.";
let calc = {
    "l_Op": "",
    "r_Op": "",
    "operator": "",
    "display": "",
    "history": "",
}
let right_op_trigger = false;
let trigger_decimal = true;
let display_text = document.querySelector("#display");

//Notes for self, right_trigger is switched to true when an operator is pressed. 


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
    calc.r_Op = "";
    calc.display = result;
    calc.l_Op = result;
    trigger_decimal = true;
    return result;
}

function numericHelper(e){
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

function clearHelper(e){
    calc.display = "";
    calc.l_Op = "";
    calc.r_Op = "";
    calc.operator = "";
    calc.history = "";
    display_text.textContent  = calc.display;
    right_op_trigger = false;
    return;
}

function operatorHelper(e) {
    if (calc.operator && calc.r_Op){
        display.textContent = evaluate();
    }
    calc.display = "";
    calc.operator = this.value;
    right_op_trigger = true;
    trigger_decimal = true;
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
    display_text.textContent = result;
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