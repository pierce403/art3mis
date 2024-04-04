// Initialize arrays to store known materials and machines
let knownMaterials = [];
let knownMachines = [];

let batteryCapacity = 100000; // 1 MWh
let batteryCharge = 0; // 0 MWh

let ownedMachines = {};
let ownedMaterials = {};

// dict to track machines with auto-click enabled
let autoClickMachines = {};

// Load materials from the materials.json file
function loadMaterials() {
    fetch('materials.json')
        .then(response => response.json())
        .then(data => {
            knownMaterials = data.materials;
            displayMaterials(); // Display the materials once they are loaded
            // display how many materials were loaded to the console
            console.log(`Loaded ${knownMaterials.length} materials`);

        })
        .catch(error => console.error('Error loading materials:', error));
}

// Load machines from the machines.json file
function loadMachines() {
    fetch('machines.json')
        .then(response => response.json())
        .then(data => {
            knownMachines = data.machines;
            displayMachines(); // Display the machines once they are loaded
            // display how many machines were loaded to the console
            console.log(`Loaded ${knownMachines.length} machines`);
        })
        .catch(error => console.error('Error loading machines:', error));
}

// Display materials as cards in the materials grid
function displayMaterials() {
    const materialsGrid = document.getElementById('materials-grid');
    materialsGrid.innerHTML = ''; // Clear existing cards

    knownMaterials.forEach(material => {
        const card = document.createElement('div');
        card.className = 'card';
        // Show the name, and the quantity if the material is owned. Also description of people hover over the name.
        // If the material count is zero, or not in the dict, don't display the card.
        // Get "unit" field from the json, assume kg if not present
        // For example:  regolith (100 kg)
        if (ownedMaterials[material.name] > 0) {
            card.innerHTML = `<h3>${material.display} (${ownedMaterials[material.name]} ${material.unit || 'kg'})</h3><p>${material.description}</p>`;
            materialsGrid.appendChild(card);
        }
    });
}

// Display machines as cards in the machines grid
function displayMachines() {
    const machinesGrid = document.getElementById('machines-grid');
    machinesGrid.innerHTML = ''; // Clear existing cards

    knownMachines.forEach(machine => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${machine.name}</h3>
            <p>${machine.description}</p>
            <p>Time: ${machine.time}</p>
            <p>Energy: ${machine.energy}</p>
            <p>Inputs: ${formatMaterials(machine.inputs)}</p>
            <p>Outputs: ${formatMaterials(machine.outputs)}</p>
        `;
        // add execute button
        const executeButton = document.createElement('button');
        executeButton.innerText = 'Execute';
        executeButton.onclick = () => executeMachine(machine);
        card.appendChild(executeButton);

        // add an auto-click button that can turn auto-click on and off
        const autoClickButton = document.createElement('button');
        // set name according to autoClickMachines[machine.name]
        if (autoClickMachines[machine.name] == true) {
            autoClickButton.innerText = 'Stop Auto-Click';
        } else {
            autoClickButton.innerText = 'Start Auto-Click';
        }

        autoClickButton.onclick = () => {
            if (autoClickMachines[machine.name]) {
                autoClickMachines[machine.name] = false;
                autoClickButton.innerText = 'Start Auto-Click';
            } else {
                autoClickMachines[machine.name] = true;
                autoClickButton.innerText = 'Stop Auto-Click';
            }
        };
        card.appendChild(autoClickButton);

        machinesGrid.appendChild(card);
    });
}

// Helper function to format a list of materials for display
function formatMaterials(materials) {
    return materials.map(material => `${material.quantity} kg of ${material.material}`).join(', ');
}

// Load materials and machines when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadMaterials()
    loadMachines();
});

function step() {
    let chargeAmount = ownedMaterials['solar-panel'] * 200; // 200 W per solar panel
    batteryCharge = Math.min(batteryCharge + chargeAmount, batteryCapacity);
    // update charge display
    document.getElementById('battery-charge').innerText = batteryCharge;

    // run machines that have auto-click enabled
    for (const machineName in autoClickMachines) {
        if (autoClickMachines[machineName]) {
            const machine = knownMachines.find(machine => machine.name === machineName);
            executeMachine(machine);
        }
    }

    displayMaterials();
    displayMachines();
}

// Run this every second
setInterval(step, 1000); // Charge every 1000 milliseconds (1 second)

// set up new game
function newGame() {
    ownedMaterials['solar-panel'] = 1;
    ownedMaterials['regolith'] = 1000;
    ownedMachines['regolith-collector'] = 1;
    ownedMachines['regolith-sorter'] = 1;
}
newGame();

function showMessage(message) {
    document.getElementById("message-box").innerText = message;
}

function executeMachine(machine) {
    // ensure that there is enough energy to run the machine
    if (machine.energy > batteryCharge) {
        showMessage(`Not enough energy to run ${machine.name}`);
        return;
    }

    if (machine.inputs) {
        for (const input of machine.inputs) {
            if (!ownedMaterials[input.material] || ownedMaterials[input.material] < input.quantity) {
                showMessage(`Not enough ${input.material} to run ${machine.name}`);
                return;
            }
        }
        for (const input of machine.inputs) {
            ownedMaterials[input.material] -= input.quantity;
        }
    }
    if (machine.outputs) {
        for (const output of machine.outputs) {
            if (!ownedMaterials[output.material]) {
                ownedMaterials[output.material] = 0;
            }
            ownedMaterials[output.material] += output.quantity;
        }
    }

    // update battery charge
    batteryCharge -= machine.energy;
    showMessage(`Ran ${machine.name}`);
    displayMaterials();
    displayMachines();
}