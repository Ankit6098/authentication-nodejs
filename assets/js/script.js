const showPassword = document.querySelector('.show-password');

showPassword.addEventListener('click', () => {
    if (showPassword.classList.contains('fa-eye')) {
        showPassword.classList.remove('fa-eye');
        showPassword.classList.add('fa-eye-slash');
    } else {
        showPassword.classList.remove('fa-eye-slash');
        showPassword.classList.add('fa-eye');
    }
    
    const password = document.querySelector('.password');
    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
    }
);

const menubar = document.querySelector('.fa-bars');
const featureContainer = document.querySelector('.features-container');

menubar.addEventListener('click', () => {
    featureContainer.classList.toggle('active');
});

const closebutton = document.querySelector('.fa-times');

closebutton.addEventListener('click', () => {
    featureContainer.classList.toggle('active');
});