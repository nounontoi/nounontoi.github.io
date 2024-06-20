function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function RollDice(sides) {
    rollCount = document.getElementById("rollCount").value;
    const rollResults = [];
    for (i = 0; i < rollCount; i++) {
        roll = randomInt(1, sides + 1)
        rollResults[i] = roll;
    }
    const sum = rollResults.reduce((partialSum, a) => partialSum + a, 0);
    AddHistory(rollResults, sum)
    document.getElementById("rollResults").innerHTML = "Rolled: " + rollCount + "d" + sides + "<br><br>" + rollResults.join("<br>") + "<br><br>" + "Sum: " + sum;
    return rollResults;
}

function RollInitiative() {
    roll = randomInt(1, 21)
    document.getElementById("rollResults").innerHTML = "Rolled initiative" + "<br><br>" + roll + "<br><br>";
    return rollResults;
}

function AddHistory(rolls, sum) {
    previousRolls = document.getElementById("rollHistory").innerHTML;
    document.getElementById("rollHistory").innerHTML = rolls.join(", ") + "<br>Sum: " + sum + "<br><br><br>" + previousRolls;
}