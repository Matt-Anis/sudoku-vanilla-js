import { createEmptyBoard } from './core/board.js';
import { fillBoardWithBacktracking } from './core/backtracking.js';

const startButton = document.getElementById('start-button');

const LEVEL_ODDS = {
    easy: 0.5,
    medium: 0.42,
    hard: 0.33,
};

const createBoardUI = (board) => {
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = '';

    for (let row = 0; row < board.length; row++) {
        const rowElement = createRowUI();
        for (let col = 0; col < board[row].length; col++) {
            const cellElement = createCellUI();
            rowElement.appendChild(cellElement);
        }
        boardContainer.appendChild(rowElement);
    }
};

const createRowUI = () => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('board-row');
    return rowElement;
}

const createCellUI = () => {
    const cellElement = document.createElement('input');
    cellElement.classList.add('board-cell');
    cellElement.setAttribute('type', 'text');
    cellElement.setAttribute('maxlength', '1');
    return cellElement;
};


const getDifficulty = () => {
    const difficultySelect = document.getElementById('difficulty');
    return difficultySelect.value;
}

const populateCell = (cellElement, difficulty) => {
    const randomValue = Math.random();
    if (randomValue < LEVEL_ODDS[difficulty]) {
        cellElement.value = cellElement.dataset.value;
        cellElement.setAttribute('disabled', 'true');
    }
};

