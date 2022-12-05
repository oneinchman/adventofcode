const { readFile, getMedian } = require("../shared");

const square = { open: "[", close: "]" };
const bracket = { open: "(", close: ")" };
const curly = { open: "{", close: "}" };
const angle = { open: "<", close: ">" };

const getOpposite = (char) => {
  if (char === square.open) return square.close;
  if (char === square.close) return square.open;
  if (char === curly.open) return curly.close;
  if (char === curly.close) return curly.open;
  if (char === bracket.open) return bracket.close;
  if (char === bracket.close) return bracket.open;
  if (char === angle.open) return angle.close;
  if (char === angle.close) return angle.open;
};

const getCloserScore = (char) => {
  if (char === bracket.close) return 1;
  if (char === square.close) return 2;
  if (char === curly.close) return 3;
  if (char === angle.close) return 4;
};

const getIllegalScore = (char) => {
  if (char === bracket.close) return 3;
  if (char === square.close) return 57;
  if (char === curly.close) return 1197;
  if (char === angle.close) return 25137;
};

async function both() {
  const data = await readFile("data.txt");
  const rows = data.split("\n");
  const lines = rows.map((row) => row.split(""));

  const openChars = [bracket.open, square.open, curly.open, angle.open];
  let illegalPoints = [];
  let closerScores = [];

  for (const line of lines) {
    let isCorrupt = false;
    let openers = [];

    for (let char of line) {
      const lastOpener = openers[openers.length - 1];

      if (openChars.includes(char)) {
        openers.push(char);
      } else {
        if (lastOpener !== getOpposite(char)) {
          illegalPoints.push(getIllegalScore(char));
          isCorrupt = true;
        } else {
          openers.pop();
        }
      }
    }

    const isIncomplete = !isCorrupt && openers.length > 0;

    if (isIncomplete) {
      const closers = openers.map((opener) => getOpposite(opener)).reverse();
      closerScores.push(
        closers.reduce((prev, curr) => (prev *= 5) + getCloserScore(curr), 0)
      );
    }
  }
  const sum = illegalPoints.reduce((prev, curr) => (prev += curr), 0);
  const medianScore = getMedian(closerScores);

  console.log(sum);
  console.log(medianScore);
}

both();
