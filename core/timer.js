const createTimerElement = () => {
    const timerElement = document.createElement('div');
    timerElement.id = 'timer';
    timerElement.textContent = 'Time: 0s';
    return timerElement;
};

const startTimer = (timerElement) => {
    let seconds = 0;
    const intervalId = setInterval(() => {
        seconds++;
        timerElement.textContent = `Time: ${seconds}s`;
    }, 1000);
    return intervalId;
};

const stopTimer = (intervalId) => {
    clearInterval(intervalId);
};

export { createTimerElement, startTimer, stopTimer };