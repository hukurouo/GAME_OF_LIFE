import { useState, useEffect } from 'react'
import Head from "next/head";
import { Container, Center, Heading, Button} from "@chakra-ui/react";
import { Board } from "../Components/Board"
import { ConfigModal } from "../Components/ConfigModal"
import Test from "../Components/Test"

const cellLength = 1600
let tmpLives = []
let tmpCells = Array(cellLength).fill(false)
let tmpCount = 0

export default function Home() {
  const [cells, setCells] = useState(Array(cellLength).fill(false))
  const [lives, setLives] = useState([])
  const [cellSize, setCellSize] = useState(6)

  const initMap: any[] = []
  for (let i=1; i<=cellLength; i++){
    initMap.push([i,0])
  }
  function nextGeneration(){
    const [newCellArray, newLives] = generation(cells, lives, initMap)
    setCells(newCellArray)
    setLives(newLives)
  }
  
  function changeCellSize(cellSize: number){
    setCellSize(cellSize)
  }
  
  const [count, setCount] = useState(1000)
  const [time, setTime] = useState(0)
  const [auto, setAuto] = useState(false)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1)
    }, count)
    if (auto) {
      const [newCellArray, newLives] = generation(tmpCells, tmpLives, initMap)
      tmpCells = newCellArray
      tmpLives = newLives
      console.log(tmpLives)
    }
    return () => {
      clearInterval(timer)
    }
  })
  function tick(){
    const tickGeneration = setInterval(() => {
      const [newCellArray, newLives] = generation(cells, lives, initMap)
      tmpCells = newCellArray
      tmpLives = newLives
      tmpCount += 1
      setCount(count+1)
      console.log(tmpCells)
      console.log(tmpLives)
      console.log(tmpCount)
    }, 1000)
  }

  return (
    <Container maxW="full" minH="100vh" bg="gray.100" py={6}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
      <Heading mb={8}>Life Game</Heading>
      </Center>
      <Center>
        <Test/>
        <Button colorScheme="blue" mb={6} onClick={()=>setCount(500)}>Gen</Button>
        <Button colorScheme="blue" mb={6} onClick={()=>setAuto(!auto)}>auto</Button>
        <ConfigModal
          cellSize={cellSize}
          changeCellSize={(cellSize: number)=>{changeCellSize(cellSize)}}
        />
        {tmpLives.length}
      </Center>
      <Center>
        <Board
          cells={tmpCells}
          cellSize={cellSize}
          onClick={(i: number)=>{
            lives.push(i)
            tmpLives.push(i)
            console.log(tmpLives)
            setLives(lives)
            cells.splice(i,1,true)
            setCells(JSON.parse(JSON.stringify(cells)))
            tmpCells = cells
          }}
        />
      </Center>
    </Container>
  );
}

function aroundCells(index: number, width:number){
  const arounds = []
  arounds.push(index-1, index+1, index-1+width, index+width, index+1+width, index-width, index-width+1, index-width-1)
  const validArounds = arounds.filter(index => 0 < index && index <= cellLength)
  return validArounds
}

function generation(cells, lives, initMap){
  console.log("gen")
  const width = Math.sqrt(cells.length)
  const cellMap = new Map(initMap)
  lives.forEach((cellIndex)=>{
    aroundCells(cellIndex, width).forEach((aroundCellsIndex)=>{
      const cnt = cellMap.get(aroundCellsIndex) as number
      cellMap.set(aroundCellsIndex, cnt+1)
    })
  })
  const newCellArray = []
  const newLives = []
  Array(cellLength).fill("").forEach((_val,index)=>{
    const count = cellMap.get(index)
    if (cells[index] == true) {
      if (count < 2 || count > 3) {
        newCellArray.push(false)
      } else {
        newCellArray.push(true)
        newLives.push(index)
      }
    } else {
      if (count == 3){
        newCellArray.push(true)
        newLives.push(index)
      } else {
        newCellArray.push(false)
      }
    }
  })
  return [newCellArray, newLives]
}