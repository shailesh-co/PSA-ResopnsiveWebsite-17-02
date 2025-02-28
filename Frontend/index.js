const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const contactInput = document.getElementById('contact');
        const countrySelect = document.getElementById('country');
        const stateContainer = document.getElementById('stateContainer');
        const stateSelect = document.getElementById('state');
        const submitBtn = document.getElementById('submitBtn');
        const form = document.getElementById('userForm');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const contactError = document.getElementById('contactError');
        const countryError = document.getElementById('countryError');
        const stateError = document.getElementById('stateError');

        // Country to State Mapping
        const states = {
            // India: ["Maharashtra", "Gujarat", "Delhi", "Karnataka"],
            // USA: ["California", "Texas", "New York", "Florida"],
            // Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"]
            India: [
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
                "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
                "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
                "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
                "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
                "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
                "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
            ]
        };

        // Update State Dropdown Based on Selected Country
        countrySelect.addEventListener('change', function () {
            if (this.value === "India") {
                stateContainer.classList.remove('hidden'); // Show State Field
                stateSelect.innerHTML = '<option value="">Select State</option>'; // Reset States
                states["India"].forEach(state => {
                    const option = document.createElement('option');
                    option.value = state;
                    option.textContent = state;
                    stateSelect.appendChild(option);
                });
            } else {
                stateContainer.classList.add('hidden'); // Hide State Field
                stateSelect.innerHTML = '<option value="">Select State</option>'; // Reset State Field
            }
            validateForm();
        });

        function validateForm() {
            let isValid = true;

            // Name Validation (Only Letters)
            if (!/^[A-Za-z\s]+$/.test(nameInput.value.trim())) {
                nameError.classList.remove('hidden');
                isValid = false;
            } else {
                nameError.classList.add('hidden');
            }

            // Email Validation
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value.trim())) {
                emailError.classList.remove('hidden');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
            }

            // Contact Validation (Exactly 10 digits)
            if (!/^\d{10}$/.test(contactInput.value.trim())) {
                contactError.classList.remove('hidden');
                isValid = false;
            } else {
                contactError.classList.add('hidden');
            }

            // Country Validation
            if (!countrySelect.value) {
                countryError.classList.remove('hidden');
                isValid = false;
            } else {
                countryError.classList.add('hidden');
            }

            // State Validation
            // if (!stateSelect.value) {
            //     stateError.classList.remove('hidden');
            //     isValid = false;
            // } else {
            //     stateError.classList.add('hidden');
            // }

            // Enable or disable the submit button
            submitBtn.disabled = !isValid;
        }

        nameInput.addEventListener('input', validateForm);
        emailInput.addEventListener('input', validateForm);
        contactInput.addEventListener('input', validateForm);
        countrySelect.addEventListener('change', validateForm);
        stateSelect.addEventListener('change', validateForm);

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const userData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                contact: contactInput.value.trim(),
                country: countrySelect.value,
                state: stateSelect.value || null
            };

            try {
                const response = await fetch('http://localhost:5000/api/submit-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    document.getElementById('modalMessage').innerHTML = `Hi <b>${userData.name}</b>, Thank you for submitting the form, we will connect soon!`;
                    new bootstrap.Modal(document.getElementById('successModal')).show();
                    
                    form.reset();
                    submitBtn.disabled = true;
                } else {
                    alert('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong');
            }
        });

        window.onload = function () {
            const content = document.querySelector('.scrollable-content');
            const clone = content.cloneNode(true);
            content.parentElement.appendChild(clone);
        };

