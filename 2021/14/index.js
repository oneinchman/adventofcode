const { readFile, memoize } = require("../shared");

const getInsertions = async () => {
  const data = await readFile("facit.txt");
  return data.split("\n").map((line) => {
    const [match, insertion] = line.split(" -> ");
    return {
      match,
      insertion,
    };
  });
};

const getPairs = (formula) => {
  const pairs = [];
  for (let i = 0; i < formula.split("").length; i++) {
    if (!formula[i + 1]) break;
    pairs.push(formula[i] + formula[i + 1]);
  }
  return pairs;
};

const getReplacement = memoize((insertions, pair, last) => {
  const [char1, char2] = pair;
  const { insertion } = insertions.find(({ match }) => match === pair);
  return `${char1}${insertion}${last ? char2 : ""}`;
});

const part1 = async () => {
  const insertions = await getInsertions();
  //let formula = "KKOSPHCNOCHHHSPOBKVF";
  let formula = "NNCB";

  for (let i = 0; i < 10; i++) {
    const pairs = getPairs(formula);
    formula = pairs.reduce((p, c, i) => {
      const last = i === pairs.length - 1;
      return p + getReplacement(insertions, c, last);
    }, "");
  }
  const occurences = formula.split("").reduce((p, c) => {
    if (!p[c]) p[c] = 0;
    p[c] += 1;
    return p;
  }, {});
  const values = Object.values(occurences);
  const max = Math.max(...values);
  const min = Math.min(...values);
  console.log(max - min);
  //console.log(formula);
};
part1();
