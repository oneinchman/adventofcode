const { readFile } = require("../shared");

async function load() {
  const data = await readFile("data.txt");
  const entries = data.split("\n").map((row) => {
    const [signals, outputs] = row.split(" | ");

    return {
      signals: signals.split(" "),
      outputs: outputs.split(" "),
    };
  });

  return entries;
}

async function part1() {
  const entries = await load();
  let occurencies = 0;

  for (let entry of entries) {
    for (let output of entry.outputs) {
      switch (output.length) {
        case 2: // number 1
        case 3: // number 7
        case 4: // number 4
        case 7: // number 8
          occurencies++;
          break;
        default:
          break;
      }
    }
  }

  console.log(occurencies);
}

function alphaSort(num) {
  return num
    .split("")
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    .join("");
}

function numIntersections(value, compare) {
  const chars = value.split("");
  const compareChars = compare.split("");
  return compareChars.filter((char) => chars.includes(char)).length;
}

function getNumber(signals, outputs) {
  const no1 = signals.splice(
    signals.findIndex((el) => el.length === 2),
    1
  )[0];
  const no4 = signals.splice(
    signals.findIndex((el) => el.length === 4),
    1
  )[0];
  const no7 = signals.splice(
    signals.findIndex((el) => el.length === 3),
    1
  )[0];
  const no8 = signals.splice(
    signals.findIndex((el) => el.length === 7),
    1
  )[0];
  const no6 = signals.splice(
    signals.findIndex(
      (el) => numIntersections(el, no1) === 1 && el.length === 6
    ),
    1
  )[0];
  const no9 = signals.splice(
    signals.findIndex(
      (el) => numIntersections(el, no4) === 4 && el.length === 6
    ),
    1
  )[0];
  const no0 = signals.splice(
    signals.findIndex(
      (el) => numIntersections(el, no6) === 5 && el.length === 6
    ),
    1
  )[0];
  const no3 = signals.splice(
    signals.findIndex(
      (el) => numIntersections(el, no1) === 2 && el.length === 5
    ),
    1
  )[0];
  const no5 = signals.splice(
    signals.findIndex(
      (el) => numIntersections(el, no9) === 5 && el.length === 5
    ),
    1
  )[0];
  const no2 = signals[0];

  const mapped = [no0, no1, no2, no3, no4, no5, no6, no7, no8, no9].map((num) =>
    alphaSort(num)
  );

  let number = "";
  for (let output of outputs) {
    const sorted = alphaSort(output);
    const index = mapped.findIndex((number) => number === sorted);
    number += index;
  }

  return parseInt(number);
}

async function part2() {
  const entries = await load();
  let sum = entries.reduce(
    (prev, cur) => prev + getNumber(cur.signals, cur.outputs),
    0
  );
  console.log(sum);
}

part2();
