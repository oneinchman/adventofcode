const { readFile } = require("../shared");

const load = async () => {
  const data = await readFile("data.txt");

  return data
    .split("\n\n")
    .map((value) => value.split("\n").map((value) => parseInt(value)));
};

const part1 = async () => {
  const elfs = await load();
  const elfWithMostCalories = elfs.reduce((prev, curr) => {
    const sum = curr.reduce((prev, curr) => prev + curr, 0);
    return sum > prev ? sum : prev;
  }, []);
  console.log(elfWithMostCalories);
};

part1();

const part2 = async () => {
  const elfs = await load();
  let topThree = [0, 0, 0];

  elfs.forEach((group) => {
    const sum = group.reduce((prev, curr) => prev + curr, 0);
    const min = Math.min(...topThree);

    if (sum > min) {
      const index = topThree.indexOf(min);
      topThree[index] = sum;
    }
  });

  const sum = topThree.reduce((prev, curr) => prev + curr, 0);
  console.log(sum);
};

part2();
