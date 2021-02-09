export function generation(cells, lives, cellLength) {
  const initMap: any[] = []
  for (let i = 1; i <= cellLength; i++) {
    initMap.push([i, 0])
  }
  const width = Math.sqrt(cells.length)
  const cellMap = new Map(initMap)
  lives.forEach((cellIndex) => {
    aroundCells(cellIndex, width, cellLength).forEach((aroundCellsIndex) => {
      const cnt = cellMap.get(aroundCellsIndex) as number
      cellMap.set(aroundCellsIndex, cnt + 1)
    })
  })
  const newCellArray = []
  const newLives = []
  Array(cellLength + 1)
    .fill('')
    .forEach((_val, index) => {
      const count = cellMap.get(index)
      if (cells[index] == true) {
        if (count < 2 || count > 3) {
          newCellArray.push(false)
        } else {
          newCellArray.push(true)
          newLives.push(index)
        }
      } else {
        if (count == 3) {
          newCellArray.push(true)
          newLives.push(index)
        } else {
          newCellArray.push(false)
        }
      }
    })
  return [newCellArray, newLives]
}

export function generationLives(lives, cellWidth){
  const cellLength = cellWidth*cellWidth
  const initMap: any[] = []
  for (let i = 1; i <= cellLength; i++) {
    initMap.push([i, 0])
  }
  const width = cellWidth
  const cellMap = new Map(initMap)
  lives.forEach((cellIndex) => {
    aroundCells(cellIndex, width, cellLength).forEach((aroundCellsIndex) => {
      const cnt = cellMap.get(aroundCellsIndex) as number
      cellMap.set(aroundCellsIndex, cnt + 1)
    })
  })
  const newLives = []
  Array(cellLength + 1)
    .fill('')
    .forEach((_val, index) => {
      const count = cellMap.get(index)
      if (lives.includes(index)) {
        if (count < 2 || count > 3) {
        } else {
          newLives.push(index)
        }
      } else {
        if (count == 3) {
          newLives.push(index)
        } else {
        }
      }
    })
  return newLives
}

function aroundCells(index: number, width: number, cellLength: number) {
  const arounds = []
  if (index == 1) {
    arounds.push(729, 703, 704, 27, 2, 54, 28, 29)
  } else if (index == 27) {
    arounds.push(728, 729, 703, 26, 1, 28, 53, 54)
  } else if (index == 703) {
    arounds.push(702, 676, 677, 729, 704, 27, 1, 2)
  } else if (index == 729) {
    arounds.push(701, 702, 676, 728, 703, 26, 27, 1)
  } else if (1 < index && index < 27) {
    arounds.push(
      width * (width - 1) + index - 2,
      width * (width - 1) + index - 1,
      width * (width - 1) + index,
      index - 1,
      index + 1,
      index + width - 1,
      index + width,
      index + width + 1
    )
  } else if (index % 27 == 1) {
    arounds.push(
      index - 1,
      index - width,
      index - width + 1,
      index + width - 1,
      index + 1,
      index + width * 2 - 1,
      index + width,
      index + width + 1
    )
  } else if (index % 27 == 0) {
    arounds.push(
      index - width - 1,
      index - width,
      index - width * 2 + 1,
      index - 1,
      index - width + 1,
      index + width - 1,
      index + width,
      index + 1
    )
  } else if (703 < index && index < 729) {
    arounds.push(
      index - width - 1,
      index - width,
      index - width + 1,
      index - 1,
      index + 1,
      index - width * (width - 1),
      index - width * (width - 1) + 1,
      index - width * (width - 1) + 2
    )
  } else {
    arounds.push(
      index - width - 1,
      index - width,
      index - width + 1,
      index - 1,
      index + 1,
      index + width - 1,
      index + width,
      index + width + 1
    )
  }
  const roundArounds = arounds.map((num) => {
    return Math.round(num)
  })
  return roundArounds
}
