const { readFile, memoize } = require("../shared");

const count = memoize((timer, days) => {
  if (timer > days || (timer === 0 && days === 0)) return 1;
  if (timer === 0) return count(6, days - 1) + count(8, days - 1);
  return count(timer - 1, days - 1);
});

const getNumFish = async (days) => {
  const data = await readFile("data.txt");
  const timers = data.split(",").map((s) => parseInt(s));
  const sum = timers.reduce((p, c) => (p += count(c, days)), 0);
  return sum;
};

const part1 = async () => {
  console.log(await getNumFish(80));
};

const part2 = async () => {
  console.log(await getNumFish(256));
};

part1();
part2();
