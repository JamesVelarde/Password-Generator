let lowercaseRegex = /.*[a-z]+.*/;

let uppercaseRegex = /.*[A-Z]+.*/;

let numericRegex = /.*[0-9]+.*/;

let specialRegex = /.*[ !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]+.*/;

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";

const uppercaseLetters = lowercaseLetters.toUpperCase();

const numbers = "0123456789";

const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min) + min);

    return value;
}

var confirmEntry = function (userPrompt) {
    var userResponse = "";
    while ((userResponse === "" || userResponse === null) || (userResponse != "Y" && userResponse != "N")) {
        userResponse = prompt(userPrompt).toUpperCase();
    }
    return userResponse;
}

var buildPassword = function (referenceString, passwordLength) {
    var generatedPassword = "";

    while (generatedPassword.length < passwordLength) {
        generatedPassword += referenceString.charAt(randomNumber(0, referenceString.length));
    }

    return generatedPassword;
}

var generatePassword = function () {
    var passwordLength = "";

    while (passwordLength === "" || passwordLength === null || passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
        passwordLength = prompt("How long would you like this password to be? Please enter a number 8 through 128");
    }

    var passwordLowercase = confirmEntry("Would you like this password to include lowercase letters? Y/N");

    var passwordUppercase = confirmEntry("Would you like this password to include UPPERCASE letters? Y/N");

    var passwordNumeric = confirmEntry("Would you like this password to include numbers? Y/N");

    var passwordSpecial = confirmEntry("Would you like this password to include special characters? Y/N");

    if (passwordLowercase === "N" && passwordUppercase === "N" && passwordNumeric === "N" && passwordSpecial === "N") {
        return "You have to pick at least *one* of the character types";
    }

    var generatedPassword = "";

    var referenceString = "";

    if (passwordLowercase === "Y") referenceString += lowercaseLetters;
    if (passwordUppercase === "Y") referenceString += uppercaseLetters;
    if (passwordNumeric === "Y") referenceString += numbers;
    if (passwordSpecial === "Y") referenceString += specialCharacters;

    while (!passwordValidate(passwordLowercase, passwordUppercase, passwordNumeric, passwordSpecial, generatedPassword)) {
        generatedPassword = "";
        generatedPassword = buildPassword(referenceString, passwordLength);
    }

    return generatedPassword;
}

var passwordValidate = function (passwordLowercase, passwordUppercase, passwordNumeric, passwordSpecial, generatedPassword) {
    var isValid = true;

    if (passwordLowercase === "Y" && !lowercaseRegex.test(generatedPassword)) isValid = false;
    if (passwordUppercase === "Y" && !uppercaseRegex.test(generatedPassword)) isValid = false;
    if (passwordNumeric === "Y" && !numericRegex.test(generatedPassword)) isValid = false;
    if (passwordSpecial === "Y" && !specialRegex.test(generatedPassword)) isValid = false;

    return isValid;
}

var generateBtn = document.querySelector("#generate");

function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

generateBtn.addEventListener("click", writePassword);