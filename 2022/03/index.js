const { readFile } = require("../shared");

const load = async () => {
  const data = await readFile("data.txt");
  return data.split("\n");
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const part1 = async () => {
  const rows = await load();

  const findDenominator = (firstStr, secondStr) => {
    let denominator;
    const secondArray = secondStr.split("");

    for (const item of secondArray) {
      if (firstStr.indexOf(item) > -1) {
        denominator = item;
        break;
      }
    }

    return denominator;
  };

  const priorities = rows.map((row) => {
    const firstStr = row.substr(0, row.length / 2);
    const secondStr = row.substr(row.length / 2);
    const itemType = findDenominator(firstStr, secondStr);
    const alphaIndex = alphabet.indexOf(itemType.toLowerCase());
    const isUpperCase = /[A-Z]/.test(itemType);
    const priority = isUpperCase ? 27 + alphaIndex : 1 + alphaIndex;

    return priority;
  });

  const prioritySum = priorities.reduce((prev, curr) => prev + curr, 0);
  console.log(prioritySum);
};

part1();

const part2 = async () => {
  const rows = await load();

  const findDenominator = (firstStr, secondStr, thirdStr) => {
    let denominator;
    const secondArray = secondStr.split("");
    const thirdArray = thirdStr.split("");

    loop: for (const secondItem of secondArray) {
      if (firstStr.indexOf(secondItem) > -1) {
        for (const thirdItem of thirdArray) {
          if (thirdItem === secondItem && firstStr.indexOf(thirdItem) > -1) {
            denominator = thirdItem;
            break loop;
          }
        }
      }
    }

    return denominator;
  };

  let prioritySum = 0;

  for (let index = 0; index < rows.length; index += 3) {
    const firstStr = rows[index];
    const secondStr = rows[index + 1];
    const thirdStr = rows[index + 2];
    const itemType = findDenominator(firstStr, secondStr, thirdStr);
    const alphaIndex = alphabet.indexOf(itemType.toLowerCase());
    const isUpperCase = /[A-Z]/.test(itemType);
    const priority = isUpperCase ? 27 + alphaIndex : 1 + alphaIndex;
    prioritySum += priority;
  }

  console.log(prioritySum);
};

part2();
