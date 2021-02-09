import React from 'react'
import {
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

export function ExampleModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button bg="orange.200" ml={2} mr={2} mb={6} onClick={()=>{onOpen()}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.50">
          <ModalHeader>パターンの例</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            銀河：
            <Button colorScheme="gray" mr={3} onClick={()=>{props.setExample("銀河"); onClose()}}>
              セットする
            </Button>
          </ModalBody>
          <ModalBody>
            ペンタデカスロン：
            <Button colorScheme="gray" mr={3} onClick={()=>{props.setExample("ペンタデカスロン"); onClose()}}>
              セットする
            </Button>
          </ModalBody>
          <ModalBody>
          パルサー：
            <Button colorScheme="gray" mr={3} onClick={()=>{props.setExample("パルサー"); onClose()}}>
              セットする
            </Button>
          </ModalBody>
          <ModalBody>
            グライダー：
            <Button colorScheme="gray" mr={3} onClick={()=>{props.setExample("グライダー"); onClose()}}>
              セットする
            </Button>
          </ModalBody>
          <ModalBody>
            軽量級宇宙船：
            <Button colorScheme="gray" mr={3} onClick={()=>{props.setExample("軽量級宇宙船"); onClose()}}>
              セットする
            </Button>
          </ModalBody>
          <ModalBody>
            ランダム配置：
            <Button colorScheme="gray" mr={3} onClick={()=>{props.setExample("ランダム"); onClose()}}>
              セットする
            </Button>
          </ModalBody>
          <ModalFooter>
            
            <Button variant="ghost" onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
