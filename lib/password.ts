export interface PasswordConfig {
    hasLowercase?: boolean
    hasUppercase?: boolean
    hasNumbers?: boolean
    hasSymbols?: boolean
    lenght?: number
}

export const generatePassword = ({
    hasLowercase = true,
    hasUppercase = false,
    hasSymbols = false,
    hasNumbers = false,
    lenght = 8,
}: PasswordConfig = {}) => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%&*()_+-={}[]|;,:.<>?";

    let charPool = "";
    if (hasUppercase) charPool += uppercaseChars;
    if (hasLowercase) charPool += lowercaseChars;
    if (hasNumbers) charPool += numberChars;
    if (hasSymbols) charPool += symbolChars;

    if (charPool.length === 0) {
        charPool = lowercaseChars;
    }

    let password = "";
    for(let i = 0; i < lenght; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    return password;
}