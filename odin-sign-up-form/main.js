// Add to main.js
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm_pass');
const errorDiv = document.createElement('div');
errorDiv.classList.add('password-error');
errorDiv.textContent = '*Passwords do not match';
errorDiv.style.display = 'none';

// Insert error message after confirm password input
confirmInput.parentNode.insertBefore(errorDiv, confirmInput.nextSibling);

function checkPasswords() {
    if (passwordInput.value !== confirmInput.value) {
        errorDiv.style.display = 'block';
        confirmInput.classList.add('invalid-input');
    } else {
        errorDiv.style.display = 'none';
        confirmInput.classList.remove('invalid-input');
    }
}

// Check on input in either field
passwordInput.addEventListener('input', checkPasswords);
confirmInput.addEventListener('input', checkPasswords);