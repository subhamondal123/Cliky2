import { validate as validateEmail } from 'email-validator';
import { Regex } from '../services/config';
import { Toaster } from '../services/common-view-function';
import { AlertMessage, Color } from '../enums';
import { LengthValidate } from '../services/constant';

// for amount validate 
export function amountValidator(amount) {
    return !!amount && amount > 0;
};

// for emmail validate
export function emailValidator(email) {
    if (email === undefined || email === null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EMAIL.EMAIL_EMPTY);
        return false;
    } else {
        if (email.length === 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EMAIL.EMAIL_EMPTY);
            return false;
        } else {
            if (validateEmail(email)) {   // validate the email by email-validator module
                return true;
            } else {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.EMAIL.EMAIL_INVALID);
                return false;
            }
        }
    }
};

// for mobile number valioxdate
export function mobileNumberValidator(mobileNumber) {
    if (mobileNumber) {
        if (mobileNumber.length >= LengthValidate.VALIDATIONS.MOBILE_MIN && mobileNumber.length <= LengthValidate.VALIDATIONS.MOBILE_MAX) {
            if (mobileNumber[0] === '0') {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MOBILE.MOBILE_ZERO_CHECK);
                return false;
            } else {
                return true
            }
        } else {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MOBILE.MOBILE_VALID);
            return false;
        }
    } else {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MOBILE.MOBILE_EMPTY);
        return false;
    }
};

// for first name validation
export function firstNameValidator(fName) {
    if (fName === undefined || fName === null || fName.length === 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.FIRST_NAME.EMPTY_NAME);
        return false;
    } else {
        if (fName.length >= LengthValidate.VALIDATIONS.FIRSTNAME_MIN && fName.length <= LengthValidate.VALIDATIONS.FIRSTNAME_MAX) {
            return true;
        } else {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.FIRST_NAME.LENGTH_NAME);
            return false;
        }
    }
}

// for last name validation
export function lastNameValidator(lName) {
    if (lName === undefined || lName === null || lName.length === 0) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LAST_NAME.EMPTY_NAME);
        return false;
    } else {
        if (lName.length >= LengthValidate.VALIDATIONS.FIRSTNAME_MIN && lName.length <= LengthValidate.VALIDATIONS.FIRSTNAME_MAX) {
            return true;
        } else {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.LAST_NAME.LENGTH_NAME);
            return false;
        }
    }
}

// for password validate
export function passwordValidator(password) {
    if (password === undefined || password === null) {
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.PASSWORD_EMPTY);
        return false;
    } else {
        if (password.length === 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.PASSWORD_EMPTY);
            return false;
        } else {
            if (!!password.match(Regex.PASS_REGEX)) {     //match the password with the regex condition is (Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number)
                if (password.length >= LengthValidate.VALIDATIONS.PASSWORD_MIN && password.length <= LengthValidate.VALIDATIONS.PASSWORD_MAX) {
                    return true;
                } else {
                    Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.PASSWORD_NOT_VALID);
                    return false;
                }
            } else {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.PASSWORD.PASSWORD_NOT_VALID);
                return false;
            }
        }
    }
};

// input empty validate
export function inputEmptyValidator(text) {
    if (text === undefined || text === null || text.length === 0) {
        return false;
    } else {
        return true;
    }
};

// input empty validate
export function dropdownEmptyValidator(text) {
    if (text === undefined || text === null) {
        return false;
    } else {
        if ((text.toString()).length === 0) {
            return false;
        } else {
            return true;
        }
    }
};

