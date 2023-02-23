let div_zero = "I'm afraid I can't do that, user.";
let calc = {
    "l_Op": "",
    "r_Op": "",
    "operator": "",
    "display": "",
    "history": "",
}
let right_op_trigger = false;

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

function updateHelper(e){
    let display_text = document.querySelector("#display");
    if(this.value === "AC" || this.value === "C"){
        calc.display = "";
        calc.l_Op = "";
        calc.r_Op = "";
        calc.operator = "";
        calc.history = "";
        display_text.textContent  = calc.display;
        right_op_trigger = false;
        return;
    }
    else if(this.classList.contains("operator")){
        calc.display = "";
        calc.operator = this.value;
        right_op_trigger = true;
        return;
    }
    else if(this.value === "="){
        let result = operate();
        display_text.textContent = result;
    }
    else{
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
}

function operate(){
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
    return result;
}

let btns = Array.from(document.querySelectorAll(".calcbutton"));
btns.forEach(btn => {
    btn.addEventListener('click', updateHelper);
});