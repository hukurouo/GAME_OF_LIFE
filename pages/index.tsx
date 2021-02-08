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
import { TrashModal } from "../Components/TrashModal"
import { ExampleModal } from "../Components/ExampleModal"
import { InfoModal } from "../Components/InfoModal"

type typeHomeState = {
  status: string
  cellSize: number
  cellWidthLength: number
  cellHeightLength: number
  speed: number
  generation: number
  cells: boolean[]
  lives: number[]
  prevLives: number[][]
} 

class Home extends React.Component<{}, typeHomeState> {
  constructor(props:any){
    super(props);
    this.state = {
      status: "stop",
      cellSize: null,
      cellWidthLength: 27,
      cellHeightLength: 27,
      speed: 2,
      generation: 0,
      cells: Array((27*27)+1).fill(false),
      lives: [],
      prevLives: [[]],
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
  }

  updateCellSize(){
    const cellY = Math.round((window.innerHeight-200)/(27*5))
    const cellX = Math.round((window.innerWidth-20)/(27*5))
    const min = Math.min(cellY, cellX)
    this.setState({cellSize: min})
  }

  initialCellSize(){
    const cellY = Math.round((window.innerHeight-200)/(27*5))
    const cellX = Math.round((window.innerWidth-20)/(27*5))
    const min = Math.min(cellY, cellX)
    return min
  }

  nextGeneration = () => {
    const prevLives = this.state.prevLives
    prevLives.push(this.state.lives)
    if (prevLives.length == 3){
      prevLives.shift()
    }
    const tmpLives = this.state.lives
    const cellLength = this.state.cellWidthLength * this.state.cellHeightLength
    const [newCellArray, newLives] = generation(this.state.cells, this.state.lives, cellLength)
    this.setState({cells: newCellArray, lives: newLives})
    if (String(tmpLives) == String(newLives) || String(prevLives[0]) == String(newLives)){
      this.stopAutoGen()
      if(tmpLives.length == 0){
        this.setState({generation: -1})
      }
    }
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
      cells: Array((27*27)+1).fill(false),
      lives: [],
      generation: 0
    })
  }

  setExample = (name: string) => {
    switch (name) {
      case "軽量級宇宙船":
        const lives_space = [283,286,309,336,340,363,364,365,366]
        this.setExampleToCells(lives_space)
        break
      case "銀河":
        const lives_ginga = [228,229,255,281,282,285,286,287,308,312,314,315,316,335,336,338,343,364,366,387,392,394,395,414,415,416,418,422,443,444,445,448,449,475,501,502]
        this.setExampleToCells(lives_ginga)
        break
      case "グライダー":
        const lives_guraida = [337,338,339,364,392]
        this.setExampleToCells(lives_guraida)
        break
    }
  }

  setExampleToCells = (lives: number[]) => {
    const _cells = Array((27*27)+1).fill(false)
      lives.forEach((cellIndex: number)=>{
        _cells[cellIndex] = true
      })
      this.setState({lives: lives, cells: _cells})
  }

  render(){
    return (
    <Container maxW="full" minH="100vh" bg="gray.100" py={6}>
      <Head>
        <title>Game Of Life Mini</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
      <Heading mb={4} size="lg">Game Of Life Mini</Heading>
      </Center>
      <Center>
        
      </Center>
      <Center mb={4}>
        <Box textAlign="center">個体数：</Box>
        <Box minWidth={37} textAlign="left">{this.state.lives.length}</Box>
        <Box textAlign="center">世代：</Box>
        <Box minWidth={37} textAlign="left">{this.state.generation}</Box>
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
      {this.state.status == "stop" ? (
          <Button colorScheme="teal" mb={6} onClick={()=>{this.startAutoGen()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </Button>
        ):(
          <Button colorScheme="teal" mb={6} onClick={()=>{this.stopAutoGen()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </Button>
        )}
      <TrashModal trash={()=>{this.trash()}}/>
      <InfoModal/>
      <ExampleModal setExample={(name: string)=>{this.setExample(name)}}/>  
      <Button colorScheme="blue" mb={6} onClick={()=>{}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
      </Button>
      </Center>
    </Container>
  ); 
}
}
export default Home

function aroundCells(index: number, width:number, cellLength:number){
  const arounds = []
  if (index == 1){
    arounds.push(729,703,704,27,2,54,28,29)
  } else if (index == 27){
    arounds.push(728,729,703,26,1,28,53,54)
  } else if (index == 703){
    arounds.push(702,676,677,729,704,27,1,2)
  } else if (index == 729){
    arounds.push(701,702,676,728,703,26,27,1)
  } else if (1 < index && index < 27){
    arounds.push((width*(width-1))+index-2, (width*(width-1))+index-1, (width*(width-1))+index,
                  index-1,                    index+1, 
                  index+width-1, index+width, index+width+1
                  )
  } else if (index % 27 == 1){
    arounds.push(index-1,index-width, index-width+1,
                 index+width-1,index+1, 
                 index+(width*2)-1,index+width, index+width+1
                 )
  } else if (index % 27 == 0){
    arounds.push(index-width-1, index-width, index-(width*2)+1,
                 index-1,                    index-width+1,
                 index+width-1, index+width, index+1
                 )
  } else if (703 < index && index < 729){
    arounds.push(index-width-1, index-width, index-width+1,
                 index-1,                    index+1, 
                 index-(width*(width-1)), index-(width*(width-1))+1, index-(width*(width-1))+2,
                 )
  } else {
    arounds.push(index-width-1, index-width, index-width+1,
                 index-1,                    index+1, 
                 index+width-1, index+width, index+width+1
                 )
  }
  const roundArounds = arounds.map((num)=>{return Math.round(num)})
  return roundArounds
}

function generation(cells, lives, cellLength){
  const initMap: any[] = []
  for (let i=1; i<=cellLength; i++){
    initMap.push([i,0])
  }
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
  Array(cellLength+1).fill("").forEach((_val,index)=>{
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