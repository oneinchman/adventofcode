const { readFile, getMedian } = require("../shared");

const part1 = async () => {
  const data = await readFile("data.txt");
  const positions = data.split(",").map((s) => parseInt(s));
  const median = getMedian(positions);
  const fuel = positions.reduce((p, c) => {
    if (c > median) return p + (c - median);
    else if (c < median) return p + (median - c);
    else return p;
  }, 0);
  console.log(fuel);
};

const getFuelBySteps = (steps) => {
  let fuel = 0,
    cost = 1;
  for (let i = 0; i < steps; i++) {
    fuel += cost;
    cost++;
  }
  return fuel;
};

const part2 = async () => {
  const data = await readFile("data.txt");
  const sorted = data
    .split(",")
    .map((s) => parseInt(s))
    .sort((a, b) => a - b);
  let fuelMap = {};
  for (let i = Math.min(...sorted); i < Math.max(...sorted); i++) {
    fuelMap[i] = sorted.reduce((p, c) => {
      if (c > i) return p + getFuelBySteps(c - i);
      if (c < i) return p + getFuelBySteps(i - c);
      return p;
    }, 0);
  }
  console.log(Math.min(...Object.values(fuelMap)));
};

part1();
part2();
