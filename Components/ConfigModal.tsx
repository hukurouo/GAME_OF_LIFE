import React from 'react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

export function ConfigModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      <Button onClick={onOpen} colorScheme="gray" bg="gray.300" ml={2} mb={6}>
        Settings
      </Button>
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>speed: {props.speed}</FormLabel>
              <Slider aria-label="slider-ex-1" defaultValue={props.speed} min={1} max={10} step={1}
              onChange={(value:number)=>{
                props.changeSpeed(value)
              }}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>セルの大きさ: {props.cellSize}</FormLabel>
              <Slider aria-label="slider-ex-1" defaultValue={props.cellSize} min={3} max={10} step={1} 
              onChange={(value:number)=>{
                props.changeCellSize(value)
              }}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            
            
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
