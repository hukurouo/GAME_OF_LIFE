import React from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

export function TrashModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button bg="red.200" _hover={{ bg: 'red.400' }} ml={2} mb={6} onClick={onOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            フィールドを本当にリセットしますか？
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={()=>{onClose(); props.trash()}}>
              リセット
            </Button>
            <Button variant="ghost" onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
