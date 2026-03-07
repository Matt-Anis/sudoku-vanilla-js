import { GRID_SIZE, SUBGRID_SIZE } from './board.js';

const isNumberInRow = (board, row, value) =>
    board[row].includes(value);

const isNumberInColumn = (board, col, value) => {
    for (let row = 0; row < GRID_SIZE; row++) {
        if (board[row][col] === value) return true;
    }

    return false;
};

const isNumberInSubgrid = (board, row, col, value) => {
    const subgridRowStart = Math.floor(row / SUBGRID_SIZE) * SUBGRID_SIZE;
    const subgridColStart = Math.floor(col / SUBGRID_SIZE) * SUBGRID_SIZE;

    for (let currentRow = subgridRowStart; currentRow < subgridRowStart + SUBGRID_SIZE; currentRow++) {
        for (let currentCol = subgridColStart; currentCol < subgridColStart + SUBGRID_SIZE; currentCol++) {
            if (board[currentRow][currentCol] === value) return true;
        }
    }

    return false;
};

const canPlaceValueAtCell = (board, row, col, value) => {
    if (isNumberInRow(board, row, value)) return false;
    if (isNumberInColumn(board, col, value)) return false;
    if (isNumberInSubgrid(board, row, col, value)) return false;
    return true;
};

export {
    isNumberInRow,
    isNumberInColumn,
    isNumberInSubgrid,
    canPlaceValueAtCell,
};