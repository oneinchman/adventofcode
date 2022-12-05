const { readFile } = require("../shared");

async function getCoordinates() {
  const data = await readFile("data.txt");
  const rows = data.split("\n");
  return rows.map((row) => {
    const first = row.substring(0, row.indexOf(" "));
    const [x1, y1] = first.split(",").map((c) => parseInt(c));
    const second = row.substring(row.lastIndexOf(" "));
    const [x2, y2] = second.split(",").map((c) => parseInt(c));

    return {
      x1,
      y1,
      x2,
      y2,
    };
  });
}

function getMatrix(coordinates) {
  const xValues = coordinates.map(({ x1, x2 }) => [x1, x2]).flat();
  const yValues = coordinates.map(({ y1, y2 }) => [y1, y2]).flat();
  const xMax = Math.max(...xValues);
  const yMax = Math.max(...yValues);
  return new Array(yMax + 1).fill(0).map(() => new Array(xMax + 1).fill(0));
}

async function part1() {
  const coordinates = await getCoordinates();
  const matrix = getMatrix(coordinates);

  for (const { x1, y1, x2, y2 } of coordinates) {
    const isHorizontal = y1 === y2;
    const isVertical = x1 === x2;

    if (isHorizontal) {
      const min = Math.min(x1, x2);
      const max = Math.max(x1, x2);
      for (let index = min; index <= max; index++) {
        matrix[y1][index]++;
      }
    }

    if (isVertical) {
      const min = Math.min(y1, y2);
      const max = Math.max(y1, y2);
      for (let rowIndex = min; rowIndex <= max; rowIndex++) {
        matrix[rowIndex][x1]++;
      }
    }
  }

  const overlaps = matrix.flat().filter((number) => number > 1).length;
  console.log(overlaps);
}

async function part2() {
  const coordinates = await getCoordinates();
  const matrix = getMatrix(coordinates);

  for (const { x1, y1, x2, y2 } of coordinates) {
    const xMin = Math.min(x1, x2);
    const xMax = Math.max(x1, x2);
    const yMin = Math.min(y1, y2);
    const yMax = Math.max(y1, y2);
    const isHorizontal = y1 === y2;
    const isVertical = x1 === x2;
    const isDiagonal = xMax - xMin === yMax - yMin;

    if (isHorizontal) {
      for (let colIndex = xMin; colIndex <= xMax; colIndex++) {
        matrix[y1][colIndex]++;
      }
    }

    if (isVertical) {
      for (let rowIndex = yMin; rowIndex <= yMax; rowIndex++) {
        matrix[rowIndex][x1]++;
      }
    }

    if (isDiagonal) {
      const ltrDown = x1 < x2 && y1 < y2;
      const ltrUp = x1 < x2 && y1 > y2;
      const rtlDown = x1 > x2 && y1 < y2;
      const rtlUp = x1 > x2 && y1 > y2;

      if (ltrDown || rtlDown) {
        const increment = ltrDown ? 1 : -1;
        let count = x1;
        for (let rowIndex = yMin; rowIndex <= yMax; rowIndex++) {
          matrix[rowIndex][count]++;
          count += increment;
        }
      } else if (ltrUp || rtlUp) {
        const increment = ltrUp ? 1 : -1;
        let count = x1;
        for (let rowIndex = yMax; rowIndex >= yMin; rowIndex--) {
          matrix[rowIndex][count]++;
          count += increment;
        }
      }
    }
  }

  const overlaps = matrix.flat().filter((number) => number > 1).length;
  console.log(overlaps);
}

part2();
