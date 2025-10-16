document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // stop the page from doing its little refresh dance 💃

    // Sneaky extraction of user data 🕵️‍♂️
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:8080/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const result = await response.text(); // backend returns plain text: "Ok", "User Not found", etc.
        console.log('Server whispers:', result);

        if (result === 'Ok') {
            alert('✅ Login successful! Welcome back, champ!');
            // Redirect to homepage or dashboard (uncomment this)
            // window.location.href = "dashboard.html";
        } else if (result === 'User Not found') {
            alert('😕 User not found. Maybe sign up first?');
        } else if (result === 'Incorrect password') {
            alert('🚫 Incorrect password, try again!');
        } else {
            alert('🤔 Unexpected response: ' + result);
        }

    } catch (error) {
        console.error('⚠️ Uh oh, signin blew up:', error);
        alert('Something went wrong... backend might be napping 😴');
    }
});