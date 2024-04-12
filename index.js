document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from data.json file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Populate the upcoming games list
            const gamesList = document.getElementById('games-list');
            data.forEach(game => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${game.homeTeam}</strong> vs <strong>${game.awayTeam}</strong>, Date: ${game.date}, Time: ${game.time}, Tickets Left: ${game.ticketsLeft}`;
                gamesList.appendChild(listItem);
            });

            // Populate the game select dropdown for ticket purchase
            const gameSelect = document.getElementById('game-select');
            data.forEach(game => {
                const option = document.createElement('option');
                option.text = `${game.homeTeam} vs ${game.awayTeam}`;
                option.value = game.id;
                gameSelect.appendChild(option);
            });

            // Event listener for purchasing tickets
            document.getElementById('purchase-btn').addEventListener('click', purchaseTickets);

            // Event listener for dark mode toggle
            document.getElementById('dark-mode-toggle').addEventListener('change', toggleDarkMode);

            // Event listener for filtering games
            document.getElementById('filter-btn').addEventListener('click', filterGames);

            function purchaseTickets() {
                const selectedGameId = gameSelect.value;
                const selectedGame = data.find(game => game.id == selectedGameId);
                const ticketQuantity = document.getElementById('ticket-quantity').value;
                if (ticketQuantity > selectedGame.ticketsLeft) {
                    alert('Not enough tickets available!');
                } else {
                    alert(`You have purchased ${ticketQuantity} tickets for ${selectedGame.homeTeam} vs ${selectedGame.awayTeam}`);
                    // Update tickets left (not implemented, should be done via API)
                    selectedGame.ticketsLeft -= ticketQuantity;
                    document.getElementById('games-list').innerHTML = ''; // Clear games list
                    data.forEach(game => {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `<strong>${game.homeTeam}</strong> vs <strong>${game.awayTeam}</strong>, Date: ${game.date}, Time: ${game.time}, Tickets Left: ${game.ticketsLeft}`;
                        gamesList.appendChild(listItem);
                    });
                    document.getElementById('popup').style.display = 'block';
                }
            }

            function toggleDarkMode() {
                const body = document.body;
                body.classList.toggle('dark-mode');
            }

            function filterGames() {
                const searchTerm = document.getElementById('search-input').value.toLowerCase();
                const filteredGames = data.filter(game => game.homeTeam.toLowerCase().includes(searchTerm) || game.awayTeam.toLowerCase().includes(searchTerm));
                gamesList.innerHTML = '';
                filteredGames.forEach(game => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<strong>${game.homeTeam}</strong> vs <strong>${game.awayTeam}</strong>, Date: ${game.date}, Time: ${game.time}, Tickets Left: ${game.ticketsLeft}`;
                    gamesList.appendChild(listItem);
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    // Close popup when close button is clicked
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
    });
});
