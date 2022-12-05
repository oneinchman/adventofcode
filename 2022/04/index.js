const { readFile } = require("../shared");

const load = async () => {
  const data = await readFile("data.txt");

  return data.split("\n");
};

const getPairs = (rows) => {
  const getValues = (row) => row.split("-").map((val) => parseInt(val));

  return rows.map((row) => {
    const [first, second] = row.split(",");
    const [firstFrom, firstTo] = getValues(first);
    const [secondFrom, secondTo] = getValues(second);

    return {
      first: {
        from: firstFrom,
        to: firstTo,
      },
      second: {
        from: secondFrom,
        to: secondTo,
      },
    };
  });
};

const part1 = async () => {
  const rows = await load();
  const pairs = getPairs(rows);

  const numFullOverlaps = pairs.reduce((prev, cur) => {
    if (cur.first.from >= cur.second.from && cur.first.to <= cur.second.to) {
      return prev + 1;
    } else if (
      cur.second.from >= cur.first.from &&
      cur.second.to <= cur.first.to
    ) {
      return prev + 1;
    }

    return prev;
  }, 0);

  console.log(numFullOverlaps);
};

part1();

const part2 = async () => {
  const rows = await load();
  const pairs = getPairs(rows);

  const numOverlaps = pairs.reduce((prev, { first, second }) => {
    const firstArray = Array.from(
      { length: first.to - first.from + 1 },
      (_, i) => first.from + i
    );
    const secondArray = Array.from(
      { length: second.to - second.from + 1 },
      (_, i) => second.from + i
    );
    const intersection = firstArray.filter((value) =>
      secondArray.includes(value)
    );

    return intersection.length ? prev + 1 : prev;
  }, 0);

  console.log(numOverlaps);
};

part2();
