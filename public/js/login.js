// Login page specific JavaScript

let isLoginMode = true;

// Get form elements
const form = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-button');
const toggleText = document.getElementById('toggle-text');
const toggleLink = document.getElementById('toggle-link');
const errorMessage = document.getElementById('error-message');

// Toggle between login and register
toggleLink.addEventListener('click', function(e) {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    
    if (isLoginMode) {
        formTitle.textContent = "Welcome Back";
        submitButton.textContent = "Sign In";
        toggleText.textContent = "Don't have an account?";
        toggleLink.textContent = "Sign Up";
    } else {
        formTitle.textContent = "Create Account";
        submitButton.textContent = "Sign Up";
        toggleText.textContent = "Already have an account?";
        toggleLink.textContent = "Sign In";
    }
    
    // Clear any error messages
    errorMessage.style.display = 'none';
});

// Handle form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // Determine endpoint based on mode
        const endpoint = isLoginMode ? '/auth/login' : '/auth/register';
        
        // Make the request
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        // Parse the response
        const data = await response.json();
        
        if (response.ok) {
            // Redirect on success
            window.location.href = data.redirect;
        } else {
            // Show error message
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
});