// Functions
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function RollDice(sides) {
    rollCount = document.getElementById("rollCount").value;
    modifier = document.getElementById("modifier").value;
    const rollResults = [];
    for (i = 0; i < rollCount; i++) {
        roll = randomInt(1, sides + 1)
        rollResults[i] = roll + Number(modifier);
    }
    const sum = rollResults.reduce((partialSum, a) => partialSum + a, 0);
    AddHistory(sides, rollResults, sum)
    document.getElementById("rollResults").innerHTML = "Rolled: " + rollCount + "d" + sides + "<br><br>" + rollResults.join("<br>") + "<br><br>" + "Sum: " + sum;
    return rollResults;
}

function RollInitiative() {
    roll = randomInt(1, 21)
    modifier = document.getElementById("initiativeModifier").value;
    total = Number(roll) + Number(modifier);
    AddInitHis(roll, modifier, total)
    document.getElementById("rollResults").innerHTML = "Rolled initiative" + "<br><br>" + "Modifier: " + modifier + "<br><br>" + roll + " + " + modifier + "<br><br>" + total + "<br><br>";
    return rollResults;
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

function AddHistory(sides, rolls, sum) {
    previousRolls = document.getElementById("rollHistory").innerHTML;
    document.getElementById("rollHistory").innerHTML = "<div class='historyElements'><span style='color: #00cccc'>d" + sides + "</span><br>" + rolls.join(", ") + "<br>Sum: " + sum + "</div>" + previousRolls;
}

function AddInitHis(roll, modifier, total) {
    previousRolls = document.getElementById("rollHistory").innerHTML;
    document.getElementById("rollHistory").innerHTML = "<div class='historyElements'><span style='color: #00cc00'>Initiative</span><br>" + roll + " + " + modifier + "<br>Total: " + total + "</div>" + previousRolls;
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