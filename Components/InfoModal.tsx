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
  useDisclosure,
  Link,
  Text,Image,Center
} from '@chakra-ui/react'
import { generateKeyPair } from 'crypto'

export function InfoModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        bg="gray.300"
        ml={2}
        mb={6}
        onClick={() => {
          onOpen()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-info"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl" >
        <ModalOverlay />
        <ModalContent bg="gray.50">
          <ModalHeader>ライフゲームとは</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Link
              color="teal.500"
              href="https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0"
              target="_blank"
              rel="noopener noreferrer"
            >
              ライフゲーム - Wikipedia
            </Link>より
            <Text mt={4}>
              ライフゲームは生命の誕生、進化、淘汰などのプロセスを簡易的なモデルで再現したシミュレーションゲームである。
            </Text>
            <Text mt={4}>下に中央のセルにおける次のステップでの生死の例を示す。生きているセルは■、死んでいるセルは□で表す。</Text>
            <Center><Image src="https://i.imgur.com/SKOdefQ.png" alt="セルの生死についての説明図" my={4}/>
            </Center>
            <Text mt={4}>
              このアプリでは、フィールドの上下と左右がループしています。また、周期2の無限ループになると自動で停止状態になります。
            </Text>
            
            
          </ModalBody>

          <ModalFooter pt={0}>
            <Button variant="ghost" onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
