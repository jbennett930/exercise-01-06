/* 
    snoot.js 
    form validation code for snoot.html

    Author: Mark J. Buckler
    Date: 6 August 2018 
*/
"use strict";

var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
var formValidity = true;

// function to remove select list defaults
function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }
}

// Function to setup document fragments for days of the month.
function setUpDays() {
    var dates = document.getElementById("delivDy").getElementsByTagName("option");
    twentyNine.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true));

}
// function to set up the list of based on the selected month
function updateDays() {
    var deliveryDay = document.getElementById("delivDy");
    var dates = deliveryDay.getElementsByTagName("option");
    var deliveryMonth = document.getElementById("delivMo");
    var deliveryYear = document.getElementById("delivYr");
    if (deliveryMonth.selectedIndex === -1) {
        return;
    }
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }
    if (deliveryYear.selectedIndex === -1) {
        deliveryDay.selectedIndex = 0;
    }
    // if its feb and 2020 twentyNine
    if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020") {
        deliveryDay.appendChild(twentyNine.cloneNode(true));
    }
    // else if 30 day month thirty
    else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11") {
        deliveryDay.appendChild(thirty.cloneNode(true));
    }
    // else if 31 days thirtyOne
    else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" || selectedMonth === "12") {
        deliveryDay.appendChild(thirtyOne.cloneNode(true));
    }
}

// Function to inspect custom check box on message change
function autoCheckCustom() {
    var messageBox = document.getElementById("customText");
    // text area has message check the box
    if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) {
        document.getElementById("custom").checked = "checked";
    }
    // 
    else {
        document.getElementById("custom").checked = "";
    }
}

// function to copy billing to delivery address 
function copyBillingAddress() {
    var billingInputElements = document.querySelectorAll("#billingAddress input");
    var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");
    // duplicate address - checkbox is checked - copy 
    // duplicate address - checkboxnut checked - erase
    if (document.getElementById("sameAddr").checked)
        for (var i = 0; i < billingInputElements.length; i++) {
            {
                deliveryInputElements[i + 1].value = billingInputElements[i].value;
            }
            document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;

        }
    // duplicate address - checkbox not checked - erase
    else {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = "";
        }
        document.querySelector("#deliveryAddress select").selectedIndex = -1;
    }
}

