import { getMessagesByRecipient, getProfile } from './fetch-utils.js';

async function renderMessagesEl(profileId){
    const messagesDiv = document.createElement('div');
    messagesDiv.classList.add('messages');
    messagesDiv.textContent = '';

    const messages = await getMessagesByRecipient(profileId);

    if (messages !== null) {
        for (let message of messages) {
            const messageDiv = document.createElement('div');
            if (message.image_url) {
                

                const image = document.createElement('img');
                image.src = message.image_url;
                image.classList.add('message-image');
                messageDiv.classList.add('message');
                const sender = await getProfile(message.sender_id);
                messageDiv.textContent = `${sender.email} has sent ${message.text}`;
                messageDiv.append(image);
                messagesDiv.append(messageDiv);

            } 
            else {
                messageDiv.classList.add('message');
                const sender = await getProfile(message.sender_id);
                messageDiv.textContent = `${sender.email} has sent ${message.text}`;
                messagesDiv.append(messageDiv);
            }
        }
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
    return karmaDiv;
}

export {
    renderMessagesEl,
    renderKarmaEl,
};