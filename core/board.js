const GRID_SIZE = 9;
const SUBGRID_SIZE = 3;
const EMPTY_CELL = 0;

const createEmptyBoard = () =>
    Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }).fill(EMPTY_CELL));

const createCandidateNumbers = () =>
    Array.from({ length: GRID_SIZE }, (_, index) => index + 1);

const getNextCell = (row, col) => {
    if (col === GRID_SIZE - 1) {
        return { row: row + 1, col: 0 };
    }

    return { row, col: col + 1 };
};

export {
    GRID_SIZE,
    SUBGRID_SIZE,
    EMPTY_CELL,
    createEmptyBoard,
    createCandidateNumbers,
    getNextCell,
};