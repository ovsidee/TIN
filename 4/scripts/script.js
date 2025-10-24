document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mainForm');
    const errorDiv = document.getElementById('errorMessages');

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const colorInput = document.getElementById('pageColor');
    const contentDiv = document.getElementById('pageContent');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (validateForm()) {
            updatePageContent();
        }
    });

    function validateForm() {
        errorDiv.innerHTML = '';
        let errors = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (usernameInput.value.trim() === '') {
            errors.push('Name cannot be empty');
        }

        if (emailInput.value.trim() === '') {
            errors.push('Email cannot be empty');
        } else if (!emailRegex.test(emailInput.value)) {
            errors.push('Please enter a valid email address');
        }

        if (errors.length > 0) {
            errorDiv.innerHTML = errors.join('<br>');
            return false;
        }

        return true;
    }

    function updatePageContent() {
        const name = usernameInput.value;
        const email = emailInput.value;
        const color = colorInput.value;

        contentDiv.innerHTML = `
            <h2>Welcome, ${name}!</h2>
            <p>Your registered email is: ${email}</p>
        `;

        document.body.style.backgroundColor = color;
    }
});