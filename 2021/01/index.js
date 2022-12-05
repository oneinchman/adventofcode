const { readFile } = require("../shared");

const load = async () => {
  const data = await readFile("data.txt");
  return data.split("\n").map((value) => parseInt(value));
};

const part1 = async () => {
  const depths = await load();
  const count = depths.reduce((p, c, i) => (c > depths[i - 1] ? p + 1 : p), 0);
  console.log(count);
};

const part2 = async () => {
  const depths = await load();
  const sums = depths.reduce((p, c, i) => {
    const next1 = depths[i + 1];
    const next2 = depths[i + 2];
    const sum = [c, next1, next2].reduce((a, b) => a + b, 0);
    return next1 && next2 ? [...p, sum] : p;
  }, []);
  const count = sums.filter((_, i, arr) =>
    i === 0 ? false : arr[i] > arr[i - 1]
  ).length;
  console.log(count);
};

part1();
part2();
