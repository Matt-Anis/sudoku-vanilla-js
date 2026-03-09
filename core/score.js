const MAX_ERRORS = {
    easy: 5,
    medium: 3,
    hard: 1,
};

let currentErrors = 0;
let currentDifficulty = 'easy';

const resetErrors = () => {
    currentErrors = 0;
};

const setDifficulty = (difficulty) => {
    currentDifficulty = difficulty;
};

const incrementErrors = () => {
    currentErrors++;
    return currentErrors;
};

const getCurrentErrors = () => currentErrors;

const getMaxErrors = () => MAX_ERRORS[currentDifficulty];

const hasExceededMaxErrors = () => {
    return currentErrors >= MAX_ERRORS[currentDifficulty];
};

const createErrorDisplayElement = () => {
    const errorElement = document.createElement('div');
    errorElement.id = 'error-display';
    errorElement.textContent = `Errors: ${currentErrors}/${MAX_ERRORS[currentDifficulty]}`;
    return errorElement;
};

const updateErrorDisplay = (errorElement) => {
    if (errorElement) {
        errorElement.textContent = `Errors: ${currentErrors}/${MAX_ERRORS[currentDifficulty]}`;
    }
};

export {
    resetErrors,
    setDifficulty,
    incrementErrors,
    getCurrentErrors,
    getMaxErrors,
    hasExceededMaxErrors,
    createErrorDisplayElement,
    updateErrorDisplay,
};