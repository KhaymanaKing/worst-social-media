const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnenNmc3Fhb2h0a3Z5d2x1a3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgxMzc4NzMsImV4cCI6MTk2MzcxMzg3M30.om7bZuYtorq0m3djqz_kSD3Nk_4yrHIUjDusyXl-Z9s';

const SUPABASE_URL = 'https://lgzsfsqaohtkvywluksc.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export { client };

export async function createUser(email) {
    const response = await client
        .from('profiles')
        .insert({ email })
        .single();
    
    return checkError(response);
}

export async function getProfiles() {
    const response = await client 
        .from('profiles')
        .select('*');

    return checkError(response);
}

export async function getProfile(someId) {
    const response = await client  
        .from('profiles')
        .select('*')
        .match({ id: someId })
        .single();

    return checkError(response);
}

export async function getMyProfile(someEmail) {
    const response = await client
        .from('profiles')
        .select('*')
        .match({ email: someEmail })
        .single();
    
    return checkError(response);
}

export async function getMessagesByRecipient(someId) {
    const response = await client
        .from('messages')
        .select('*, profiles (*)')
        .match({ recipient_id: someId });
    
    console.log(response);
    return checkError(response);
}

export async function createMessage(recipient_id, sender_id, text, URL) {
    const response = await client
        .from('messages')
        .insert({ 
            recipient_id: recipient_id,
            sender_id: sender_id,
            text: text,
            image_url: URL
        });

    return checkError(response);
}

export async function incrementKarma(someId) {
    const profile = await getProfile(someId);
    const response = await client   
        .from('profiles')
        .update({ karma: profile.karma + 1 })
        .select('*')
        .match({ id: someId });
        
    return checkError(response);
}

export async function decrementKarma(someId) {
    const profile = await getProfile(someId);
    const response = await client   
        .from('profiles')
        .update({ karma: profile.karma - 1 })
        .select()
        .match({ id: someId });
        
    return checkError(response);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./profiles');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });
    await createUser(email);
    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}


export async function uploadImage(myImageFile) {
    const response = await client
        .storage
        .from('message-images')
        .upload(myImageFile.name, myImageFile, {
            cacheControl: '3600',
            upsert: false

        });
    return checkError(response);
}

export function makeImageUrl(imageKey){
    return `${SUPABASE_URL}/storage/v1/object/public/${imageKey}`;
}


function checkError({ data, error }) {
    return error ? console.error(error) : data;
}



export async function getActivePlayers() {
    const response = await client
        .from('profiles')
        .select('*')
        .match({ is_playing: true });

    return checkError(response);
}

export async function updatePlayer(updatedPlayer) {
    const response = await client
        .from('profiles')
        .update(updatedPlayer)
        .match({ id: updatedPlayer.id })
        .single();

    return checkError(response);
}