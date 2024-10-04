// On load
window.addEventListener("DOMContentLoaded", function () {
    // this.window.sessionStorage.setItem("currentTheme", "blue");
    switch (window.location.pathname) {
        case "/RPGTools.html":
            document.getElementById("rollCount").addEventListener("blur", ValidateCount);
            UpdateHistory();
            break;
        case "/index.html":
            var title = this.document.getElementById("title");
            title.style.fontSize = "0";
            setTimeout(function () {
                title.style.fontSize = "7vw";
            });
            break;
    }
});

// Functions
function ChangeTheme() {
    var root = document.querySelector(":root");
    var rootS = getComputedStyle(root);
    switch (rootS.getPropertyValue("--currentTheme")) {
        case '"orange"':
            root.style.setProperty("--currentTheme", '"blue"');
            root.style.setProperty("--menuColour", "#2E236C");
            root.style.setProperty("--buttonColour", "#2E236C;");
            root.style.setProperty("--buttonColourHover", "#3c2e8b");
            root.style.setProperty("--borderColour", "#433D8B");
            break;
        case '"blue"':
            root.style.setProperty("--currentTheme", '"orange"');
            root.style.setProperty("--menuColour", "#ff8906");
            root.style.setProperty("--buttonColour", "#ff8906");
            root.style.setProperty("--buttonColourHover", "#ff9b28");
            root.style.setProperty("--borderColour", "#e53170");
            break;
    }
}

function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function IncrementRollCount(value) {
    a = document.getElementById("rollCount").value;
    document.getElementById("rollCount").value = Number(a) + value;
}

function IncrementModifier(value) {
    a = document.getElementById("modifier").value;
    document.getElementById("modifier").value = Number(a) + value;
}

function IncrementInitiative(value) {
    a = document.getElementById("initiativeModifier").value;
    document.getElementById("initiativeModifier").value = Number(a) + value;
}

let rolledJSON = [];

function RollDice(sides) {
    const results = {};
    rollCount = document.getElementById("rollCount").value;
    modifier = document.getElementById("modifier").value;
    const rollResults = [];
    const rollResultsMod = [];
    for (i = 0; i < rollCount; i++) {
        roll = RandomInt(1, sides + 1)
        rollResults[i] = roll;
        rollResultsMod[i] = roll + Number(modifier);
    }
    results.sides = sides;
    results.rolls = rollResults;
    results.rollsMod = rollResultsMod;
    results.modifier = modifier;
    results.sum = rollResultsMod.reduce((partialSum, a) => partialSum + a, 0);
    rolledJSON.push(results);
    window.localStorage.setItem("rollHistory", JSON.stringify(rolledJSON));
    UpdateHistory();
    console.log(rolledJSON);
}

function RollInitiative() {
    const results = {};
    roll = RandomInt(1, 21)
    modifier = document.getElementById("initiativeModifier").value;
    results.sides = "Initiative";
    results.roll = roll;
    results.rollMod = Number(roll) + Number(modifier);
    results.modifier = modifier;
    rolledJSON.push(results);
    window.localStorage.setItem("rollHistory", JSON.stringify(rolledJSON));
    UpdateHistory();
    console.log(rolledJSON);
}

function DisplayHistory(rollType, rolls, modifier, total) {
    document.getElementById("rollResults").innerHTML = "<span style='font-size: 40px'>" + rollType + "</span><br>" + rolls + "<br>Modifier: " + modifier + "<br>Total: " + total;
    document.getElementById("rollHistory").insertAdjacentHTML("afterbegin", "<div class='historyElements'><span style='color: #FFE1A8'>" + rollType + "</span><br>" + rolls + "<br>Modifier: " + modifier + "<br>Total: " + total + "</div>");
}

function UpdateHistory(clear = false) {
    if (!window.localStorage.getItem("rollHistory")) {
        return;
    }

    if (clear) {
        rolledJSON = [];
        window.localStorage.removeItem("rollHistory");
        document.getElementById("rollHistory").innerHTML = "";
        return;
    }

    document.getElementById("rollHistory").innerHTML = "";
    rolledJSON = JSON.parse(window.localStorage.getItem("rollHistory"));
    for (const rollI of rolledJSON) {
        if (rollI.sides == "Initiative") {
            sides = rollI.sides;
            roll = rollI.roll;
            modifier = rollI.modifier;
            total = rollI.rollMod;
            DisplayHistory(sides, roll, modifier, total);
        }
        else {
            sides = "d" + rollI.sides;
            rolls = rollI.rolls;
            modifier = rollI.modifier;
            sum = rollI.sum;
            DisplayHistory(sides, rolls, modifier, sum);
        }
    }
}

function ValidateCount() {
    a = document.getElementById("rollCount").value;
    if (a < 1) {
        document.getElementById("rollCount").value = 1;
    }
    else if (a > 99) {
        document.getElementById("rollCount").value = 99;
    }
}

function ToggleImage() {
    if (document.getElementById("imageToggle").checked) {
        document.getElementsByClassName("backgroundImage")[0].style.display = "block";
    }
    else {
        document.getElementsByClassName("backgroundImage")[0].style.display = "none";
    }
}

// let partyOn = false;
// function PartyMode() {
//     if (!partyOn) {
//         var root = document.querySelector(":root");
//         var colourList = [];
//         var hue = 0;
//         for (var i = 0; i < 360; i++) {
//             colourList.push(`hsl(${hue}, 100%, 50%)`);
//             hue = (hue + 10) % 360;
//         }
//         var colourIndex = 0;
//         setInterval(function () {
//             root.style.setProperty("--borderColour", colourList[colourIndex]);
//             root.style.setProperty("--buttonColourHover", colourList[colourIndex]);
//             colourIndex = (colourIndex + 1) % colourList.length;
//         }, 50);
//         partyOn = true;
//     }
//     else if (partyOn) {
//         var root = document.querySelector(":root");
//         root.style.setProperty("--borderColour", "#433D8B");
//         root.style.setProperty("--buttonColourHover", "#3c2e8b");
//         partyOn = false;
//     }
// }

// Side bar
var sideBarToggled = false;
let sideBar = document.getElementById("sideBar");
let sideBarToggle = document.querySelector(".sideBarToggle");

function ToggleSideBar() {
    console.log("Toggled side bar")
    console.log(sideBarToggled)
    if (sideBarToggled == false) {
        sideBarToggle.innerHTML = "X";
        sideBar.style.transform = "translate(20vw)";
        // sideBar.style.boxShadow = "box-shadow: 0 0 20px white;"
        sideBarToggled = true;
    }
    else if (sideBarToggled == true) {
        sideBarToggle.innerHTML = "☰";
        sideBar.style.transform = "translate(0)";
        sideBarToggled = false;
    }
}

document.onclick = function (e) {
    if (window.location.pathname != "/index.html") {
        if (!sideBar.contains(e.target) && !sideBarToggle.contains(e.target) && sideBarToggled == true) {
            ToggleSideBar();
        }
    }
}

function ScrollToTop() { scrollTo({ top: 0, behavior: 'smooth' }) }