// function to validate address
function validateAddress(fieldsetId) {
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement;
    try {
        // loop through input fields looking for blanks
        for (var i = 0; i < elementCount; i++) {
            currentElement = inputElements[i];
            // blanks
            if (currentElement.value === "") {
                currentElement.style.background = "rgb(255, 233, 233)";
                fieldsetValidity = false;
            }
            // not blanks
            else {
                currentElement.style.background = "white";
            }
        }
        if (fieldsetValidity === false) {
            if (fieldsetId === "billingAddress") {
                throw "Please complete all Billing Address Information."
            } else {
                throw "Please complete all Delivery Address Information."
            }
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

function validateDeliveryAddress() {
    var selectElements = document.querySelectorAll("#deliveryDate" + " select");
    var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = selectElements.length;
    var currentElement;
    try {
        // loop through select fields looking for blanks
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            // blanks
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            }
            // not blanks
            else {
                currentElement.style.border = "";
            }
        }
        if (fieldsetValidity === false) {
            throw "Please specify a Delivery Date."
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

// Function to validate Payment
function validatePayment() {
    var errorDiv = document.querySelectorAll("#paymentInfo" + " .errorMessage")[0];
    var fieldsetValidity = false;
    var ccNumElement = document.getElementById("ccNum");
    var selectElements = document.querySelectorAll("#paymentInfo" + " select");
    var elementCount = selectElements.length;
    var cvvElement = document.getElementById("cvv");
    var cards = document.getElementsByName("PaymentType");
    var currentElement;
    try {
//validate radio buttons one must be on
if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.outline = "1px solid red";
    }
    fieldsetValidity = false;
}
else {
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.outline = "";
    }
}

// validate card num
if (ccNumElement.value === "") {
    ccNumElement.style.background = "rgb(255, 233, 233)";
    formValidity = false;
}
        if (fieldsetValidity === false) {
            throw "Please validate Payment."
        } else {
            errorDiv.style.display = "none";

            errorDiv.innerHTML = "";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
    
for (var i = 0; i < elementCount; i++) {
    currentElement = selectElements[i];
    // blanks
    if (currentElement.selectedIndex === -1) {
        currentElement.style.border = "1px solid red";
        fieldsetValidity = false;
    }
    // not blanks
    else {
        currentElement.style.border = "";
    }
}

if (cvvElement.selectedIndex === -1) {
    cvvElement.style.background = "1px solid red";
    fieldsetValidity = false;
}
// not blanks
else {
    cvvElement.style.background = "";
}


}

function validateMessage() {
    var msgBox = document.getElementById("customText");
    var errorDiv = document.querySelectorAll("#message" + " .errorMessage")[0];
    var fieldsetValidity = true;
    
    try {
//   validate checkbox and text area custom message
if (document.getElementById("custom").checked && (msgBox.value === "" || msgBox.value === msgBox.placeholder)) {
    throw "please enter your custom message text."
}
else {
    errorDiv.style.display = "none";
    errorDiv.innerHTML = "";
    msgBox.style.background = "white";
}
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        msgBox.style.background = "rgb(255, 233, 233)";
        formValidity = false;
    }
}

function validateCreateAccount() {
    var errorDiv = document.querySelectorAll("#createAccount" + " .errorMessage")[0];
    var usernameElement = document.getElementById("username");
    var pass1Element = document.getElementById("pass1");
    var pass2Element = document.getElementById("pass2");
    var invColor = "rgb(255, 233, 233)";
    var passwordMismatch = false;
    var fieldsetValidity = true;
    usernameElement.style.background = "white";
    pass1Element.style.background = "white";
    pass2Element.style.background = "white";
    errorDiv.style.display = "none";
    errorDiv.innerHTML = "";

    try {
        if (usernameElement.value != "" && pass1Element.value != "" && pass2Element.value != "") {
            // one or more fields has data
            if (pass1Element.value != pass2Element.value) { //verify passwords match
                throw "passwords entered do not match, please re-enter.";
            }
        }
        else if (usernameElement.value === "" && pass1Element.value === "" && pass2Element.value === "") {//no fields have data
            fieldsetValidity = true;
            passwordMismatch = false;
        }
        else {
            fieldsetValidity = false;
            throw "Please Enter all fields to Create Account.";
        }
//   validate checkbox and text area custom message
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        pass1Element.style.background = invColor;
        pass2Element.style.background = invColor;
        formValidity = false;
        if (passwordMismatch) {
            usernameElement.style.background = "white";
        } else {
            usernameElement.style.background = invColor;
        }
    }
}


// function to validate entire form
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    formValidity = true;

    validateAddress("billingAddress");
    validateAddress("deliveryAddress");
    validateDeliveryAddress();
    validatePayment();
    validateMessage();
    validateCreateAccount();
    // form is valid
    if (formValidity === true) {
        document.getElementById("errorText").innerHTML = "";
        document.getElementById("errorText").style.display = "none";
        document.getElementsByTagName('form')[0].submit();
    }
    // form isnt valid
    else {
        document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order.";
        document.getElementById("errorText").style.display = "block";
        scroll(0, 0);
    }
}

// Function that sets up page on load event
function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    createEventListeners();
}

// function to create our event listeners
function createEventListeners() {
    var deliveryMonth = document.getElementById("delivMo");
    if (deliveryMonth.addEventListener) {
        deliveryMonth.addEventListener("change", updateDays, false);
    } else if (deliveryMonth.attachEvent) {
        deliveryMonth.attachEvent("onchange", updateDays);
    }
    var deliveryYear = document.getElementById("delivYr");
    if (deliveryYear.addEventListener) {
        deliveryYear.addEventListener("change", updateDays, false);
    } else if (deliveryYear.attachEvent) {
        deliveryYear.attachEvent("onchange", updateDays);
    }
    var messageBox = document.getElementById("customText");
    if (messageBox.addEventListener) {
        messageBox.addEventListener("change", autoCheckCustom, false);
    } else if (messageBox.attachEvent) {
        messageBox.attachEvent("onchange", autoCheckCustom);
    }
    var same = document.getElementById("sameAddr");
    if (same.addEventListener) {
        same.addEventListener("change", copyBillingAddress, false);
    } else if (same.attachEvent) {
        same.attachEvent("onchange", copyBillingAddress);
    }
    var form = document.getElementsByTagName('form')[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm, false);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", validateForm);

    }
}

// page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}