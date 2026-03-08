# Sudoku

Live demo: https://matt-anis.github.io/sudoku-vanilla-js/

## How the board is created

This project generates a **fully solved 9×9 Sudoku board** first, then turns it into a playable puzzle.

### 1) Start with an empty board
- `createEmptyBoard()` builds a 9×9 matrix filled with `0` (empty cells).

### 2) Fill the board using backtracking
- `fillBoardWithBacktracking(board, row, col)` tries to place numbers from 1 to 9 in each cell.
- Candidate numbers are shuffled (`shuffle`) so each generated board is different.
- For each candidate value, the algorithm checks if placing it is valid with `canPlaceValueAtCell`.
- Validation rules:
  - number must not already exist in the same row
  - number must not already exist in the same column
  - number must not already exist in the same 3×3 subgrid
- If a value works, it moves to the next cell.
- If no value works, it backtracks (resets the cell to empty) and retries previous choices.
- When row index reaches `GRID_SIZE`, the board is complete.

### 3) Expose as `generateBoard`
- `generateBoard()` creates an empty board, runs backtracking, and returns a solved board.

## How difficulty levels are handled

Difficulty is controlled in `core/UI/dom.js` using visibility odds:

- `easy`: `0.5`
- `medium`: `0.42`
- `hard`: `0.33`

When rendering each cell:
- A random value is generated.
- If the random value is below the selected level threshold, that cell is shown as prefilled and disabled.
- Otherwise, it stays editable for the player.

This means:
- **Easy** reveals more numbers.
- **Hard** reveals fewer numbers.

## Game input behavior

- Editable cells accept only digits `1` to `9`.
- Incorrect values are marked visually (`invalid` class).
- Completion is checked by comparing `currentBoard` with `solutionBoard`; when they match, a completion message is shown.
