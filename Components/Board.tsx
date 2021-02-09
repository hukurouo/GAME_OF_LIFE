import { Grid, Box } from '@chakra-ui/react'

type cellProps = {
  isLive: boolean
  onClick: any
  cellSize: number
  num:number
}

type boardProps = {
  cells:boolean[]
  onClick: any
  cellSize: number
  cellHeightLength: number
  cellWidthLength: number
  grid: boolean
}

export function Board(props: boardProps) {
  function renderCell(i: number) {
    return (
        <Cell
        key={i}
        num={i}
        isLive={props.cells[i+1]}
        cellSize={props.cellSize}
        onClick={() => {
          props.onClick(i+1)
        }}
      />
    )
  }
  function renderNoGridCell(i: number) {
    return (
        <NoGridCell
        key={i}
        num={i}
        isLive={props.cells[i+1]}
        cellSize={props.cellSize}
        onClick={() => {
          props.onClick(i+1)
        }}
      />
    )
  }
  const cellLength = props.cellHeightLength * props.cellWidthLength
  const template = "repeat(" + String(props.cellWidthLength)  + ", " + String(props.cellHeightLength) + "fr)"
  return (
    <Grid templateColumns={template} gap={0}>
      {Array(cellLength)
        .fill('')
        .map((_val, i) => {
          if (props.grid) {
            return renderCell(i)
          } else {
            return renderNoGridCell(i)
          }
         
        })}
    </Grid>
  )
}

function Cell(props: cellProps) {
  return (
    <Box
      as="button"
      width={props.cellSize}
      bg={cellColor(props.isLive)}
      height={props.cellSize}
      boxShadow="xs"
      _hover={{ bg: 'gray.300' }}
      _focus={{
        outline: 'none'
      }}
      onClick={()=>props.onClick()}
    ></Box>
  )
}

function NoGridCell(props: cellProps) {
  return (
    <Box
      as="button"
      width={props.cellSize}
      bg={cellColor(props.isLive)}
      height={props.cellSize}
      _hover={{ bg: 'gray.300' }}
      _focus={{
        outline: 'none'
      }}
      onClick={()=>props.onClick()}
    ></Box>
  )
}

function cellColor(isLive: boolean) {
  if (isLive) {
    return 'gray.500'
  } else {
    return ''
  }
}
