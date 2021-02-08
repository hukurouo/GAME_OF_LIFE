import React, { useState, useEffect } from 'react'
import Head from "next/head";
import { Container, Center, Heading, Button,
  SliderFilledTrack,Box,  FormControl,
  FormLabel,
  SliderTrack,
  SliderThumb,
Slider,
} from "@chakra-ui/react";
import { Board } from "../Components/Board"
import { ConfigModal } from "../Components/ConfigModal"

type typeHomeState = {
  status: string
  cellSize: number
  cellWidthLength: number
  cellHeightLength: number
  speed: number
  generation: number
  cells: boolean[]
  lives: number[]
} 

class Home extends React.Component<{}, typeHomeState> {
  constructor(props:any){
    super(props);
    this.state = {
      status: "stop",
      cellSize: 3,
      cellWidthLength: 27,
      cellHeightLength: 27,
      speed: 2,
      generation: 0,
      cells: Array(27*27).fill(false),
      lives: []
    }
  }

  changeSpeed = (speed: number) => {
    this.setState({speed: speed})
    if(this.state.status == "running"){
      clearInterval(this.timerObj)
      this.startAutoGen()
    }
  }

  componentDidMount() {
    this.updateCellSize()
    let queue: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(queue);
      queue = setTimeout(() => {
        this.updateCellSize()
      }, 500);
    });
  }

  updateCellSize(){
    const cellY = Math.round((window.innerHeight-200)/(27*5))
    const cellX = Math.round((window.innerWidth-20)/(27*5))
    console.log([cellX, cellY])
    const min = Math.min(cellY, cellX)
    this.setState({cellSize: min})
  }

  nextGeneration = () => {
    const tmpLives = this.state.lives
    const cellLength = this.state.cellWidthLength * this.state.cellHeightLength
    const [newCellArray, newLives] = generation(this.state.cells, this.state.lives, cellLength)
    this.setState({cells: newCellArray, lives: newLives})
    if (String(tmpLives) == String(newLives)){this.stopAutoGen()}
  }

  timerObj: any
  startAutoGen = () => {
    this.setState({status: "running"})
    this.timerObj = setInterval(() => {
      this.nextGeneration()
      this.setState({generation: this.state.generation + 1})
    }, 2000/this.state.speed)
  }

  stopAutoGen = () => {
    clearInterval(this.timerObj)
    this.setState({status: "stop"})
  }

  trash = () => {
    clearInterval(this.timerObj)
    this.setState({
      status: "stop",
      cells: Array(27*27).fill(false),
      lives: [],
      generation: 0
    })
  }

  render(){
    return (
    <Container maxW="full" minH="100vh" bg="gray.100" py={6}>
      <Head>
        <title>Game Of Life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
      <Heading mb={6}>Game Of Life</Heading>
      </Center>
      <Center>
        {this.state.status == "stop" ? (
          <Button colorScheme="teal" mb={6} onClick={()=>{this.startAutoGen()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </Button>
        ):(
          <Button colorScheme="teal" mb={6} onClick={()=>{this.stopAutoGen()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </Button>
        )}
        <Button bg="red.200" _hover={{ bg: 'red.400' }} ml={4} mb={6} onClick={()=>{this.trash()}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </Button>
      </Center>
      <Center mb={4}>
        個体数：{this.state.lives.length}　世代：{this.state.generation}
      </Center>
      <Center mb={4}>
        <Board
          cells={this.state.cells}
          cellSize={this.state.cellSize}
          cellHeightLength={this.state.cellHeightLength}
          cellWidthLength={this.state.cellWidthLength}
          onClick={(i: number)=>{
            let _cells = this.state.cells
            _cells.splice(i,1,!this.state.cells[i])
            const _lives = (this.state.cells[i]) ? Array.from(new Set(this.state.lives.concat(i))) : this.state.lives.filter(live=>live!=i)
            this.setState({lives: _lives, cells: _cells})
          }}
        />
      </Center>

      <Center mb={4}>
        <FormControl maxWidth={300}>
              <FormLabel>speed: {this.state.speed}</FormLabel>
          
              <Slider aria-label="slider-ex-1" defaultValue={this.state.speed} min={1} max={10} step={1}
              onChange={(value:number)=>{
                this.changeSpeed(value)
              }}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              </FormControl>
      </Center>
      <Center>
      <Button bg="orange.200" mr={4} mb={6} onClick={()=>{this.startAutoGen()}}>Preset</Button>
      <Button colorScheme="blue" mb={6} onClick={()=>{this.startAutoGen()}}>Share</Button>
      </Center>
    </Container>
  ); 
}
}
export default Home

function aroundCells(index: number, width:number, cellLength){
  const arounds = []
  arounds.push(index-1, index+1, index-1+width, index+width, index+1+width, index-width, index-width+1, index-width-1)
  const validArounds = arounds.filter(index => 0 < index && index <= cellLength)
  return validArounds
}

function generation(cells, lives, cellLength){
  const initMap: any[] = []
  for (let i=1; i<=cellLength; i++){
    initMap.push([i,0])
  }
  console.log("gen")
  const width = Math.sqrt(cells.length)
  const cellMap = new Map(initMap)
  lives.forEach((cellIndex)=>{
    aroundCells(cellIndex, width, cellLength).forEach((aroundCellsIndex)=>{
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