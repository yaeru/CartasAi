// Mostrar las cartas seleccionadas para el jugador humano
		const humanPlayerCardsList = document.createElement('div');
		humanPlayerCardsList.classList.add('row');
		humanPlayerCards.forEach((card) => {
			const listItem = document.createElement('ul');
			listItem.classList.add('col');
			
			const cardName = document.createElement('li');
			const cardAttack = document.createElement('li');
			const cardInfo = document.createElement('li');
			cardName.classList.add('list-group-item');
			cardAttack.classList.add('list-group-item');
			cardInfo.classList.add('list-group-item');

			cardName.textContent = card.name;
			cardAttack.textContent = `Ataque: ${card.ataque}`;
			cardInfo.textContent = `Info: ${card.info}`;
			listItem.appendChild(cardName);
			listItem.appendChild(cardAttack);
			listItem.appendChild(cardInfo);
			humanPlayerCardsList.appendChild(listItem);
		});


		// Mitología griega
			{ name: 'Zeus', mythology: 'griega', ataque: 10, info: 'Dios del trueno y el cielo, rey de los dioses' },
			{ name: 'Poseidón', mythology: 'griega', ataque: 9, info: 'Dios del mar, los terremotos y los caballos' },
			{ name: 'Hades', mythology: 'griega', ataque: 8, info: 'Dios del inframundo, el tesoro y la riqueza' },
			{ name: 'Atenea', mythology: 'griega', ataque: 7, info: 'Diosa de la sabiduría, la estrategia y la artesanía' },
			{ name: 'Apolo', mythology: 'griega', ataque: 6, info: 'Dios de la música, el arte, la poesía, el sol y la verdad' },
			{ name: 'Artemisa', mythology: 'griega', ataque: 5, info: 'Diosa de la caza, los animales salvajes y la luna' },
			{ name: 'Afrodita', mythology: 'griega', ataque: 4, info: 'Diosa del amor, la belleza y la sexualidad' },

    	// Mitología nórdica
			{ name: 'Odín', mythology: 'nórdica', ataque: 10, info: 'Dios principal de la mitología nórdica, asociado con la sabiduría, la poesía, la magia y la guerra' },
			{ name: 'Thor', mythology: 'nórdica', ataque: 9, info: 'Dios del trueno, la fuerza, la protección y los campesinos' },
			{ name: 'Loki', mythology: 'nórdica', ataque: 8, info: 'Dios del engaño, la astucia, la travesura y la magia' },
			{ name: 'Freyja', mythology: 'nórdica', ataque: 7, info: 'Diosa del amor, la fertilidad, la guerra y la muerte' },
			{ name: 'Balder', mythology: 'nórdica', ataque: 6, info: 'Dios de la belleza, la luz, la pureza y la inocencia' },
			{ name: 'Heimdall', mythology: 'nórdica', ataque: 5, info: 'Dios de la luz, la vista, el oído, la protección y el futuro' },
			{ name: 'Frigg', mythology: 'nórdica', ataque: 4, info: 'Diosa del amor, el matrimonio, la fertilidad y la maternidad' },

    	// Mitología egipcia
			{ name: 'Ra', mythology: 'egipcia', ataque: 10, info: 'Dios del sol, la creación y la fertilidad' },
			{ name: 'Osiris', mythology: 'egipcia', ataque: 9, info: 'Dios de la resurrección, la vegetación y la agricultura' },
			{ name: 'Anubis', mythology: 'egipcia', ataque: 8, info: 'Dios del embalsamamiento y del más allá.' },
			{ name: 'Horus', mythology: 'egipcia', ataque: 7, info: 'Dios del cielo, de la guerra y de la caza.' },
			{ name: 'Isis', mythology: 'egipcia', ataque: 6, info: 'Diosa de la fertilidad, la maternidad y la magia.' },
			{ name: 'Bastet', mythology: 'egipcia', ataque: 5, info: 'Diosa de la alegría, la danza y la protección de los gatos.' },
			{ name: 'Thot', mythology: 'egipcia', ataque: 4, info: 'Dios de la sabiduría, la escritura y la luna.' },
			];


		// const list = document.createElement('ul');
		// playerInfo.forEach((item) => {
		// 	const listItem = document.createElement('li');
		// 	listItem.textContent = item;
		// 	list.appendChild(listItem);
		// });
		// document.getElementById('player-info').appendChild(list);