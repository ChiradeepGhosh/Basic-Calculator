
// Global Variables
var buttonsVal = document.querySelectorAll("button");
var numBtns = document.querySelectorAll(".btn");
var input = document.querySelector(".input");
var isAnswerPrinted = false;


// Buttons List
var listOfButtons = [];
for (var i = 0; i < buttonsVal.length; i++) {
    listOfButtons.push(buttonsVal[i].textContent);
}


// Add EventListeners for All Buttons
for (var i = 0; i < numBtns.length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function (event) {
        displayOnInput(this.textContent);
        
    })
}

// Add Event Listeners for Key Down
document.addEventListener("keydown", function (event) {
    displayOnInput(event.key);
    // console.log(event);
})

function displayOnInput(key) {
    
    if(isAnswerPrinted && listOfButtons.slice(4,listOfButtons.length).includes(key) || (input.innerHTML == "Math Syntax Error !!!")) {
        input.innerHTML = 0;
        isAnswerPrinted = false;
    }
    
    if (input.innerHTML == 0 && listOfButtons.slice(4,listOfButtons.length).includes(key)) {
        input.innerHTML = key;
    }
    else if (input.innerHTML.length == 15) {
        input.innerHTML = input.innerHTML;
    }
    else if(input.innerHTML == 0 && listOfButtons.slice(0,4).includes(key)) {
        if(key != "-"){
            input.innerHTML = 0;
        }
        else{
            input.innerHTML = key;
        }
    }
    else if (listOfButtons.includes(key)) {
        
        input.innerHTML += key;
        isAnswerPrinted = false;
    }
}


// Clear All Function for "C" key
document.querySelector(".clear").addEventListener("click", function () {
    clearAll()
})

// Delete with Delete-Button
document.addEventListener("keydown", function(event){
    if(event.key == "Delete"){
        clearAll();
    }
})

function clearAll() {
    input.innerHTML = 0;
}


// BackSpace one Character one by one
document.addEventListener("keydown", function(event){
    if(event.key == "Backspace"){
        erase(event.key);
    }
})

function erase(key){
    
    if(input.innerHTML.length == 1){
        input.innerHTML = "0";
    }
    else{
        var inp = input.innerHTML.slice(0, -1);
        input.innerHTML = inp;
    }
    
}


// Calculate Result By Clicking Equals Button
document.querySelector(".equals").addEventListener("click", function () {
    calculate();
})

// Calculate Result By Pressing Enter Button
document.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        calculate();
    }
})

// Main Calculation Function
function calculate() {

    // Syntax Error Check
    if(listOfButtons.slice(0,4).includes(input.textContent.charAt(input.textContent.length - 1))){
        input.innerHTML = "Math Syntax Error !!!";
    }
    else{

        // For Calulate Function
        var inputs = input.textContent.split(/\+|\-|\*|\//g);
        var operators = input.textContent.replace(/[0-9]|\./g, "").split("");
        // For Calculate Function
        
        // Divide
        var divide = operators.indexOf("/");
        while (divide != -1) {
            var value = inputs[divide] / inputs[divide + 1];
            inputs.splice(divide, 2, value);
            operators.splice(divide, 1);
            
            divide = operators.indexOf("/");
        }
    
        // Multiply
        var multiply = operators.indexOf("*");
        while (multiply != -1) {
            var value = inputs[multiply] * inputs[multiply + 1];
            inputs.splice(multiply, 2, value);
            operators.splice(multiply, 1);
            
            multiply = operators.indexOf("*");
        }
        
        // Subtraction
        var sub = operators.indexOf("-");
        while (sub != -1) {
            var value = inputs[sub] - inputs[sub + 1];
            inputs.splice(sub, 2, value);
            operators.splice(sub, 1);
    
            sub = operators.indexOf("-");
        }
    
        // Addition
        var addition = operators.indexOf("+");
        while (addition != -1) {
            var value = Number(inputs[addition]) + Number(inputs[addition + 1]);
            inputs.splice(addition, 2, value);
            operators.splice(addition, 1);
            
            addition = operators.indexOf("+");
        }
        
    
    
        var results = inputs.toString().split(/\./g);
    
        if(results[0].length > 15){
            results[0] = (results[0])/(Math.pow(10, (results[0].length - 1)));
            result = results[0];
        }
        else if(results.length == 1){
            result = results[0];
        }
        
        else{
            results[1] = results[1].slice(0,(15 - (results[0].length)));
            var result = results.join(".");
            
        }
    
    
        input.innerHTML = result;
        isAnswerPrinted = true;
        // input.innerHTML = Number(input.innerHTML).toFixed(14);
    }

}
