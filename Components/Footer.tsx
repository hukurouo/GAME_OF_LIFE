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
        <Center><Text pt={2}>made by @hukurouo</Text></Center>
        
      </Stack>
      
    </Center>
  )
}

function twitterShare() {
  var shareURL = 'https://twitter.com/intent/tweet?text=' + `ライフゲームでかわいいデジタル人工生命体を作ろう！` + '&url=' + `https://gameoflife.hukurouo.com/`
  window.open(shareURL, 'SNS_window', 'width=600, height=500, menubar=no, toolbar=no, scrollbars=yes')
}
