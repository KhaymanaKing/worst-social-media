import { getProfiles } from '../fetch-utils.js';
import { checkAuth, logout } from '../fetch-utils.js';

const profilesDiv = document.querySelector('.profiles-list');
const logoutButton = document.querySelector('.logout');

checkAuth();

async function fetchAndDisplay(){
    const profiles = await getProfiles();
    profiles.textContent = '';
    console.log(profiles);
    for (let profile of profiles) {
        const profileEl = document.createElement('div');
        const linkEl = document.createElement('a');

        profileEl.classList.add('profile-link');

        linkEl.href = `../user-detail/?id=${profile.id}`;
        linkEl.textContent = `${profile.email}`;

        profileEl.append(linkEl);
        profilesDiv.append(profileEl);
    }
}

window.addEventListener('load', async () => {
    await fetchAndDisplay();
});

logoutButton.addEventListener('click', () => {
    logout();
});