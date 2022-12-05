const { readFile } = require("../shared");

async function load() {
  const data = await readFile("data.txt");
  const matrix = data
    .split("\n")
    .map((row) => row.split("").map((p) => parseInt(p)));
  const numCells = matrix[0].length;
  const lowPoints = [];

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex];
    for (let cellIndex = 0; cellIndex < numCells; cellIndex++) {
      const self = row[cellIndex];
      const left = row[cellIndex - 1];
      const right = row[cellIndex + 1];
      const up = matrix[rowIndex - 1]?.[cellIndex];
      const down = matrix[rowIndex + 1]?.[cellIndex];

      let isLow = true;
      if (left !== undefined && left <= self) {
        isLow = false;
      }
      if (right !== undefined && right <= self) {
        isLow = false;
      }
      if (down !== undefined && down <= self) {
        isLow = false;
      }
      if (up !== undefined && up <= self) {
        isLow = false;
      }

      if (isLow) {
        lowPoints.push({
          row: rowIndex,
          cell: cellIndex,
          value: self,
        });
      }
    }
  }

  return { lowPoints, matrix };
}

async function part1() {
  const { lowPoints } = await load();

  const riskLevel = lowPoints
    .map((lp) => lp.value)
    .reduce((prev, cur) => (prev += cur + 1), 0);

  console.log(riskLevel);
}

const getPoint = (matrix, curr, rowIncrement, cellIncrement) => {
  const cell = matrix[curr.row + rowIncrement]?.[curr.cell + cellIncrement];
  return cell !== undefined
    ? {
        row: curr.row + rowIncrement,
        cell: curr.cell + cellIncrement,
        value: upCell,
      }
    : null;
};

const neighbourPoints = (matrix, curr) => {
  return {
    up: getPoint(matrix, curr, -1, 0),
    down: getPoint(matrix, curr, +1, 0),
    right: getPoint(matrix, curr, 0, +1),
    left: getPoint(matrix, curr, 0, -1),
  };
};

async function part3() {
  const { lowPoints, matrix } = await load();
  let basins = [];
  for (const lp of lowPoints) {
    const explore = [lp];
    const visited = [`${lp.row} ${lp.cell}`];
    let basin = [lp];
    while (explore.length) {
      const current = explore[0];
      const currentPos = `${current.row} ${current.cell}`;
      const { up, down, left, right } = neighbourPoints(matrix, current);
      const points = [up, down, left, right];

      for (const point of points) {
        const coord = point ? `${point.row} ${point.cell}` : null;

        if (coord && point.value !== 9) {
          if (!visited.includes(coord)) {
            if (
              !basin.find((b) => b.row === point.row && b.cell === point.cell)
            ) {
              basin.push(point);
            }
            explore.push(point);
          }
        }
      }

      if (!visited.includes(currentPos)) {
        visited.push(currentPos);
      }
      explore.shift();
    }

    basins.push(basin);
  }
  const basinSizes = basins.map((basin) => basin.length).sort((a, b) => b - a);
  const topThree = basinSizes.slice(0, 3);
  const product = topThree.reduce((a, b) => a * b, 1);
  console.log(product);
}

part3();
