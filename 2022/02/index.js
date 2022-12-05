const { readFile } = require("../shared");

const load = async () => {
  const data = await readFile("data.txt");

  return data.split("\n").map((value) => {
    const [opponent, me] = value.split(" ");
    return {
      opponent,
      me,
    };
  });
};

const points = {
  draw: 3,
  win: 6,
  loss: 0,
  rock: 1,
  paper: 2,
  scissors: 3,
};

const part1 = async () => {
  const rounds = await load();

  // A = Rock, B = Paper, C = Scissors
  // X = Rock, Y = Paper, Z = Scissors
  const getScore = (p1, p2) => {
    const rock = {
      opp: "A",
      me: "X",
    };
    const paper = {
      opp: "B",
      me: "Y",
    };
    const scissors = {
      opp: "C",
      me: "Z",
    };

    // draws
    if (p1 === rock.opp && p2 === rock.me) return points.draw + points.rock;
    if (p1 === paper.opp && p2 === paper.me) return points.draw + points.paper;
    if (p1 === scissors.opp && p2 === scissors.me)
      return points.draw + points.scissors;

    // wins
    if (p1 === rock.opp && p2 === paper.me) return points.win + points.paper;
    if (p1 === paper.opp && p2 === scissors.me)
      return points.win + points.scissors;
    if (p1 === scissors.opp && p2 === rock.me) return points.win + points.rock;

    // losses
    if (p1 === rock.opp && p2 === scissors.me)
      return points.loss + points.scissors;
    if (p1 === paper.opp && p2 === rock.me) return points.loss + points.rock;
    if (p1 === scissors.opp && p2 === paper.me)
      return points.loss + points.paper;
  };

  const score = rounds.reduce(
    (prev, curr) => prev + getScore(curr.opponent, curr.me),
    0
  );
  console.log(score);
};

part1();

const part2 = async () => {
  const rounds = await load();

  // A = Rock, B = Paper, C = Scissors
  // X = Lose, Y = Draw, Z = Win
  const getScore = (opp, outcome) => {
    // loss
    if (outcome === "X") {
      if (opp === "A") return points.loss + points.scissors;
      else if (opp === "B") return points.loss + points.rock;
      else return points.loss + points.paper;
    }
    // draw
    else if (outcome === "Y") {
      if (opp === "A") return points.draw + points.rock;
      else if (opp === "B") return points.draw + points.paper;
      else return points.draw + points.scissors;
    }
    // win
    else {
      if (opp === "A") return points.win + points.paper;
      else if (opp === "B") return points.win + points.scissors;
      else return points.win + points.rock;
    }
  };

  const score = rounds.reduce(
    (prev, curr) => prev + getScore(curr.opponent, curr.me),
    0
  );
  console.log(score);
};

part2();
