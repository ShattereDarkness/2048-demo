# 2048 – React

A functional-programming implementation of the classic **2048** puzzle game, built with **React**.

![2048 Preview](image.png)

---

## Play the Game

**Live Demo:** [https://shatteredarkness.github.io/2048-demo/](https://shatteredarkness.github.io/2048-demo/)

To run locally, see [Installation](#installation).

---

## Gameplay

The goal is simple: **merge tiles to reach 2048** before running out of moves.

### Rules

- Use **arrow keys** (↑ ↓ ← →) to slide all tiles in that direction.
- **Tiles with the same number merge** into one tile with double the value.  
    *(e.g., 2 + 2 → 4, 4 + 4 → 8)*
- After each move, a **new tile (2 or 4)** appears in a random empty cell.
- The game ends when **no valid moves remain**.

---

## Implementation

This project follows **functional programming principles**:

- Helper functions are **pure and stateless** — the same input always yields the same output.
- **No variable mutation:** each move produces a new board state.
- Components are **independently testable**, since logic and UI are decoupled.

### Project Structure

| File / Component      | Description                                         |
|----------------------|-----------------------------------------------------|
| **`GameBoard.jsx`**  | Main controller that manages board, score, and UI.  |
| **`BoardGrid.jsx`**  | Renders the grid and current tile states.           |
| **`Controls.jsx`**   | Handles user input and board resizing.              |
| **`Header.jsx`**     | Displays the title, score, and best score.          |
| **`utils/board.js`** | Core game logic — pure helper functions only.       |

---

## Installation

1. Pull/fork this project

2. *(Optional)* Install Tailwind CSS for styling:

     ```bash
     npm install -D tailwindcss postcss autoprefixer
     ```

3. Install dependencies and start the dev server:

     ```bash
     npm install
     npm run dev
     ```

---

### Notes

- Core logic lives in `src/utils/board.js`, written in a pure, functional style.
- `GameBoard.jsx` manages state transitions and user interactions.
- Modular design allows easy extension — animations, themes, or new grid sizes can be added without changing the logic layer.