import { getMessagesByRecipient, getProfile } from './fetch-utils.js';

async function renderMessagesEl(profileId){
    const messagesDiv = document.createElement('div');
    messagesDiv.classList.add('messages');
    messagesDiv.textContent = '';

    const messages = await getMessagesByRecipient(profileId);

    if (messages !== null) {
        messages.map((message) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.textContent = message.text;
            messagesDiv.append(messageDiv);
        });
    } else {
        messagesDiv.textContent = 'No messages';
    }


    return messagesDiv;
}

async function renderKarmaEl(profileId){
    const karmaDiv = document.createElement('div');
    const karmaP = document.createElement('p');

    karmaDiv.classList.add('karma');
    karmaDiv.textContent = '';

    const profile = await getProfile(profileId);
    const karma = profile.karma;

    

    karmaP.textContent = `Karma: ${karma}`;
    karmaDiv.append(karmaP);
    console.log(karma, 'dis karma');
    return karmaDiv;
}

export {
    renderMessagesEl,
    renderKarmaEl,
};