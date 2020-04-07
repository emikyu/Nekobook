// name: "",
// username: "",
// email: "",
// password: "",
// birthday: "1995-01-01",
// gender: ""

export const name = input => {
    if (!input.value) {
        $(input.closest('span')).addClass("validation-error");
        return "What's your name?";
    }
    return null;
};

export const username = input => {
    if (!input.value) {
        $(input.closest('span')).addClass("validation-error");
        return "What username would you like to use?";
    }
    return null;
};

export const email = input => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!input.value) {
        $(input.closest('span')).addClass("validation-error");
        return "You'll use this when you log in and if you ever need to reset your password.";
    } else if (!input.value.match(emailRegex)) {
        return "Please enter a valid email address."
    }
    return null;
};

export const password = input => {
    if (!input.value || input.value.length < 6) {
        $(input.closest('span')).addClass("validation-error");
        return "Enter a combination of at least six numbers, letters and punctuation marks (like ! and &)";
    }
    return null;
};

export const birthday = input => {
    return null;
};

export const gender = input => {
    if (!input.value) {
        $('.signup-radio').addClass("validation-error");
        return "Please choose a gender. You can change who can see this later.";
    }
    return null;
};

export const clearErrors = input => {
    $(input.closest('span')).removeClass("validation-error");
    
}