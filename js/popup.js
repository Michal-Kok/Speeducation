// DOM and variables
const popUp = document.querySelector('.popup');
const popUpOverlayer = document.querySelector('.popupOverlayer');
const closePopUpButton = document.querySelector('.popup__button--close');
const submitPopUpButton = document.querySelector('.popup__button--submit');
const popUpInputs = document.querySelectorAll('.popup__input');
const popUpsubmitMsg = document.querySelector('.popup__submitMessage');

let email = ' ';
let password = '';
let password2 = '';
const wrongEmailMsg = "E-mail is not correct.";
const wrongPasswordMsg = "Password is too short.";
const wrongSecondPasswordMsg = "Passwords don't match."
const positiveSubmitMsg = "You're signed it. Check your inbox."

// functions
const sendEmail = () => {
    window.Email.send({
        SecureToken: "b287bc51-c2cf-4d71-9e44-d9df4af4ce97",
        To: email,
        From: "programistadobry@gmail.com",
        Subject: "Newsletter",
        Body: `<h3>Hello!</h3> I'm happy to meet you. It's my fictional adress. BUT i'm SURE that your biggest dream is to contact creator of this site. Use my GitHub's e-mail instead. Regards.`,
    }).then(msg => console.log(msg));
}

const clearPopUpInputs = () => {
    popUpInputs.forEach(input => {
        input.value = '';
        input.classList.remove('wrongInput');
    });
}

const handlePopup = (activity) => {
    if (activity === 'open') {
        popUp.classList.toggle('closed');
        popUpOverlayer.classList.toggle('closed');
    } else if (activity === 'close') {
        popUp.classList.toggle('closed');
        popUpOverlayer.classList.toggle('closed');
        popUpsubmitMsg.textContent = '';
        clearPopUpInputs();
    }
}

const throwSubmitError = (nOfInput) => {
    switch (nOfInput) {
        case 0:
            popUpsubmitMsg.textContent = wrongEmailMsg;
            break;
        case 1:
            popUpsubmitMsg.textContent = wrongPasswordMsg;
            break;
        case 2:
            popUpsubmitMsg.textContent = wrongSecondPasswordMsg;
            break;
        default:
            break;
    }
    popUpInputs[nOfInput].classList.add('wrongInput');
}

const handleSumbit = (e) => {
    e.preventDefault();
    popUpInputs.forEach(input => {
        input.classList.remove('wrongInput');
    });
    if ( email.includes('.') && email.includes('@')) {
        let isCapitalLetter = false;
        for (let i = 0; i < password.length; i++) {
            if (password[i].toUpperCase === password[i])
                isCapitalLetter = true;
        }
        if (password.length > 6 || isCapitalLetter) {
            if (password === password2) {
                popUpsubmitMsg.textContent = positiveSubmitMsg;
                clearPopUpInputs();
                sendEmail();
            } else throwSubmitError(2);
        } else throwSubmitError(1);
    } else throwSubmitError(0);
}

const handleInputChange = (e) => {
    const {value, name} = e.target;

    switch (name) {
        case 'email':
            email = value;
            break;
        case 'password':
            password = value;
            break;
        case 'password2':
            password2 = value;
            break;
        default:
            break;
    }
}

// listeners
getStartedButton.addEventListener('click', () => handlePopup('open'));
closePopUpButton.addEventListener('click', () => handlePopup('close'));
submitPopUpButton.addEventListener('click', handleSumbit);

popUpInputs.forEach(input => {
    input.addEventListener('change', handleInputChange);
});


