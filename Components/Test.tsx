import React from 'react'
import { Container, Center, Heading, Button} from "@chakra-ui/react";

class Test extends React.Component<{}, {time:number}> {
  constructor(props:any){
    super(props);
    this.state = {
      time: 0
    }
  }
  tick = () =>{
    const timer = setInterval(() => {
      this.setState({time: this.state.time + 1})
    }, 1000)
  }
  render(){
    return (
      <div>{this.state.time}<Button colorScheme="blue" mb={6} onClick={()=>{this.tick()}}>ffn</Button></div>
    )
  }
}
export default Test