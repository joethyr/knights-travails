const cellRecord = new Map()

const Cell = (x, y) => {
  const xPosition = x
  const yPosition = y
  let predecessor

  const KNIGHT_MOVEMENT = [
    [1, 2], [1, -2],
    [2, 1], [2, -1],
    [-1, 2], [-1, -2],
    [-2, 1], [-2, -1]
  ]

  const getPredecessor = () => predecessor
  const setPredecessor = (newPredecessor) => {
    predecessor ||= newPredecessor
  }

  const name = () => {
    `${x}, ${y}`
  }

  const createKnightMoves = () => KNIGHT_MOVEMENT.map(newCellForm).filter(Boolean)

  const newCellForm = ([xOffset, yOffset]) => {
    const [newX, newY] = [xPosition + xOffset, yPosition + yOffset]
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      return Cell(newX, newY)
    }
  }

  if (cellRecord.has(name())) {
    return cellRecord.get(name());
  }
  const newCell = { name, getPredecessor, setPredecessor, createKnightMoves }
  cellRecord.set(name(), newCell);
  return newCell;
}


const KnightMoves = (start, end) => {
  cellRecord.clear()

  const origin = Cell(...start)
  const target = Cell(...end)

  const queue = [target]
  while (!queue.includes(origin)) {
    const currentCell = queue.shift();

    const enqueueList = currentCell.createKnightMoves();
    enqueueList.forEach((cell) => cell.setPredecessor(currentCell))
    queue.push(...enqueueList)
  }
  const path = [origin]
  while (!path.includes(target)) {
    const nextCell = path.at(-1).getPredecessor()
    path.push(nextCell)
  }
  console.log(`The shortest path was ${path.length - 1} moves!`);
  console.log("The moves were:");
  path.forEach(cell => console.log(cell.name()))
}

export { KnightMoves }