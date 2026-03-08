import { createEmptyBoard } from './core/board.js';
import { fillBoardWithBacktracking } from './core/backtracking.js';
import { initializeSudokuUI } from './core/UI/dom.js';

const generateBoard = () => {
    const board = createEmptyBoard();
    fillBoardWithBacktracking(board);
    return board;
};

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', initializeSudokuUI);

export { generateBoard };