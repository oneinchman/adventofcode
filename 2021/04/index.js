const { readFile } = require("../shared");

const getBoards = async () => {
  const data = await readFile("boards.txt");
  return data
    .split("\n\n") // group
    .map((group) =>
      group
        .split("\n") // group rows
        .map((row) =>
          row
            .match(/.{2} ?/g) // cells
            .map((cell) => {
              const number = parseInt(cell.replace(/\s/g, ""));

              return {
                drawn: false,
                number,
              };
            })
        )
    );
};

async function getNumbers() {
  const data = await readFile("numbers.txt");
  return data.split(",").map((chars) => parseInt(chars));
}

const rowHasBingo = (board) => {
  for (const [index, row] of board.entries()) {
    const fullRow = row.every((cell) => cell.drawn === true);
    if (fullRow) return true;
  }
  return false;
};

const colHasBingo = (board) => {
  const numCols = board[0].length;
  const numRows = board.length;
  for (let index = 0; index < numCols; index++) {
    const drawn = board.reduce((prev, row) => {
      if (row[index].drawn === true) prev++;
      return prev;
    }, 0);
    if (drawn === numRows) return true;
  }
  return false;
};

const getPoints = (board, number) => {
  const sum = board
    .flat()
    .reduce((p, { drawn, number }) => (!drawn ? p + number : p), 0);
  return sum * number;
};

async function part1() {
  const boards = await getBoards();
  const numbers = await getNumbers();
  loop: for (const number of numbers) {
    for (const board of boards) {
      for (const row of board) {
        for (const cell of row) {
          if (cell.number === number) cell.drawn = true;
        }
      }
      if (rowHasBingo(board)) {
        console.log(getPoints(board, number));
        break loop;
      }
      if (colHasBingo(board)) {
        console.log(getPoints(board, number));
        break loop;
      }
    }
  }
}

const part2 = async () => {
  const boards = await getBoards();
  const numbers = await getNumbers();
  let withBingo = [];
  loop: for (const number of numbers) {
    let boardIndex = 0;
    for (const board of boards) {
      boardIndex++;
      for (const row of board) {
        for (const cell of row) {
          if (cell.number === number) cell.drawn = true;
        }
      }
      if (rowHasBingo(board) || colHasBingo(board)) {
        if (!withBingo.includes(boardIndex)) withBingo.push(boardIndex);
        if (withBingo.length === boards.length) {
          console.log(getPoints(board, number));
          break loop;
        }
      }
    }
  }
};

part1();
part2();
