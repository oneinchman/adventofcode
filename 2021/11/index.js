const { readFile } = require("../shared");

class Counter {
  constructor() {
    this.counter = 0;
  }
  increment() {
    this.counter += 1;
  }
  get count() {
    return this.counter;
  }
}

async function load() {
  const data = await readFile("data.txt");
  return data
    .split("\n")
    .map((r, ri) =>
      r.split("").map((c, ci) => ({
        energy: parseInt(c),
        hasFlashed: false,
        id: `${ri}-${ci}`,
        row: ri,
        cell: ci,
      }))
    )
    .flat();
}

const accumulate = (initial, counter, arr) => {
  arr = arr || initial;

  const getCell = (row, cell) => initial.find((o) => o.id === `${row}-${cell}`);

  let flashing = [];
  for (let o of arr) {
    o.energy++;
    const added = flashing.find(({ id }) => id === o.id);
    if (o.energy > 9 && !o.hasFlashed && !added) {
      flashing.push(o);
    }
  }

  let next = [];
  for (const f of flashing) {
    const l = getCell(f.row, f.cell - 1);
    const bl = getCell(f.row + 1, f.cell - 1);
    const tl = getCell(f.row - 1, f.cell - 1);
    const r = getCell(f.row, f.cell + 1);
    const tr = getCell(f.row - 1, f.cell + 1);
    const br = getCell(f.row + 1, f.cell + 1);
    const t = getCell(f.row - 1, f.cell);
    const b = getCell(f.row + 1, f.cell);
    const affected = [l, bl, tl, r, tr, br, t, b].filter(
      (o) => !!o && !f.hasFlashed
    );
    next = next.concat(affected);
    counter && counter.increment();
  }

  flashing.forEach((o) => {
    o.hasFlashed = true;
  });

  if (next.length) {
    accumulate(initial, counter, next);
  } else {
    initial.forEach((element) => {
      element.hasFlashed = false;
      if (element.energy > 9) element.energy = 0;
    });
  }
};

async function part1() {
  const octopuses = await load();
  const counter = new Counter();
  for (let index = 0; index < 100; index++) {
    accumulate(octopuses, counter);
  }
  console.log(counter.count);
}

async function part2() {
  const octopuses = await load();
  let sum = 0;
  let count = 0;
  do {
    accumulate(octopuses);
    sum = octopuses.reduce((prev, cur) => prev + cur.energy, 0);
    count++;
  } while (sum !== 0);
  console.log(count);
}

part1();
part2();
