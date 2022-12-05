const { readFile } = require("../shared");

const getBinaries = async () => {
  const data = await readFile("data.txt");
  return data.split("\n");
};

const getBitByIndex = (binaries, index) => {
  let bit0 = 0,
    bit1 = 0;
  binaries.forEach((el) => {
    if (el[index] === "0") bit0++;
    else bit1++;
  });
  return [bit0, bit1];
};

const mostCommonBit = (binaries, index) => {
  let [bit0, bit1] = getBitByIndex(binaries, index);
  return bit1 >= bit0 ? "1" : "0";
};

const leastCommonBit = (binaries, index) => {
  let [bit0, bit1] = getBitByIndex(binaries, index);
  return bit0 > bit1 ? "1" : "0";
};

const part1 = async () => {
  const binaries = await getBinaries();
  const array = Array.from(Array(binaries[0].length));
  const gammaBinary = array.reduce(
    (p, _, i) => (p += mostCommonBit(binaries, i)),
    ""
  );
  const gammaDecimal = parseInt(gammaBinary, 2);
  const epsilonBinary = array.reduce(
    (p, _, i) => (p += leastCommonBit(binaries, i)),
    ""
  );
  const epsilonDecimal = parseInt(epsilonBinary, 2);

  console.log(gammaDecimal * epsilonDecimal);
};

const part2 = async () => {
  const binaries = await getBinaries();
  const getRating = (fn) => {
    let array = [...binaries];
    for (let i = 0; i < array[0].length; i++) {
      const mostCommon = fn(array, i);
      if (array.length > 1) {
        array = array.filter((binary) => binary[i] === mostCommon);
      }
    }
    return parseInt(array[0], 2);
  };
  const oxygenGeneratorRating = getRating(mostCommonBit);
  const co2ScrubberRating = getRating(leastCommonBit);
  const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;
  console.log(lifeSupportRating);
};

part1();
part2();
