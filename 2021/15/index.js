const { readFile, memoize } = require("../shared");

let paths = [];

const getLowest = memoize((paths) => {
  if (!paths.length) return 0;
  const sums = paths.map((path) => path.reduce((a, b) => a + b, 0));
  const min = Math.min(...sums);
  return min;
});

const getSum = memoize((history) => {
  return history.reduce((a, b) => a + b, 0);
});

const getNeighbours = memoize((matrix, x, y) => {
  const right = matrix[y]?.[x + 1];
  const bottom = matrix[y + 1]?.[x];

  return { right, bottom };
});

const explore = memoize((matrix, x, y, history) => {
  if (paths.length && getSum(history) > getLowest(paths)) {
    return;
  }
  if (x === matrix[0].length - 1 && y === matrix.length - 1) {
    paths.push(history);
    return;
  }

  const { right, bottom } = getNeighbours(matrix, x, y);

  if (right && !bottom) return explore(matrix, x + 1, y, [...history, right]);
  if (bottom && !right) return explore(matrix, x, y + 1, [...history, bottom]);
  else
    return (
      explore(matrix, x + 1, y, [...history, right]) +
      explore(matrix, x, y + 1, [...history, bottom])
    );
});

const findShortestPath = (matrix) => {
  explore(matrix, 0, 0, []);
  const sums = paths.map((path) => path.reduce((a, b) => a + b, 0));
  const min = Math.min(...sums);
  return min;
};

const part1 = async () => {
  const data = await readFile("facit.txt");
  const matrix = data
    .split("\n")
    .map((line) => line.split("").map((char) => parseInt(char)));

  console.log(findShortestPath(matrix));
  console.log(paths.length);
};

part1();
