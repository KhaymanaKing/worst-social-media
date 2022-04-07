import { client, checkAuth, getActivePlayers, updatePlayer, getMyProfile, logout, getUser } from '../fetch-utils.js';

checkAuth();

let currentPlayer;

const allPlayersEl = document.querySelector('.all-players');
const toggleButtonEl = document.querySelector('.toggle');
const logoutButtonEl = document.querySelector('.logout');


window.addEventListener('keydown', async (e) => {
    if (e.key === 'w') currentPlayer.y_position -= 10;
    if (e.key === 'd') currentPlayer.x_position += 10;
    if (e.key === 's') currentPlayer.y_position += 10;
    if (e.key === 'a') currentPlayer.x_position -= 10;

    await updatePlayer(currentPlayer);
});

window.addEventListener('load', async () => {
    currentPlayer = await getMyProfile(getUser().email);

    await fetchAndDisplayActivePlayers();

    
    await client
        .from('profiles')
        .on('UPDATE', async (payload) => {
            await fetchAndDisplayActivePlayers();
        })
        .subscribe();

    currentPlayer.is_playing = true;
    updatePlayer(currentPlayer);
    
});


async function fetchAndDisplayActivePlayers() {
    allPlayersEl.textContent = '';
    const activePlayers = await getActivePlayers();

    for (let player of activePlayers) {
        const playerEl = document.createElement('div');
        playerEl.textContent = `👽 ${player.email}`;
        playerEl.classList.add('player');
        playerEl.style.transform = `translate(${player.x_position}px, ${player.y_position}px)`;
        
        allPlayersEl.append(playerEl);
        
    }
    return activePlayers;
}

toggleButtonEl.addEventListener('click', async () => {
    currentPlayer.is_playing = !currentPlayer.is_playing;
    
    await updatePlayer(currentPlayer);

    fetchAndDisplayActivePlayers();
});


logoutButtonEl.addEventListener('click', () => {
    currentPlayer.is_playing = false;
    updatePlayer(currentPlayer);
    logout();

});