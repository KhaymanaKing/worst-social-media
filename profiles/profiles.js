import { renderKarmaEl, renderMessagesEl } from '../render-utils.js';
import { getProfiles, getProfile, getMessagesByRecipient, createMessage, incrementKarma, decrementKarma } from '../fetch-utils.js';
import { checkAuth, logout } from '../fetch-utils.js';

const profileDiv = document.querySelector('.profile');
const logoutButton = document.querySelector('.logout');

checkAuth();

const profile = await getProfile(3);


const karmaEl = await renderMessagesEl(profile.id);

profileDiv.append(karmaEl);


logoutButton.addEventListener('click', () => {
    logout();
});