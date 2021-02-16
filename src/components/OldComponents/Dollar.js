import React, { Component } from 'react';
let dollar = require("../resources/OneDollar.jpg")
let definitions = require("./Definitions").default

const DollarWidth = 6.14
const DollarHeight = 2.61



export default class Dollar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width:  800,
      height: 182
    }
    this.DollarContainer = React.createRef();
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    console.log(definitions)
      let width = this.DollarContainer.current.clientWidth
      let height = this.DollarContainer.current.clientHeight
      if(width > height * (DollarWidth/DollarHeight)){
          console.log("Width is greater than height " + width + " , " + height)
          this.setState({width:height * (DollarWidth/DollarHeight), height:height})
      }else{
        console.log("height is greater than height " + width + " , " + height)
        this.setState({height: width * (DollarHeight/DollarWidth), width:width})
      }
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    console.log(definitions.dollar.amounts["1"])
    //   console.log(this.state.height)
    //   console.log(this.state.width)
    //backgroundImage:"url(" + dollar + ")"

    return(
       <div ref={this.DollarContainer} style={{height:"100%",width:"100%",backgroundColor:"pink", display:"flex", justifyContent:"center", alignItems:"center"}}>
       <div height={this.state.height} style={{display:"inline-grid",minWidth:0,backgroundImage:"url(" + dollar + ")",position:"absolute", minHeight: 0, gridTemplateColumns:"50% 50%", gridTemplateRows:"100%", backgroundColor:"purple",  backgroundSize:"contain",height:this.state.height + "px",width:this.state.width + "px"}}>
         <div style={{height:this.state.height, gridColumn:"1/ span 1",gridRow:"1", backgroundColor: "green", opacity:0.2}}/>
         <div style={{height:this.state.height, gridColumn:"2",gridRow:"1", backgroundColor: "blue", opacity:0.2}}/>
         <div style={{color:"#FFFFFF", fontWeight:"bold", zIndex:1, fontFamily:"Noto Sans", WebkitTextStroke:"1px black", display:"flex", gridColumn:"1/ span 2", gridRow:"1",fontSize:32, justifyContent:"center", alignItems:"center"}}>$1</div>
       </div>
       </div>
    );
  }
}


{/* <div ref={this.myDollar} style={{height:"100%",
width:"100%",
backgroundImage:"url(" + dollar+")",
backgroundSize:"contain",
backgroundRepeat:"no-repeat",
backgroundPosition:"center center"

}}/> */}