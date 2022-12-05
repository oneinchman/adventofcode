const { readFile } = require("../shared");

async function load() {
  const data = await readFile("data.txt");
  const list = data.split("\n");
  const roomNames = list
    .map((s) => s.split("-"))
    .flat()
    .reduce((prev, curr) => (prev.includes(curr) ? prev : [...prev, curr]), []);

  const rooms = roomNames.reduce((prev, curr) => {
    const connections = list
      .filter((item) => item.split("-").includes(curr))
      .map((c) => c.replace(curr, "").replace("-", ""));

    return prev.find(({ room }) => room === curr)
      ? prev
      : [
          ...prev,
          {
            room: curr,
            connections,
            isBig: curr[0] === curr[0].toUpperCase(),
          },
        ];
  }, []);

  return rooms;
}

function highestCount(arr) {
  const counts = arr.reduce((a, c) => {
    a[c] = (a[c] || 0) + 1;
    return a;
  }, {});

  return Math.max(...Object.values(counts));
}

function getOccurencies(array, value) {
  return array.reduce((prev, curr) => (curr === value ? prev + 1 : prev), 0);
}

const isSmallRoom = (room) => room[0] === room[0].toLowerCase();

async function part1() {
  const rooms = await load();
  const start = rooms.find(({ room }) => room === "start");
  let path = [];

  const explore = (currentRoom, steps) => {
    const { connections } = rooms.find(({ room }) => room === currentRoom);
    if (currentRoom === "end") {
      path.push(steps);
      return;
    }

    connections.forEach((conRoomName) => {
      const key = `${currentRoom}-${conRoomName}`;
      const conRoom = rooms.find(({ room }) => room === conRoomName);
      const forbidden =
        !conRoom.isBig &&
        steps.find((step) => step.split("-").includes(conRoomName));

      if (!forbidden && conRoom !== "start" && !steps.includes(key)) {
        explore(conRoomName, [...steps, key]);
      }
    });
  };

  explore(start.room, []);
  console.log(path.length);
}

async function part2() {
  const rooms = await load();
  const start = rooms.find(({ room }) => room === "start");
  let path = [];

  const explore = (currentRoom, steps) => {
    const smallRoomsVisited = steps.reduce((prev, cur) => {
      const room = cur.split("-")[1];
      return isSmallRoom(room) ? [...prev, room] : prev;
    }, []);

    if (currentRoom === "end") {
      path.push(steps);
      return;
    }

    const { connections } = rooms.find(({ room }) => room === currentRoom);
    connections.forEach((nextRoom) => {
      const key = `${currentRoom}-${nextRoom}`;
      const forbidden =
        (highestCount(smallRoomsVisited) >= 2 &&
          getOccurencies(smallRoomsVisited, nextRoom) > 0) ||
        nextRoom === "start";

      if (!forbidden) {
        explore(nextRoom, [...steps, key]);
      }
    });
  };

  explore(start.room, []);

  console.log(path.length);
}

//part1();
part2();
