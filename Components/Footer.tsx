import { Center, Stack, Text, Link } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Center color="black" mt={6}>
      <Stack>
        <Link onClick={() => twitterShare()}>
          <Center>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-twitter"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </Center>
          <Center>
            <Text>share</Text>
          </Center>
        </Link>
        <Text pt={2}>made by @hukurouo</Text>
      </Stack>
    </Center>
  )
}

function twitterShare() {
  var shareURL = 'https://twitter.com/intent/tweet?text=' + `ライフゲームでかわいいデジタル人工生命体を作ろう！` + '&url=' + `https://10tuku.hukurouo.com/`
  window.open(shareURL, 'SNS_window', 'width=600, height=500, menubar=no, toolbar=no, scrollbars=yes')
}
