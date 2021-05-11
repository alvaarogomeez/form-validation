// DECLARATION CONSTANTS OF WEB ELEMENTS
const container = document.getElementById('container');
const containerMessageAccount = document.getElementById('account-text');
const successAccountMessage = document.getElementById('account-message');
const header = document.getElementById('header');
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordCheck = document.getElementById('password-check');

// EVENTLISTENER PARA ACCIONAR LA VALIDACIÓN
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
})
// GLOBAL INPUT CHECKING FUNCTION
function checkInputs(){
    // get the values of the inputs
    const usernameValue = username.value.trim(),
          emailValue = email.value.trim(),
          passwordValue = password.value.trim(),
          passwordCheckValue = passwordCheck.value.trim();
    
    checkUsername(usernameValue);
    checkEmail(emailValue);
    checkPassword(passwordValue, passwordCheckValue);
    checkPasswordConfirmation(passwordValue, passwordCheckValue);
    // SHOW A SUCCESS MESSAGE WHEN THE ACCOUNT IS CREATED SUCCESFULLY
    if(checkUsername(usernameValue) && checkEmail(emailValue) && checkPassword(passwordValue, passwordCheckValue) && checkPasswordConfirmation(passwordValue, passwordCheckValue)){
        setAccountSuccess();
    }
}
// CHECKING INPUTS FUNCTIONS
function checkUsername(inputValue) {
    if (inputValue === '' || inputValue === null){
        // show error
        // add error class
        setErrorFor(username, 'Username cannot be blank');
    }else{
        // add success class
        setSuccessFor(username);
        return 1;
    }
}

function checkEmail(inputValue) {
    if (inputValue === '' || inputValue === null){
        // show error
        // add error class
        setErrorFor(email, 'Email cannot be blank');
    }else if(!isEmail(inputValue)){
        setErrorFor(email, 'Must be a valid email');
    }else{
        // add success class
        setSuccessFor(email);
        return 1;
    }
}

function checkPassword(password1Value, password2Value){
    if(password1Value === '' || password1Value === null){
        setErrorFor(password, 'Password cannot be blank');

    }else if(password1Value.length <= 6){
        setErrorFor(password, 'Password must be more than 6 characters long');
    }else if(password1Value.length > 20){
        setErrorFor(password, 'Password cannot be more than 20 characters');
    }else if(password1Value != password2Value) {
        setErrorFor(password, 'Must match with the `Password Confirmation` input');
    }else{
        setSuccessFor(password);
        return 1;
    }
}

function checkPasswordConfirmation(password1Value, password2Value) {
    if(password2Value === '' || password2Value === null || password1Value != password2Value){
        setErrorFor(passwordCheck, 'Must match with the `Password` input');
    }else{
        setSuccessFor(passwordCheck);
        return 1;
    }
}
// DETERMINE WETHER IF IT IS A SUCCESFUL INPUT OR NOT
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // add error message inside small
    small.innerText = message;

    // add error class
    formControl.className = 'form-control error';
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
// CHECK IF IS EMAIL IS VALID
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
// FUNCTION SHOWING SUCCESS MESSAGE FOR SUCCESFUL ACCOUNT
function setAccountSuccess(){

    container.className = 'container success-account';
    containerMessageAccount.className = 'account-text success';
    successAccountMessage.innerText = 'Congratulations, your account has been created succesfully.';
    successAccountMessage.className = 'success-account';
    header.className = 'header remove';
    form.className = 'form remove';
}