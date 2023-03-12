document.addEventListener("DOMContentLoaded", () => {

	// Variables
	let startingLife = 50;
	let startingMana = 10;

	let humanPlayerLife = 100;
	let humanPlayerMana = 100;
	let computerPlayerLife = startingLife;
	let computerPlayerMana = startingMana;

	let manaPerTurn = 1;


	// Variable global para almacenar el índice de la carta seleccionada
	let selectedCardIndex = null;

	// Graveyard/Cementerio, array para almacenar las cartas que ya han sido jugadas
	let humanPlayerGraveyard = [];
	let computerPlayerGraveyard = [];

	// Bienvenida
	const newGameBtn = document.getElementById('new-game-btn');
	const newGameForm = document.getElementById('new-game-form');

	newGameBtn.addEventListener('click', () => {
		newGameBtn.classList.add('d-none');
		newGameForm.classList.remove('d-none');
		startup();
	});

	// PREPARANDO LA PARTIDA
	const form = document.getElementById('startForm');
	function startup() {
		form.addEventListener('submit', (event) => {
			// Prevenir el comportamiento por defecto del botón
			event.preventDefault();

			// Obtener el nombre y la mitología seleccionada del formulario
			const playerName = document.getElementById('player-name').value;
			const mythologySelected = document.getElementById('mythology-select').value;

			const urlParams = new URLSearchParams();
			urlParams.append('playerName', playerName);
			urlParams.append('mythology', mythologySelected);
			const url = 'game.html?' + urlParams.toString();
			window.location.href = url;
		});

		const mythologySelect = document.getElementById("mythology-select");

		fetch("cards.json")
		.then(response => response.json())
		.then(data => {
			const mythologies = new Set(data.map(card => card.mythology));
			mythologies.forEach(mythology => {
				const option = document.createElement("option");
				option.value = mythology;
				option.textContent = mythology[0].toUpperCase() + mythology.slice(1);
				mythologySelect.appendChild(option);
			});
		})
		.catch(error => console.error(error));

		startGame()
	}

	const urlParams = new URLSearchParams(window.location.search);
	const playerName = urlParams.get('playerName');
	const mythology = urlParams.get('mythology');
	const playerInfo = [`Jugador: ${playerName}`, `Mitología: ${mythology}`];

	// COMIENZA LA PARTIDA
	function startGame() {
		// Reiniciar los valores de vida y mana de los jugadores
		let humanPlayerLife = startingLife;
		let humanPlayerMana = startingMana;
		let computerPlayerLife = startingLife;
		let computerPlayerMana = startingMana;

		// Limpiar los cementerios de ambas jugadoras
		humanPlayerGraveyard = [];
		computerPlayerGraveyard = [];

		// Reiniciar las opciones de cartas para cada jugador
		humanPlayerCards = [];
		computerPlayerCards = [];

		// Mostrar datos del Jugador
		const list = document.createElement('ul');
		playerInfo.forEach((item) => {
			const listItem = document.createElement('li');
			listItem.textContent = item;
			list.appendChild(listItem);
		});
		document.querySelector('#player-info').appendChild(list);

		// // Seleccionar aleatoriamente una carta para el jugador de la computadora
		// computerPlay();

		// // Mostrar las cartas disponibles para el jugador humano
		// showHumanPlayerCards();
	}

	// Barras de vida
	const humanPlayerLifeBar = document.querySelector('#human-player-life-bar');
	const computerPlayerLifeBar = document.querySelector('#computer-player-life-bar');

	// Mostrar Mana del Jugador
	document.querySelector('#human-player-mana').textContent = `${humanPlayerMana}`;
	document.querySelector('#computer-player-mana').textContent = `${computerPlayerMana}`;

	// Función para restar el costo de una carta del total de mana del jugador
	function subtractCostFromMana(player, card) {
		if (player === 'human') {
			humanPlayerMana -= card.cost;
			humanPlayerMana += manaPerTurn;
			document.querySelector('#human-player-mana').textContent = `${humanPlayerMana}`;
		} else if (player === 'computer') {
			computerPlayerMana -= card.cost;
			computerPlayerMana += manaPerTurn;
			document.querySelector('#computer-player-mana').textContent = `${computerPlayerMana}`;
		}
	}

	fetch('cards.json')
	.then(response => response.json())
	.then(data => {
		// Procesar el archivo JSON
		const cards = data;

		// Selecciona solo las cartas de la mitología seleccionada
		const selectedCards = cards.filter((card) => card.mythology === mythology);

		// Selecciona 10 cartas aleatorias para el jugador humano
		const humanDeck = getRandomCards(selectedCards, 10);

		// Selecciona 10 cartas aleatorias para el jugador computadora
		const computerDeck = getRandomCards(cards, 10);

		// Selecciona dos cartas aleatorias para el jugador humano de su deck
		const humanPlayerCards = getRandomCards(humanDeck, 4);
		console.log(humanPlayerCards);

		// Selecciona dos cartas aleatorias para el jugador de la computadora de su deck
		//const computerSelectedCards = cards.filter((card) => card.mythology === 'egipcia');
		const computerPlayerCards = getRandomCards(computerDeck, 4);

		// Función para seleccionar cartas aleatorias
		function getRandomCards(cards, count) {
			const shuffledCards = cards.sort(() => Math.random() - 0.5);
			return shuffledCards.slice(0, count);
		}

		function addRandomCardToHand(player, deck) {
			// Seleccionar una carta aleatoria del mazo
			let card = humanDeck[Math.floor(Math.random() * humanDeck.length)];

			// Verificar que la carta no esté en la mano del jugador
			while (humanPlayerCards.includes(card)) {
				card = humanDeck[Math.floor(Math.random() * humanDeck.length)];
			}

			// Agregar la carta a la mano del jugador
			humanPlayerCards.push(card);
		}
		// Mostrar las cartas seleccionadas para el jugador humano
		const humanPlayerCardsList = document.querySelector('#human-player-cards');
		const humanCardTemplate = document.querySelector('#human-card-template');

		// Función para actualizar el listado de cartas del jugador humano en la vista
		function updateHumanPlayerCardsView() {
			// Obtener el contenedor de cartas de la vista
			const cardsContainer = document.querySelector('#human-player-cards');

			// Vaciar el contenedor
			cardsContainer.innerHTML = '';

			// Recorrer el array de cartas del jugador humano
			humanPlayerCards.forEach((card) => {
				const cardDiv = humanCardTemplate.content.cloneNode(true);
				cardDiv.querySelector('.card-title').textContent = card.name;
				cardDiv.querySelector('.card-text').textContent = card.info;
				cardDiv.querySelector('.card-attack').textContent = `⚔️ ${card.attack}`;
				cardDiv.querySelector('.card-cost').textContent = `${card.cost} 💎`;

				// Agregar el elemento al contenedor de cartas en la vista
				cardsContainer.appendChild(cardDiv);
			});
		}

		humanPlayerCards.forEach((card) => {
			const cardDiv = humanCardTemplate.content.cloneNode(true);
			cardDiv.querySelector('.card-title').textContent = card.name;
			cardDiv.querySelector('.card-text').textContent = card.info;
			cardDiv.querySelector('.card-attack').textContent = `⚔️ ${card.attack}`;
			cardDiv.querySelector('.card-cost').textContent = `${card.cost} 💎`;

			const selectButton = cardDiv.querySelector('button')
			selectButton.addEventListener('click', () => {
				console.log('mana humano:' + humanPlayerMana)
				// Verificar si el jugador tiene suficiente mana para pagar el costo de la carta
				if (humanPlayerMana >= card.cost) {
					subtractCostFromMana('human', card);
					playRound(card, computerPlayerCards);
					addRandomCardToHand(humanPlayerCards);

					// Eliminar la carta jugada de la mano
					const index = humanPlayerCards.indexOf(card);
					if (index > -1) {
						humanPlayerCards.splice(index, 1);
					}

					//selectButton.disabled = true;
					//updateHumanPlayerCardsView();

					console.log(humanPlayerCards)
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

		// Mostrar las cartas seleccionadas para el jugador de la computadora
		const computerPlayerCardsList = document.querySelector('#computer-player-cards');
		const computerCardTemplate = document.querySelector('#computer-card-template');

		computerPlayerCards.forEach((card) => {
			const cardDiv = computerCardTemplate.content.cloneNode(true);
			cardDiv.querySelector('.card-title').textContent = card.name;
			cardDiv.querySelector('.card-text').textContent = card.info;
			cardDiv.querySelector('.card-attack').textContent = `⚔️ ${card.attack}`;
			cardDiv.querySelector('.card-cost').textContent = `${card.cost} 💎`;

			if (card.mythology) {
				cardDiv.querySelector('.myth-card').classList.add(card.mythology);
			}
			computerPlayerCardsList.appendChild(cardDiv);
		});

	})
.catch(error => {
	console.error('Error al cargar el archivo JSON:', error);
});

			// TERMINA JSON

function computerPlay(computerPlayerCards) {
	let maxAttack = 0;
	let selectedCard = null;

				// Recorrer las cartas del jugador computadora y seleccionar la de mayor ataque que pueda pagar
	computerPlayerCards.forEach((card) => {
		if (card.attack > maxAttack && card.cost <= computerPlayerMana) {
			maxAttack = card.attack;
			selectedCard = card;
		}
	});

	return selectedCard;
}

	// Mostrar resultados
function playRound(card, computerPlayerCards) {
		// seleccionar carta con mayor ataque del jugador computadora
	const opponentCard = computerPlay(computerPlayerCards);

		// restar vida del oponente según el ataque de la carta
	if(opponentCard !== null) {
		humanPlayerLife -= opponentCard.attack;
		humanPlayerLifeBar.value = humanPlayerLife;
	}
	if(card !== null) {
		computerPlayerLife -= card.attack;
		computerPlayerLifeBar.value = computerPlayerLife;
	}
	if (humanPlayerLife <= 0 || computerPlayerLife <= 0) {
					// fin del juego
		showResults();
	}

		humanPlayerGraveyard.push(card); // agregar la carta seleccionada al cementerio del jugador humano
		document.querySelector('#human-player-graveyard').textContent = `Humano jugó: ${card.name}`;

		// para la computadora
		computerPlayerGraveyard.push(opponentCard); // agregar la carta seleccionada al cementerio de la computadora
		document.querySelector('#computer-player-graveyard').textContent = `Computadora jugó: ${opponentCard.name}`;

		subtractCostFromMana('computer', opponentCard);
	}

	// resultados 
	function showResults() {
		const resultsDiv = document.getElementById('results');
		const winnerPara = document.createElement('p');
		let resultClass = '';

		if(humanPlayerLife <= 0)  {
			winner = 'Computadora';
			loser = playerName;
			winnerPara.textContent = `El ganador es ${winner}, ${loser} perdió.`;
			resultClass = 'alert-danger';
		}
		else if(computerPlayerLife <= 0) {
			winner = playerName;
			loser = 'Computadora';
			winnerPara.textContent = `El ganador es ${winner}, ${loser} perdió`;
			resultClass = 'alert-success';
		}
		else {
			winnerPara.textContent = 'Empate, ambas cartas tienen el mismo valor.';
			resultClass = 'alert-warning';
		}

		resultsDiv.innerHTML = '';
		resultsDiv.appendChild(winnerPara);
		resultsDiv.classList.add(resultClass);
		resultsDiv.style.display = 'block';

		// Obtener el modal y abrirlo
		let resultsModal = new bootstrap.Modal(document.querySelector('#resultsModal'));
		resultsModal.show();

		// Agregar manejador de eventos para el botón "Nueva Partida"
		const newGameBtn = document.querySelector('#new-game-btn');
		newGameBtn.addEventListener('click', function() {
			closeResultModal();
		});
	}

	function closeResultModal() {
		// Obtener el elemento del modal
		const modal = document.getElementById('resultsModal');

		// Ocultar el modal
		//modal.style.display = 'none';

		// Ejecutar la función resetGame() para reiniciar el juego
		resetGame();
	}


	function resetGame() {
		// Reiniciar el valor de mana
		humanPlayerMana = startingMana;
		computerPlayerMana = startingMana;

		// Reiniciar el valor de vida
		humanPlayerLife = startingLife;
		computerPlayerLife = startingLife;

		// Vaciar los cementerios
		humanPlayerGraveyard = [];
		computerPlayerGraveyard = [];

		// Habilitar todas las cartas
		const selectButton = document.querySelectorAll('.card-button');
		selectButton.forEach((button) => {
			button.disabled = false;
			button.classList.remove('disabled');
		});

		// Actualizar la visualización de la vida y el mana
		// updateManaDisplay();
		// updateLifeDisplay();

		// Cerrar el modal
		//closeModal();

		// Empezar una nueva partida
		startGame();
	}

});