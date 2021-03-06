export const fname = input => {
    if (!input.value) {
        $(input.closest('span')).addClass("validation-error");
        return "What's your name?";
    }
    return null;
};

export const lname = input => {
    if (!input.value) {
        $(input.closest('span')).addClass("validation-error");
        return "What's your name?";
    }
    return null;
};

export const email = input => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!input.value) {
        $(input.closest('span')).addClass("validation-error");
        return "You'll use this when you log in and if you ever need to reset your password.";
    } else if (!input.value.match(emailRegex)) {
        return "Please enter a valid email address.";
    }
    return null;
};

export const reTypeEmail = (input, email) => {
    if (!input.value) {
        $(input.closest('span')).addClass("validation-error");
        return "Please re-enter your email address.";
    } else if (input.value !== email) {
        $(input.closest('span')).addClass("validation-error");
        return "Your emails do not match. Please try again";
    }
    return null;
}

export const password = input => {
    if (!input.value || input.value.length < 6) {
        $(input.closest('span')).addClass("validation-error");
        return "Enter a combination of at least six numbers, letters and punctuation marks (like ! and &)";
    }
    return null;
};

export const birthday = (month, day, year) => {
    // debugger
    if (month === "Month" || day === "Day" || year === "Year") {
        debugger
        $('.birthday-form-container').addClass('validation-error');
        return "Select your birthday. You can change who can see this later";
    }
    return null;
};

export const gender = input => {
    if (!input.value) {
        $('.gender-form-container').addClass("validation-error");
        return "Please choose a gender. You can change who can see this later.";
    }
    return null;
};

export const clearErrors = input => {
    $(input.closest('span')).removeClass("validation-error");
}

export const clearGender = () => {
    $('.gender-form-container').removeClass('validation-error');
};

export const clearBirthday = () => {
    $('.birthday-form-container').removeClass('validation-error');
};