import React from 'react'
import Head from 'next/head'
import { Board } from '../Components/Board'
import { TrashModal } from '../Components/TrashModal'
import { ExampleModal } from '../Components/ExampleModal'
import { InfoModal } from '../Components/InfoModal'
import Footer from '../Components/Footer'
import { RedoModal } from '../Components/RedoModal'
import { lives_ginga, lives_guraida, lives_space, lives_pulsar, lives_penta } from '../lib/exampleLife'
import { generation, generationLives } from '../lib/algorithm'
import {
  Container,
  Center,
  Heading,
  Button,
  SliderFilledTrack,
  Box,
  FormControl,
  FormLabel,
  SliderTrack,
  SliderThumb,
  Slider,
  Checkbox
} from '@chakra-ui/react'

type typeHomeState = {
  status: string
  cellSize: number
  cellWidthLength: number
  cellHeightLength: number
  speed: number
  grid: boolean
  base64: string
  generation: number
  cells: boolean[]
  lives: number[]
  startCells: boolean[]
  startLives: number[]
}

class Home extends React.Component<{}, typeHomeState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      status: 'stop',
      cellSize: null,
      cellWidthLength: 27,
      cellHeightLength: 27,
      base64: '',
      speed: 2,
      grid: true,
      generation: 0,
      cells: Array(27 * 27 + 1).fill(false),
      lives: [],
      startCells: Array(27 * 27 + 1).fill(false),
      startLives: []
    }
  }

  changeSpeed = (speed: number) => {
    this.setState({ speed: speed })
    if (this.state.status == 'running') {
      clearInterval(this.timerObj)
      this.startAutoGen()
    }
  }

  componentDidMount() {
    this.updateCellSize()
  }

  updateCellSize() {
    const cellY = Math.round((window.innerHeight - 200) / (27 * 5))
    const cellX = Math.round((window.innerWidth - 20) / (27 * 5))
    const min = Math.min(cellY, cellX)
    this.setState({ cellSize: min })
  }

  nextGeneration = () => {
    const tmpLives = this.state.lives
    const cellLength = this.state.cellWidthLength * this.state.cellHeightLength
    const [newCellArray, newLives] = generation(this.state.cells, this.state.lives, cellLength)
    this.setState({ cells: newCellArray, lives: newLives })
    if (String(tmpLives) == String(newLives)) {
      this.stopAutoGen()
      if (tmpLives.length == 0) {
        this.setState({ generation: -1 })
      }
    }
  }

  timerObj: any
  startAutoGen = () => {
    this.setState({
      status: 'running',
      startCells: this.state.cells,
      startLives: this.state.lives
    })
    this.timerObj = setInterval(() => {
      this.nextGeneration()
      this.setState({ generation: this.state.generation + 1 })
    }, 2000 / this.state.speed)
  }

  stopAutoGen = () => {
    clearInterval(this.timerObj)
    this.setState({ status: 'stop' })
  }

  trash = () => {
    clearInterval(this.timerObj)
    this.setState({
      status: 'stop',
      cells: Array(27 * 27 + 1).fill(false),
      lives: [],
      generation: 0
    })
  }

  redo = () => {
    clearInterval(this.timerObj)
    this.setState({
      status: 'stop',
      cells: this.state.startCells,
      lives: this.state.startLives,
      generation: 0
    })
  }

  gifGen = () => {
    console.log('gif')
    const GIFEncoder = require('gifencoder')
    const { createCanvas } = require('canvas')

    const encoder = new GIFEncoder(540, 270)
    encoder.start()
    encoder.setRepeat(0) // 0 for repeat, -1 for no-repeat
    encoder.setDelay(500) // frame delay in ms
    encoder.setQuality(10) // image quality. 10 is default.
    
    let _lives = this.state.lives
    let prevlivesLength = 1
    Array(30).fill('').forEach((_v)=>{
      if (_lives.length == 0 && prevlivesLength == 0) {
        return
      }
      const canvas = createCanvas(540, 270)
      const ctx = canvas.getContext('2d')
      _lives.forEach((live)=>{
        live = live - 1
        const x = (live % this.state.cellWidthLength)
        const y = Math.floor(live / this.state.cellWidthLength)
        ctx.fillStyle = '#ffffff'
        ctx.fillRect((10*x)+135, 10*y, 10, 10)
      })
      encoder.addFrame(ctx)
      prevlivesLength = _lives.length
      _lives = generationLives(_lives, this.state.cellWidthLength)
    })
    
    encoder.finish()
    var ia = encoder.out.getData()
    var blob = new Blob([ia], { type: 'application/octet-stream' })

    // Uint8Array -> BinaryString
    var b_str = Array.from(ia, (e:number) => String.fromCharCode(e)).join("")
    // BinaryString -> base64
    var base64 = btoa(b_str)
    this.setState({base64: "data:image/jpg;base64," +  base64 })
    
  }

  setExample = (name: string) => {
    switch (name) {
      case '軽量級宇宙船':
        this.setExampleToCells(lives_space)
        break
      case '銀河':
        this.setExampleToCells(lives_ginga)
        break
      case 'グライダー':
        this.setExampleToCells(lives_guraida)
        break
      case 'パルサー':
        this.setExampleToCells(lives_pulsar)
        break
      case 'ペンタデカスロン':
        this.setExampleToCells(lives_penta)
        break
      case 'ランダム':
        this.setRandomCells()
        break
    }
  }

  setExampleToCells = (lives: number[]) => {
    const _cells = Array(27 * 27 + 1).fill(false)
    lives.forEach((cellIndex: number) => {
      _cells[cellIndex] = true
    })
    clearInterval(this.timerObj)
    this.setState({ lives: lives, cells: _cells, status: 'stop', generation: 0 })
  }

  setRandomCells = () => {
    const _cells = Array(27 * 27 + 1).fill(false)
    const _lives = []
    Array(27 * 27 + 1)
      .fill('')
      .forEach((_v, cellIndex) => {
        if (Math.random() * 100 < 50) {
          _cells[cellIndex] = true
          _lives.push(cellIndex)
        }
      })
    clearInterval(this.timerObj)
    this.setState({ lives: _lives, cells: _cells, status: 'stop', generation: 0 })
  }

  render() {
    return (
      <Container maxW="full" minH="100vh" bg="gray.100" py={6}>
        <Head>
          <title>Game Of Life Mini</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content={`https://i.imgur.com/1dUkirGl.png`}
          />
          <meta name="og:title" content={"ライフゲーム"} />
          <meta name="twitter:card" content="summary" />
        </Head>
        <Center>
          <Heading mb={4} size="lg">
            Game Of Life Mini
          </Heading>
        </Center>
        <Center></Center>
        <Center mb={4}>
          <Box textAlign="center">個体数：</Box>
          <Box minWidth={37} textAlign="left">
            {this.state.lives.length}
          </Box>
          <Box textAlign="center">世代：</Box>
          <Box minWidth={37} textAlign="left">
            {this.state.generation}
          </Box>
        </Center>
        <Center mb={4}>
          <Board
            cells={this.state.cells}
            cellSize={this.state.cellSize}
            grid={this.state.grid}
            cellHeightLength={this.state.cellHeightLength}
            cellWidthLength={this.state.cellWidthLength}
            onClick={(i: number) => {
              let _cells = this.state.cells
              _cells.splice(i, 1, !this.state.cells[i])
              const _lives = this.state.cells[i]
                ? Array.from(new Set(this.state.lives.concat(i)))
                : this.state.lives.filter((live) => live != i)
              this.setState({ lives: _lives, cells: _cells })
            }}
          />
        </Center>
        <Center mb={4}>
          <FormControl maxWidth={300}>
            <FormLabel>speed: {this.state.speed}</FormLabel>
            <Slider
              aria-label="slider-ex-1"
              defaultValue={this.state.speed}
              min={1}
              max={10}
              step={1}
              onChange={(value: number) => {
                this.changeSpeed(value)
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          <FormControl as="fieldset" ml={6}　maxWidth={150}>
            <FormLabel as="legend">Grid</FormLabel>
            <Checkbox defaultIsChecked onChange={(e)=>{this.setState({grid: e.target.checked})}}>枠の表示</Checkbox>
          </FormControl>
        </Center>
        <Center>
          {this.state.status == 'stop' ? (
            <Button
              colorScheme="teal"
              mb={6}
              onClick={() => {
                this.startAutoGen()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-play"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </Button>
          ) : (
            <Button
              colorScheme="teal"
              mb={6}
              onClick={() => {
                this.stopAutoGen()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-pause"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </Button>
          )}
          <RedoModal
            redo={() => {
              this.redo()
            }}
          ></RedoModal>
          <TrashModal
            trash={() => {
              this.trash()
            }}
          />
          <InfoModal />
          <ExampleModal
            setExample={(name: string) => {
              this.setExample(name)
            }}
          />
          
        </Center>
        <Footer gifGen={()=>{this.gifGen()}} base64={this.state.base64}/>
      </Container>
    )
  }
}
export default Home
