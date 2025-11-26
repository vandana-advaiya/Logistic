document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const fields = {
        fullName: document.getElementById("fullName"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        company: document.getElementById("company"),
        space: document.getElementById("space"),
        agreement: document.getElementById("agreement"),
        location: document.getElementById("location"),
        category: document.getElementById("category"),
        requirements: document.getElementById("requirements")
    };

    const unitSuffix = document.querySelector(".unit-suffix");

    // Update suffix when radio changes
    document.querySelectorAll("input[name='unit']").forEach(radio => {
        radio.addEventListener("change", () => {
            unitSuffix.textContent = radio.value;
        });
    });

    // Validation Functions
    function showError(input, message) {
        const msg = input.parentElement.querySelector(".error-msg") || input.closest(".col-md-6, .col-12").querySelector(".error-msg");
        input.classList.add("error");
        msg.textContent = message;
        msg.style.display = "block";
    }

    function clearError(input) {
        const msg = input.parentElement.querySelector(".error-msg") || input.closest(".col-md-6, .col-12").querySelector(".error-msg");
        input.classList.remove("error");
        msg.style.display = "none";
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validatePhone(phone) {
        return phone.trim().length >= 7;
    }

    function validate() {
        let valid = true;

        // Full Name
        if (fields.fullName.value.trim() === "") {
            showError(fields.fullName, "Full name is required.");
            valid = false;
        } else clearError(fields.fullName);

        // Email
        if (!validateEmail(fields.email.value)) {
            showError(fields.email, "Enter a valid email.");
            valid = false;
        } else clearError(fields.email);

        // Phone (optional but must be valid if entered)
        if (fields.phone.value.trim() !== "" && !validatePhone(fields.phone.value)) {
            showError(fields.phone, "Enter a valid phone number.");
            valid = false;
        } else clearError(fields.phone);

        // Space Required
        if (fields.space.value.trim() === "" || fields.space.value <= 0) {
            showError(fields.space, "Enter a valid space size.");
            valid = false;
        } else clearError(fields.space);

        // Agreement
        if (fields.agreement.value === "") {
            showError(fields.agreement, "Please select duration.");
            valid = false;
        } else clearError(fields.agreement);

        // Location
        if (fields.location.value === "") {
            showError(fields.location, "Please select warehouse location.");
            valid = false;
        } else clearError(fields.location);

        // Category
        if (fields.category.value === "") {
            showError(fields.category, "Please select category.");
            valid = false;
        } else clearError(fields.category);

        return valid;
    }

    // Prevent form submit if invalid
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (validate()) {
            alert("Form submitted successfully!");
            form.reset();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                // Element enters viewport → animate it
                entry.target.classList.add("active");
            } else {
                // Element leaves viewport → reset it
                entry.target.classList.remove("active");
            }

        });
    }, {threshold: 0.2 });

    reveals.forEach(el => observer.observe(el));
});
