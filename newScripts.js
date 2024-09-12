// On load
window.addEventListener("DOMContentLoaded", function () {
    // this.window.sessionStorage.setItem("currentTheme", "blue");
    switch (window.location.pathname) {
        case "/RPGTools.html":
            LoadHistory();
            break;
        case "/index.html":
            var title = this.document.getElementById("title");
            title.style.transition = "all 0.4s ease-out";
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

function RollDice(sides) {
    rollCount = document.getElementById("rollCount").value;
    modifier = document.getElementById("modifier").value;
    const rollResults = [];
    for (i = 0; i < rollCount; i++) {
        roll = RandomInt(1, sides + 1)
        rollResults[i] = roll + Number(modifier);
    }
    const sum = rollResults.reduce((partialSum, a) => partialSum + a, 0);
    UpdateHistory(("d" + sides), rollResults, sum);
    document.getElementById("rollResults").innerHTML = "<span style='font-size: 40px'>" + rollCount + "d" + sides + "</span><br><br>" + rollResults.join("<br>") + "<br><br>" + "Sum: " + sum;
}

function RollInitiative() {
    roll = RandomInt(1, 21)
    modifier = document.getElementById("initiativeModifier").value;
    total = Number(roll) + Number(modifier);
    document.getElementById("rollResults").innerHTML = "<span style='font-size: 40px'>Initiative" + "</span><br><br>" + "Modifier: " + modifier + "<br><br>" + roll + " + " + modifier + "<br><br>" + total + "<br><br>";
    UpdateHistory("Initiative", [roll], [total]);
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

function UpdateHistory(rollType, rolls, sum) {
    previousRolls = document.getElementById("rollHistory").innerHTML;
    document.getElementById("rollHistory").innerHTML = "<div class='historyElements'><span style='color: #e53170'>" + rollType + "</span><br>" + rolls.join(", ") + "<br>Sum: " + sum + "</div>" + previousRolls;
    previousRolls = document.getElementById("rollHistory").innerHTML;
    window.localStorage.setItem(rollHistory, previousRolls);
}

function LoadHistory() {
    previousRolls = window.localStorage.getItem(rollHistory);
    if (previousRolls) {
        document.getElementById("rollHistory").innerHTML = previousRolls;
    }
}

function ClearHistory() {
    document.getElementById("rollHistory").innerHTML = "";
    window.localStorage.setItem(rollHistory, "");
}

document.getElementById("rollCount").addEventListener("blur", ValidateCount);
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

function ScrollToTop() { scrollTo({ top: 0, behavior: 'smooth' }) }