// input empty validate
export function inputEntryValidate(text, type) {
    let newText = "";
    // for name input field
    if (type === "name") {
        for (var i = 0; i < text.length; i++) {
            if (text[i].match(Regex.NAME_REGEX)) {
                newText = newText + text[i];
            }
        }
    } else if (type === "nameSpace") {    // for name with space input field
        for (var i = 0; i < text.length; i++) {
            if (text[i].match(Regex.NAME_SPACE_REGEX)) {
                newText = newText + text[i];
            }
        }
    } else if (type === "mobile") {       // for mobile number from input field
        for (var i = 0; i < text.length; i++) {
            if (Regex.NUMBER_REGEX.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
    } else if (type === "number1To9") {       // for mobile number from input field
        for (var i = 0; i < text.length; i++) {
            if (Regex.NUMBER_1TO9_REGEX.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
    } else if (type === "address") {     // for address from input field
        for (var i = 0; i < text.length; i++) {
            if (text[i].match(Regex.ADDRESS_REGEX)) {
                newText = newText + text[i];
            }
        }
    } else if (type === "city") {     // for city from input field
        for (var i = 0; i < text.length; i++) {
            if (text[i].match(Regex.ADDRESS_REGEX)) {
                newText = newText + text[i];
            }
        }
    } else if (type === "zip") {     // for Zip from input field
        for (var i = 0; i < text.length; i++) {
            if (Regex.NUMBER_REGEX.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
    } else if (type === "note") {     // for address from input field
        for (var i = 0; i < text.length; i++) {
            if (text[i].match(Regex.ADDRESS_REGEX)) {
                newText = newText + text[i];
            }
        }
    } else if (type === "alphanumeric") {    // for name with space input field
        for (var i = 0; i < text.length; i++) {
            if (text[i].match(Regex.ALPHA_NUMERIC_REGEX)) {
                newText = newText + text[i];
            }
        }
    } else if (type === "email") {
        newText = text.toLowerCase();
    } else if (type == "amount") {
        for (let i = 0; i < text.length; i++) {
            if (Regex.AMOUNT_REGEX.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
    } else if (type == "latLong") {
        for (let i = 0; i < text.length; i++) {
            if (Regex.LAT_LONG_REGEX.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
    } else if (type === "number") {       // for mobile number from input field
        for (var i = 0; i < text.length; i++) {
            if (Regex.NUMBER_REGEX.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
    } else {
        newText = text;
    }
    return newText;
};


export function validateFieldColor(data) {
    let resColor = { color: Color.COLOR.BLACK.PURE_BLACK };
    if (data !== undefined && data !== null && data == true) {
        resColor["color"] = Color.COLOR.RED.PURE_RED;
    }
    return resColor;
}


export function validatePhoneNumberArray(data) {

    let errCounter = 0;
    let status = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].phone == undefined || data[i].phone == null || data[i].phone.length == 0) {
            Toaster.ShortCenterToaster("Please enter phone number!");
            errCounter++;
        } else {
            if (mobileNumberValidator(data[i].phone) == false) {
                errCounter++;
            }
        }
    }


    if (errCounter == 0) {
        if (checkDuplicatePhoneNumber(data)) {
            status = true;
        } else {
            status = false;
        }
    }

    return status;
}

export function checkDuplicatePhoneNumber(data) {
    let errCounter = 0;
    let status = false;
    if (data.length > 1) {
        if (data[0].phone == data[1].phone) {
            Toaster.ShortCenterToaster("You can't entered the same phone number!");
            errCounter++;
        }
    }


    if (errCounter == 0) {
        status = true;
    }

    return status;
}

export function validateEmailArray(data) {
    let errCounter = 0;
    let status = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].email == undefined || data[i].email == null || data[i].email.length == 0) {
            Toaster.ShortCenterToaster("Please enter email id !");
            errCounter++;
        } else {
            if (emailValidator(data[i].email) == false) {
                errCounter++;
            }
        }
    }

    if (errCounter == 0) {
        if (checkDuplicateEmail(data)) {
            status = true;
        } else {
            status = false;
        }
    }

    return status;
}

export function checkDuplicateEmail(data) {
    let errCounter = 0;
    let status = false;
    if (data.length > 1) {
        if (data.length > 1) {
            if (data[0].email == data[1].email) {
                Toaster.ShortCenterToaster("You can't entered the same email!");
                errCounter++;
            }
        }
    }

    if (errCounter == 0) {
        status = true;
    }

    return status;
}

export function checkFirstIndexWhiteSpace(inputValue) {
    let newText = "";
    for (var i = 0; i < inputValue.length; i++) {
        if (!inputValue.match(/^\s/)) {
            // if first index is not whitespace, do something (e.g. display an error message)
            newText = newText + inputValue[i];
        }
    }
    return newText;
}