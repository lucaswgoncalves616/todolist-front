document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:8080/api/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        });

        const result = await response.text();
        console.log('Server whispers:', result);

        if (result === 'Ok') {
            alert('✅ Login successful! Welcome back, champ!');

        } else if (result === 'User Not found') {
            alert('😕 User not found. Maybe sign up first?');
        } else if (result === 'Incorrect password') {
            alert('🚫 Incorrect password, try again!');
        } else {
            alert('🤔 Unexpected response: ' + result);
        }

    } catch (error) {
        console.error('⚠️ Uh oh, signin blew up:', error);
        console.log('aqui' + error);
        alert('Something went wrong... backend might be napping 😴');
    }
});