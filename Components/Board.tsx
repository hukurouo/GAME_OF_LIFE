import { Grid, Box } from '@chakra-ui/react'

type cellProps = {
  isLive: boolean
  onClick: any
  cellSize: number
}

type boardProps = {
  cells:boolean[]
  onClick: any
  cellSize: number
}

export function Board(props: boardProps) {
  function renderCell(i: number) {
    return (
      <Cell
        key={i}
        isLive={props.cells[i+1]}
        cellSize={props.cellSize}
        onClick={() => {
          props.onClick(i+1)
        }}
      />
    )
  }
  const cellLength = props.cells.length
  const sqrt = String(Math.sqrt(cellLength))
  const template = "repeat(" + sqrt  + ", " + sqrt + "fr)"
  return (
    <Grid templateColumns={template} gap={0}>
      {Array(cellLength)
        .fill('')
        .map((_val, i) => {
          return renderCell(i)
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
      _hover={{ bg: 'gray.400' }}
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
