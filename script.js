let currentStage = 1;
const totalStages = 3;

const formsContainer = document.querySelector('.forms');
const signInBtn = document.querySelector('.signIn');
const signUpBtn = document.querySelector('.signUp');
const signInForm = document.querySelector('#loginForm');
const registerForm = document.getElementById('registerForm');

function showPanel(panel) {
    if (!formsContainer) return;
    formsContainer.classList.toggle('show-signup', panel === 'signup');
    signInBtn?.classList.toggle('active', panel === 'signin');
    signUpBtn?.classList.toggle('active', panel === 'signup');
}

signInBtn?.addEventListener('click', () => showPanel('signin'));
signUpBtn?.addEventListener('click', () => showPanel('signup'));
showPanel('signin');

function showStage(stage) {
    document.querySelectorAll('.form-step').forEach((step) => {
        step.classList.toggle('active', step.id === `stage${stage}`);
    });
    currentStage = stage;
}

function nextStage(stage) {
    if (stage === 1) {
        const staffName = registerForm.querySelector('#register-staff-name');
        const staffId = registerForm.querySelector('#register-staff-id');
        if (!staffName?.value.trim() || !staffId?.value.trim()) {
            alert('Please fill in the teaching staff name and ID.');
            return;
        }
    }

    if (stage === 2) {
        const password = registerForm.querySelector('#register-password');
        const confirmPassword = registerForm.querySelector('#confirm-password');
        if (!password?.value || !confirmPassword?.value) {
            alert('Please fill in both password fields.');
            return;
        }
        if (password.value !== confirmPassword.value) {
            alert('Confirmed passwords do not match.');
            return;
        }
    }

    const next = Math.min(totalStages, stage + 1);
    showStage(next);
}

function prevStage(stage) {
    showStage(Math.max(1, stage - 1));
}

function validateRegister(event) {
    event.preventDefault();
    const staffName = registerForm.querySelector('#register-staff-name');
    const staffId = registerForm.querySelector('#register-staff-id');
    const password = registerForm.querySelector('#register-password');
    const confirmPassword = registerForm.querySelector('#confirm-password');
    const agreementCheckbox = registerForm.querySelector('#agree');

    if (!staffName?.value.trim() || !staffId?.value.trim()) {
        showStage(1);
        alert('Please fill in the teaching staff name and ID.');
        return;
    }

    if (!password?.value || !confirmPassword?.value) {
        showStage(2);
        alert('Please fill in both password fields.');
        return;
    }

    if (password.value !== confirmPassword.value) {
        showStage(2);
        alert('Confirmed passwords do not match.');
        return;
    }

    if (!agreementCheckbox?.checked) {
        showStage(3);
        alert('Please agree to the Terms and Conditions.');
        return;
    }

    alert('Registration successful!');
    registerForm.reset();
    showStage(1);
    showPanel('signin');
}

function validateLogin(event) {
    event.preventDefault();
    const userId = signInForm.querySelector('#login-staff-id');
    const password = signInForm.querySelector('#login-password');

    if (!userId?.value.trim() || !password?.value) {
        alert('Please fill in all fields.');
        return;
    }

    alert('Login successful!');
}

registerForm?.addEventListener('submit', validateRegister);
signInForm?.addEventListener('submit', validateLogin);
