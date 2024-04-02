let solarPanelOutput = 1361; // W/m², average solar constant at the Moon's surface
let batteryCapacity = 100000; // Wh, arbitrary starting value 100 kwh starting battery
let batteryCharge = 0; // Wh
let lunarRegolith = 0; // kg
let lunarRegolithCapacity = 100; // kg, arbitrary starting value 100 kg

let silica = 0; // kg
let ilmenite = 0; // kg
let anorthite = 0; // kg
let olivine = 0; // kg
let pyroxene = 0; // kg

function showMessage(message) {
    document.getElementById("message-box").innerText = message;
}

function chargeBattery() {
    let chargeAmount = solarPanelOutput * 0.2; // 20% efficiency for solar panel
    batteryCharge = Math.min(batteryCharge + chargeAmount, batteryCapacity);
    updateDisplay();
}

// Charge the battery at a constant rate
setInterval(chargeBattery, 1000); // Charge every 1000 milliseconds (1 second)

function collectRegolith() {
    if (lunarRegolith >= lunarRegolithCapacity) {
        showMessage("Lunar regolith capacity is full!");
        return;
    }
    if (batteryCharge >= 100) {
        batteryCharge -= 100;
        lunarRegolith += 1; // Collect 1 kg of regolith per 100 Wh
        updateDisplay();
    } else {
        showMessage("Not enough battery charge to collect regolith!");
    }
}

function updateDisplay() {
    document.getElementById("solar-panel-output").innerText = solarPanelOutput;
    document.getElementById("battery-capacity").innerText = batteryCapacity;
    document.getElementById("battery-charge").innerText = batteryCharge.toFixed(2);
    document.getElementById("lunar-regolith").innerText = lunarRegolith;
    document.getElementById("lunar-regolith-capacity").innerText = lunarRegolithCapacity;
    document.getElementById("silica").innerText = silica;
    document.getElementById("ilmenite").innerText = ilmenite;
    document.getElementById("anorthite").innerText = anorthite;
    document.getElementById("olivine").innerText = olivine;
    document.getElementById("pyroxene").innerText = pyroxene;

    // Show or hide the sort regolith button
    if (lunarRegolith >= 10) {
        document.getElementById("sort-regolith-button").classList.remove("hidden");
    } else {
        document.getElementById("sort-regolith-button").classList.add("hidden");
    }

    // Show or hide the materials container
    if (silica > 0 || ilmenite > 0 || anorthite > 0 || olivine > 0 || pyroxene > 0) {
        document.getElementById("materials-container").classList.remove("hidden");
    } else {
        document.getElementById("materials-container").classList.add("hidden");
    }
}

function sortRegolith() {
    // Make sure we have enough power to sort
    if (batteryCharge >= 1000) {
        batteryCharge -= 1000;
    } else {
        showMessage("Not enough battery charge to sort regolith!");
        return;
    }

    // Sort 10 kg of regolith into 4 kg silica, 2 kg ilmenite, 2 kg anorthite, 1 kg olivine, 1 kg pyroxene
    if (lunarRegolith >= 10) {
        lunarRegolith -= 10;
        silica += 4;
        ilmenite += 2;
        anorthite += 2;
        olivine += 1;
        pyroxene += 1;
        updateDisplay();
    } else {
        showMessage("Not enough regolith to sort!");
    }
}
