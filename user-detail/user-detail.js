import { checkAuth, createMessage, getMessagesByRecipient, getMyProfile, getProfile, getUser, logout, incrementKarma } from '../fetch-utils.js';
import { renderMessagesEl } from '../render-utils.js';

checkAuth();


const recipientNameHeader = document.getElementById('recipient');
const messageForm = document.querySelector('form');
const karmaUp = document.querySelector('.increment');
const karmaDown = document.querySelector('.decrement');
const karmaHeader = document.getElementById('karma-header');
const logoutButton = document.getElementById('logout');
const messagesContainer = document.querySelector('.message-display-div');

logoutButton.addEventListener('click', () => {
    logout();
});

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

window.addEventListener('load', async () => {
    await fetchAndDisplayUserDetails();
    
});

const user = getUser();


messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(messageForm);
    const message = data.get('message');
    const sender = await getMyProfile(user.email);

    await createMessage(id, sender.user_id, message);
    
    await fetchAndDisplayUserDetails();

    messageForm.reset();
});


async function fetchAndDisplayUserDetails() {

    const { email, karma } = await getProfile(id);
    
    karmaHeader.textContent = `${email} has ${karma} karma.`;
    recipientNameHeader.textContent = `Send ${email} a message:`;
    messagesContainer.textContent = `Messages for ${email}`;
    const messages = await renderMessagesEl(id);

    messagesContainer.append(messages);
}

karmaUp.addEventListener('click', async () => {
    const profile = await incrementKarma(id);
});