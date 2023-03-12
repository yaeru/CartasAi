function showHumanPlayerCards() {
	humanPlayerCards.forEach((card, index) => {
		const cardDiv = humanCardTemplate.content.cloneNode(true);
		cardDiv.querySelector('.card-title').textContent = card.name;
		cardDiv.querySelector('.card-text').textContent = card.info;
		cardDiv.querySelector('.card-attack').textContent = `⚔️ ${card.attack}`;
		cardDiv.querySelector('.card-cost').textContent = `${card.cost} 💎`;

		const selectButton = cardDiv.querySelector('#select-card-btn')
		selectButton.addEventListener('click', () => {
			selectCard(index);
		});

		if (card.mythology) {
			cardDiv.querySelector('.myth-card').classList.add(card.mythology);
		}

		humanPlayerCardsList.appendChild(cardDiv);
	});

	function selectCard(cardIndex) {
		const selectedCard = humanPlayerCards[cardIndex];
		console.log(`Selected card ID: ${selectedCard.id}`);
	}
}



// Mostrar cartas humanas
		function showHumanPlayerCards() {
			humanPlayerCards.forEach((card) => {
				const cardDiv = humanCardTemplate.content.cloneNode(true);
				cardDiv.querySelector('.card-title').textContent = card.name;
				cardDiv.querySelector('.card-text').textContent = card.info;
				cardDiv.querySelector('.card-attack').textContent = `⚔️ ${card.attack}`;
				cardDiv.querySelector('.card-cost').textContent = `${card.cost} 💎`;

				const selectButton = cardDiv.querySelector('#select-card-btn')
				selectButton.addEventListener('click', () => {

					// Verificar si el jugador tiene suficiente mana para pagar el costo de la carta
					if (humanPlayerMana >= card.cost) {
						subtractCostFromMana('human', card);
						playRound(card, computerPlayerCards);
						addRandomCardToHand(humanPlayerCards);
					} else {
						selectButton.disabled = true;
						alert('No tienes suficiente mana para jugar esa carta.');
					}	

				});
				if (card.mythology) {
					cardDiv.querySelector('.myth-card').classList.add(card.mythology);
				}

				humanPlayerCardsList.appendChild(cardDiv);
			});
		};