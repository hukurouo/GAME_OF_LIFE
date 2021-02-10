import { Center, Stack, Text, Link, Button } from '@chakra-ui/react'
import { ShareModal } from './ShareModal'

export default function Footer(props) {
  return (
    <Center color="black">
      <Stack>
        <ShareModal 
          gifGen={()=>{props.gifGen()}}
          twitterShare={()=>{twitterShare()}}
          base64={props.base64}
        />
        <Center>
          <Text mr={1} mt={2}>made by</Text>
          <Link
              color="teal.500"
              mt={2}
              href="https://twitter.com/hukurouo"
              target="_blank"
              rel="noopener noreferrer"
            >
              @hukurouo
            </Link>
          </Center>
        
      </Stack>
      
    </Center>
  )
}

function twitterShare() {
  var shareURL = 'https://twitter.com/intent/tweet?text=' + `ライフゲームでかわいいデジタル人工生命体を作ろう！` + '&url=' + `https://gameoflife.hukurouo.com/`
  window.open(shareURL, 'SNS_window', 'width=600, height=500, menubar=no, toolbar=no, scrollbars=yes')
}
