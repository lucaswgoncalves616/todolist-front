document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // stop the form from reloading the page (very rude behavior 😤)

    // Grab form values like a sneaky data ninja 🥷
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const repeatPassword = document.getElementById('repeat-password').value.trim();

    // Basic password check because we don’t want chaos 🔒
    if (password !== repeatPassword) {
        alert('Passwords do not match! 😬');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/user/signup', {
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

        if (!response.ok) {
            throw new Error('Signup failed 😭');
        }

        const createdUser = await response.json();
        console.log('🎉 User created successfully:', createdUser);

        alert(`Welcome aboard, ${createdUser.name}! 🚀`);
        // Optionally redirect to login page
        // window.location.href = "signin.html";
    } catch (error) {
        console.error('Oops! Something went wrong:', error);
        alert('Could not sign up. Try again later 🥲');
    }
});