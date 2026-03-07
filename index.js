import { createEmptyBoard } from './board.js';
import { fillBoardWithBacktracking } from './backtracking.js';

const generateBoard = () => {
    const board = createEmptyBoard();
    fillBoardWithBacktracking(board);
    return board;
};

export { generateBoard };