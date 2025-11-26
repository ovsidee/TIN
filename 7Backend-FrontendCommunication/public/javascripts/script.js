document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const messageDiv = document.getElementById("message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        messageDiv.textContent = "";
        messageDiv.className = "";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const birthdate = document.getElementById("birthdate").value;
        const password = document.getElementById("password").value.trim();

        const nameRegex = /^[A-Za-z ]+$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(name)) {
            return showMessage("Name may contain only letters and spaces.", "error");
        }

        if (!emailRegex.test(email)) {
            return showMessage("Email is not valid.", "error");
        }

        if (!passwordRegex.test(password)) {
            return showMessage("Password must be at least 6 characters long and include a number and a special character.", "error");
        }

        const birth = new Date(birthdate);
        const today = new Date();

        if (isNaN(birth.getTime()) || birth > today) {
            return showMessage("Birthdate must be a past date.", "error");
        }

        // send to backend
        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, birthdate })
            });

            const data = await response.json();

            if (data.success) {
                showMessage(`Success! You are ${data.age} years old.`, "success");
            } else {
                showMessage(data.message, "error");
            }
        } catch (err) {
            showMessage("Something went wrong..", "error");
        }
    });

    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = type;
    }
});
