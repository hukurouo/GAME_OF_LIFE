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
  useDisclosure,Text
} from '@chakra-ui/react'

export function ShareModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button bg="purple.100" _hover={{ bg: 'purple.200' }} onClick={onOpen}>gif画像を生成してシェア</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>シェアする</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          　<Button colorScheme="gray" onClick={()=>{props.gifGen()}}>
              gif画像をダウンロードする
            </Button>
          </ModalBody>
          <ModalBody>
          　<Button bg="blue.300" onClick={()=>{props.twitterShare()}}>
              ツイートする
            </Button>
            
          </ModalBody>
          <ModalBody>
            <Text px={4} mb={0}>生成したgif画像を添付してツイートしてみよう！</Text>
          
          </ModalBody>
          <ModalFooter>
            
            <Button bg="gray.100" variant="ghost" onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
