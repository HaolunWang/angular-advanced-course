

type DigitValidator = (char:string) => boolean;


const numericValidator = char => /[0-9]{1}/.test(char); // return ture or false to test if char is number

const lowerCaseValidator = char => /[a-z]{1}/.test(char);

const upperCaseValidator = char => /[A-Z]{1}/.test(char);

const anyValidator = char => true;

const numberRangeValidator = (maxValue:number, char:string) => numericValidator(char) && parseInt(char) <= maxValue;

export const neverValidator = char => false;


export const maskDigitValidators: {[key:string]:DigitValidator} = { // define a map {key: boolean}
    'a': lowerCaseValidator,
    'A': upperCaseValidator,
    '*': anyValidator
};

for (let i = 0; i <= 9; i++) {
    maskDigitValidators[i] = numberRangeValidator.bind(undefined, i);
    // the bind() method returns a copy of the numberRangeValidator with the specific this value undefined and maxValue i
    // the bind() method doesn’t immediately execute the function. It just returns a new version of the function whose this sets to thisArg argument.
    // bind the numberRangeValidator to the undefined and i
}


