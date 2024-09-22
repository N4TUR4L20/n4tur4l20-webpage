const energyForm = document.getElementById("energy-form");
const resultDiv = document.getElementById("result");

energyForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let energyLimit;
	while (true) {
		energyLimit = parseFloat(document.getElementById("energy-limit").value);
		if (isNaN(energyLimit) || energyLimit <= 0) {
			alert("Energy limit must be greater than 0 and a valid number.");
			return;
		} else {
			break;
		}
	}

	const timeIntervalInput = document.getElementById("time-interval");
	let timeInterval;
	while (true) {
		timeInterval = parseFloat(timeIntervalInput.value);
		if (isNaN(timeInterval) || timeInterval <= 0) {
			alert("Time interval must be greater than 0 and a valid number.");
			return;
		} else {
			break;
		}
	}

	const generators = {
		"Antimatter Generator": {
			drop_sell_price: 25000,
			energy_consumption: 750,
		},
		"Dark Matter Generator": {
			drop_sell_price: 20000,
			energy_consumption: 600,
		},
		"Quantum Foam Generator": {
			drop_sell_price: 15000,
			energy_consumption: 450,
		},
		"Chronos Cube Generator": {
			drop_sell_price: 10000,
			energy_consumption: 300,
		},
		"Graviton Generator": {
			drop_sell_price: 8000,
			energy_consumption: 240,
		},
		"Hawking Particle Generator": {
			drop_sell_price: 6500,
			energy_consumption: 195,
		},
		"Tachyon Shard Generator": {
			drop_sell_price: 5000,
			energy_consumption: 150,
		},
		"Cosmophage Generator": {
			drop_sell_price: 4000,
			energy_consumption: 120,
		},
		"Photon Gel Generator": {
			drop_sell_price: 3000,
			energy_consumption: 90,
		},
		"Neuronium Generator": {
			drop_sell_price: 2500,
			energy_consumption: 75,
		},
		"Rufous Void Generator": {
			drop_sell_price: 2000,
			energy_consumption: 60,
		},
		"Axiom Droplet Generator": {
			drop_sell_price: 1500,
			energy_consumption: 45,
		},
		"Starcluster Dust Generator": {
			drop_sell_price: 1000,
			energy_consumption: 30,
		},
		"Exomatrix Generator": { drop_sell_price: 800, energy_consumption: 24 },
		"Neutronium Generator": {
			drop_sell_price: 650,
			energy_consumption: 19.5,
		},
		"Xenobiota Spore Generator": {
			drop_sell_price: 400,
			energy_consumption: 12,
		},
		"Crystalloid Generator": {
			drop_sell_price: 300,
			energy_consumption: 9,
		},
		"Plasma Flux Generator": {
			drop_sell_price: 250,
			energy_consumption: 7.5,
		},
		"Cortosis Generator": { drop_sell_price: 200, energy_consumption: 6 },
		"Malachite Generator": {
			drop_sell_price: 150,
			energy_consumption: 4.5,
		},
		"Blue Cobalt Generator": {
			drop_sell_price: 100,
			energy_consumption: 3,
		},
		"Aurum Generator": { drop_sell_price: 50, energy_consumption: 1.5 },
		"Carbon Generator": { drop_sell_price: 30, energy_consumption: 0.9 },
		"Ice Crystal Generator": {
			drop_sell_price: 20,
			energy_consumption: 0.6,
		},
		"Space Dust Generator": {
			drop_sell_price: 10,
			energy_consumption: 0.3,
		},
	};

	function calculateTotalDropSellPrice(generatorsCombination) {
		let totalDropSellPrice = 0;
		let totalEnergyConsumption = 0;
		for (const generator in generatorsCombination) {
			totalDropSellPrice +=
				generators[generator]["drop_sell_price"] *
				generatorsCombination[generator];
			totalEnergyConsumption +=
				generators[generator]["energy_consumption"] *
				generatorsCombination[generator];
		}
		return [totalDropSellPrice, totalEnergyConsumption];
	}

	function findOptimalGeneratorsCombination(energyLimit) {
		let optimalCombination = {};
		let remainingEnergy = energyLimit * 20;
		let remainingQuantity = 24;
		const generatorsSorted = Object.entries(generators).sort(
			(a, b) =>
				b[1]["drop_sell_price"] / b[1]["energy_consumption"] -
				a[1]["drop_sell_price"] / a[1]["energy_consumption"]
		);
		for (const [generator, properties] of generatorsSorted) {
			const quantity = Math.min(
				remainingQuantity,
				Math.floor(remainingEnergy / properties["energy_consumption"])
			);
			if (quantity > 0) {
				optimalCombination[generator] = quantity;
				remainingEnergy -= properties["energy_consumption"] * quantity;
				remainingQuantity -= quantity;
				if (remainingEnergy <= 0) {
					break;
				}
			}
		}
		return optimalCombination;
	}

	const optimalCombination = findOptimalGeneratorsCombination(energyLimit);
	const [totalDropSellPrice, totalEnergyConsumption] =
		calculateTotalDropSellPrice(optimalCombination);

	// calculate total credits generated per hour
	const creditsPerHour = totalDropSellPrice * 180; // 180 siklus per jam

	// calculate credits generated in custom time interval
	const creditsInTimeInterval = creditsPerHour * (timeInterval / 60);

	let resultHtml = "<h2>Optimal Generators Combination:</h2><ul>";
	for (const [generator, quantity] of Object.entries(optimalCombination)) {
		resultHtml += `<li>${generator}: ${generators[generator]["drop_sell_price"]} Credits, ${generators[generator]["energy_consumption"]} Hc (Quantity: ${quantity})</li>`;
	}
	resultHtml += `</ul><p>Total drop sell price: ${totalDropSellPrice} Credits</p><p>Total energy consumption: ${totalEnergyConsumption} Hc</p><p>Credits in ${timeInterval} minutes: ${creditsInTimeInterval} Credits</p>`;
	resultDiv.innerHTML = resultHtml;
});
