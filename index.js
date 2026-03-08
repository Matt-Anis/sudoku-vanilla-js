import { createEmptyBoard } from './core/board.js';
import { fillBoardWithBacktracking } from './core/backtracking.js';

const generateBoard = () => {
    const board = createEmptyBoard();
    fillBoardWithBacktracking(board);
    return board;
};

export { generateBoard };