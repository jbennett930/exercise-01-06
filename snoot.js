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

// function to remove select list defaults
function removeSelectDefaults() {
var emptyBoxes = document.getElementsByTagName("select");
for (var i = 0; i < emptyBoxes.length; i++) {
emptyBoxes[i].selectedIndex = -1;
}
}
// Function to setup document fragments for days of the month.
function setUpDays(){
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
    document.querySelector("#deliveryAddress select");
    document.querySelector("#billingAddress select");
    
}
// duplicate address - checkbox not checked - erase
else {
    for (var i = 0; i < billingInputElements.length; i++) {
     deliveryInputElements[i + 1].value = billingInputElements[i].value;
    }
    document.querySelector("#deliveryAddress select").selectedIndex = -1;
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
    }
    else if (deliveryMonth.attachEvent) {
        deliveryMonth.attachEvent("onchange", updateDays);
    }
    var deliveryYear = document.getElementById("delivYr");
    if (deliveryYear.addEventListener) {
        deliveryYear.addEventListener("change", updateDays, false);
    }
    else if (deliveryYear.attachEvent) {
        deliveryYear.attachEvent("onchange", updateDays);
    }
    var messageBox = document.getElementById("customText");
    if (messageBox.addEventListener) {
        messageBox.addEventListener("change", autoCheckCustom, false);
    }
    else if (messageBox.attachEvent) {
        messageBox.attachEvent("onchange", autoCheckCustom);
    }
    var same = document.getElementById("sameAddr");
    if (same.addEventListener) {
        same.addEventListener("change", copyBillingAddress, false);
    }
    else if (same.attachEvent) {
        same.attachEvent("onchange", copyBillingAddress);
    }
    }

// page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}