# Minesweeeper

Plain JavaScript Minesweeper for the browser, no framework, no build, no AI-slop used.
The game logic is decoupled from the rendering, so the same board can be played
with the mouse **or** typed into the browser console.

▶ **[Play](https://peisha2.github.io/Minesweeper/)**

*(Yes, three e's.)*

---

## Features

- Classic Minesweeper rules: reveal, flag, flood-fill on empty cells
- **First click is always safe** — mines are placed after the opening move
- Four difficulties: Easy (8×10, 10 mines), Medium (14×18, 40), Hard (20×24, 99)
  and Custom (any `rows cols mines`)
- Live timer that starts on the first reveal and freezes on win or loss
- Reset keeps the last settings
- **Console mode** — the full game is playable from DevTools

## Play in the browser

Hit **Start Game!**, pick a difficulty, then:

| Action | Input |
| --- | --- |
| Reveal a cell | left click |
| Flag / unflag | right click |

## Play in the console

Press <kbd>F12</kbd> and type:

```js
init("9 9 10")   // rows, columns, mines
r("B3")          // reveal column B, row 3
f("B3")          // flag / unflag B3
```

The board prints as ASCII after every move:

```
   A  B  C  D
1  X  X  X  X
2  X  1  .  .
3  X  ?  1  .
```

`X` hidden · `.` revealed, no neighbours · `?` flagged · `*` mine · digits = adjacent mines

## Credits

Explosion icon by [Victoruler — Flaticon](https://www.flaticon.com/free-icons/explosion).
