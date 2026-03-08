import { generateBoard } from '../../index.js';
import { EMPTY_CELL } from '../board.js';

const DIFFICULTY_CONFIG = {
    easy: { visibilityThreshold: 0.5 },
    medium: { visibilityThreshold: 0.42 },
    hard: { visibilityThreshold: 0.33 },
};

const DOM_SELECTORS = {
    startButton: 'start-button',
    difficultySelect: 'difficulty',
    welcomeSection: 'welcome',
    boardContainer: 'board-container',
    gameStatus: 'game-status',
};

let solutionBoard = null;
let currentBoard = null;

const getElementByid = (id) => document.getElementById(id);

const getDifficultyLevel = () => {
    const difficultySelect = getElementByid(DOM_SELECTORS.difficultySelect);
    return difficultySelect.value;
};

const createCellElement = () => {
    const cellElement = document.createElement('input');
    cellElement.classList.add('board-cell');
    cellElement.setAttribute('type', 'text');
    cellElement.setAttribute('maxlength', '1');
    return cellElement;
};

const createRowElement = () => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('board-row');
    return rowElement;
};

const shouldShowCellValue = (difficulty) => {
    const threshold = DIFFICULTY_CONFIG[difficulty].visibilityThreshold;
    return Math.random() < threshold;
};

const populateCellWithValue = (cellElement, value, difficulty, rowIndex, colIndex) => {
    if (shouldShowCellValue(difficulty)) {
        cellElement.value = value;
        cellElement.setAttribute('disabled', 'true');
        cellElement.classList.add('prefilled');
        currentBoard[rowIndex][colIndex] = value;
    } else {
        cellElement.classList.add('editable');
        cellElement.dataset.row = rowIndex;
        cellElement.dataset.col = colIndex;
        currentBoard[rowIndex][colIndex] = EMPTY_CELL;
        attachCellValidation(cellElement, rowIndex, colIndex);
    }
};

const validateCellInput = (cellElement, rowIndex, colIndex) => {
    const input = cellElement.value.trim();
    
    if (input === '') {
        cellElement.classList.remove('invalid');
        currentBoard[rowIndex][colIndex] = EMPTY_CELL;
        return;
    }
    
    const numValue = parseInt(input);
    
    if (isNaN(numValue) || numValue < 1 || numValue > 9) {
        cellElement.value = '';
        cellElement.classList.remove('invalid');
        currentBoard[rowIndex][colIndex] = EMPTY_CELL;
        return;
    }
    
    currentBoard[rowIndex][colIndex] = numValue;
    
    if (numValue !== solutionBoard[rowIndex][colIndex]) {
        cellElement.classList.add('invalid');
    } else {
        cellElement.classList.remove('invalid');
        checkGameCompletion();
    }
};

const attachCellValidation = (cellElement, rowIndex, colIndex) => {
    cellElement.addEventListener('input', () => {
        validateCellInput(cellElement, rowIndex, colIndex);
    });
};

const checkGameCompletion = () => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (currentBoard[row][col] !== solutionBoard[row][col]) {
                return;
            }
        }
    }
    
    const statusElement = getElementByid(DOM_SELECTORS.gameStatus);
    if (statusElement) {
        statusElement.textContent = '🎉 Puzzle Completed! Well Done!';
        statusElement.style.color = '#000';
    }
};

const renderBoardGrid = (board, difficulty) => {
    const boardContainer = getElementByid(DOM_SELECTORS.boardContainer);
    boardContainer.innerHTML = '';
    
    const statusElement = document.createElement('div');
    statusElement.id = DOM_SELECTORS.gameStatus;
    statusElement.textContent = '';
    boardContainer.appendChild(statusElement);

    const boardGridElement = document.createElement('div');
    boardGridElement.classList.add('board-grid');
    boardContainer.appendChild(boardGridElement);

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const rowElement = createRowElement();
        
        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            const cellElement = createCellElement();
            const cellValue = board[rowIndex][colIndex];
            populateCellWithValue(cellElement, cellValue, difficulty, rowIndex, colIndex);
            rowElement.appendChild(cellElement);
        }
        
        boardGridElement.appendChild(rowElement);
    }
};

const toggleSectionVisibility = (showBoardContainer) => {
    const welcomeSection = getElementByid(DOM_SELECTORS.welcomeSection);
    const boardContainer = getElementByid(DOM_SELECTORS.boardContainer);
    
    welcomeSection.style.display = showBoardContainer ? 'none' : 'block';
    boardContainer.style.display = showBoardContainer ? 'block' : 'none';
};

const handleStartGame = () => {
    const difficulty = getDifficultyLevel();
    solutionBoard = generateBoard();
    currentBoard = solutionBoard.map(row => [...row]);
    
    renderBoardGrid(solutionBoard, difficulty);
    toggleSectionVisibility(true);
};

const initializeSudokuUI = () => {
    const startButton = getElementByid(DOM_SELECTORS.startButton);
    startButton.addEventListener('click', handleStartGame);
};

export { initializeSudokuUI };