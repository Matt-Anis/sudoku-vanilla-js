import { EMPTY_CELL, GRID_SIZE, createCandidateNumbers, getNextCell } from './board.js';
import { shuffle } from './shuffle.js';
import { canPlaceValueAtCell } from './validators.js';

const fillBoardWithBacktracking = (board, row = 0, col = 0) => {
    if (row === GRID_SIZE) return true;

    const nextCell = getNextCell(row, col);
    const candidateNumbers = shuffle(createCandidateNumbers());

    for (const candidateValue of candidateNumbers) {
        if (!canPlaceValueAtCell(board, row, col, candidateValue)) continue;

        board[row][col] = candidateValue;

        if (fillBoardWithBacktracking(board, nextCell.row, nextCell.col)) {
            return true;
        }

        board[row][col] = EMPTY_CELL;
    }

    return false;
};

export { fillBoardWithBacktracking };