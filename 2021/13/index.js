const { readFile } = require("../shared");

async function getFolds() {
  const data = await readFile("folds.txt");
  return data.split("\n").map((el) => ({
    axis: el[0],
    cursor: parseInt(el.substring(2)),
  }));
}

function fold(bottom, top) {
  for (let ri = 0; ri < bottom.length; ri++) {
    for (let ci = 0; ci < bottom[ri].length; ci++) {
      const bottomCell = bottom[ri][ci];
      const topCell = top[ri][ci];
      if (bottomCell === 0 && topCell === 1) {
        bottom[ri][ci] = 1;
      }
    }
  }
  return bottom;
}

function foldUp(paper, yPos) {
  const top = paper.splice(yPos).splice(1).reverse();
  return fold(paper, top);
}

function foldLeft(array, x) {
  let leftPage = array.reduce((p, c) => [...p, c.slice(0, x)], []);
  let rightPage = array.reduce((p, c) => [...p, c.slice(x + 1).reverse()], []);
  return fold(rightPage, leftPage);
}

async function plotPaper(folds) {
  const data = await readFile("data.txt");
  const coords = data
    .split("\n")
    .map((c) => {
      const [x, y] = c.split(",").map((p) => parseInt(p));
      return { x, y };
    })
    .flat();
  const xMax = coords.reduce((p, c) => (c.x > p ? c.x : p), 0);
  const yMax = coords.reduce((p, c) => (c.y > p ? c.y : p), 0);
  let paper = Array.from({ length: yMax + 1 }, () =>
    Array.from({ length: xMax + 1 }, () => 0)
  );

  for (const { y, x } of coords) {
    paper[y][x] = 1;
  }

  for (const { axis, cursor } of folds) {
    paper = axis === "x" ? foldLeft(paper, cursor) : foldUp(paper, cursor);
  }

  return paper;
}

async function part1() {
  const folds = await getFolds();
  const paper = await plotPaper([folds[0]]);
  console.log(paper.flat().filter((n) => !!n).length);
}

async function part2() {
  const folds = await getFolds();
  const paper = await plotPaper(folds);
  console.log(paper);
}

part1();
part2();
