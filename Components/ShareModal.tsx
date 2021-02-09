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
  useDisclosure,Text,Image
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
            <Text px={4} mb={0}>現在フィールドにあるセルの1~30世代目までを描画します。</Text>
          </ModalBody>
          <ModalBody>
          　<Button colorScheme="gray" onClick={()=>{props.gifGen()}}>
              gif画像を生成する
            </Button>
          </ModalBody>
          
            <Image src={props.base64} p={4}/>
          
          <ModalBody>
            <Text px={4} mb={0}>生成したgif画像を添付してツイートしてみよう！</Text>
          </ModalBody>
          <ModalBody>
          　<Button bg="blue.300" onClick={()=>{props.twitterShare()}}>
              ツイートする
            </Button>
            
          </ModalBody>
          
          <ModalFooter>
            
            <Button bg="gray.100" variant="ghost" onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
