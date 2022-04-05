import { checkAuth, createMessage, getMyProfile, getProfile, getUser, logout, incrementKarma, decrementKarma, makeImageUrl, uploadImage } from '../fetch-utils.js';
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
    const myImageFile = data.get('my-image');
    const uploadedImage = await uploadImage(myImageFile); 
    const URL = makeImageUrl(uploadedImage.Key);
    await createMessage(id, sender.id, message, URL);
    
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
    await incrementKarma(id);
    await fetchAndDisplayUserDetails();
});

karmaDown.addEventListener('click', async () => {
    await decrementKarma(id);
    await fetchAndDisplayUserDetails();
});