const { readFile } = require("../shared");

const getOperations = async () => {
  const data = await readFile("data.txt");
  return data.split("\n").map((row) => {
    const [command, units] = row.split(" ");
    return {
      command,
      units: parseInt(units),
    };
  });
};

const part1 = async () => {
  const operations = await getOperations();
  let horPos = 0,
    depth = 0;
  operations.forEach(({ command, units }) => {
    switch (command) {
      case "forward":
        horPos += units;
        break;
      case "up":
        depth -= units;
        break;
      case "down":
        depth += units;
        break;
      default:
        break;
    }
  });

  console.log(horPos * depth);
};

const part2 = async () => {
  const operations = await getOperations();
  let horPos = 0,
    aim = 0,
    depth = 0;
  operations.forEach(({ command, units }) => {
    switch (command) {
      case "forward":
        horPos += units;
        depth += units * aim;
        break;
      case "up":
        aim -= units;
        break;
      case "down":
        aim += units;
        break;
      default:
        break;
    }
  });

  console.log(horPos * depth);
};

part1();
part2();
