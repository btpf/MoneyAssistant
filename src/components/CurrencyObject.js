import React, { Component } from 'react';
let dollar = require("../resources/OneDollar.jpg")
let definitions = require("./Definitions").default

const DollarWidth = 6.14
const DollarHeight = 2.61



export default class Dollar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 20,
      height: 20
    }
    this.DollarContainer = React.createRef();
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    let width = this.DollarContainer.current.clientWidth
    let height = this.DollarContainer.current.clientHeight
    let itemWidth = this.props.itemWidth
    let itemHeight = this.props.itemHeight

    if (width > height * (itemWidth / itemHeight)) {
      console.log("Width is greater than height " + width + " , " + height)
      this.setState({ width: height * (itemWidth / itemHeight), height: height })
    } else {
      console.log("height is greater than height " + width + " , " + height)
      this.setState({ height: width * (itemHeight / itemWidth), width: width })
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
    return (
      <div ref={this.DollarContainer} style={{
        height: "100%",
        width: "100%",
        // backgroundColor: "pink",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>


        <div height={this.state.height} style={{
          display: "inline-grid",
          minWidth: 0,
          backgroundImage: "url(" + this.props.image + ")",
          position: "absolute",
          minHeight: 0,
          gridTemplateColumns: "50% 50%",
          gridTemplateRows: "100%",
          // backgroundColor: "purple",
          backgroundSize: "contain",
          height: this.state.height + "px",
          width: this.state.width + "px"
        }}>

          <div onClick={()=>this.props.decrement()} style={{
            height: this.state.height,
            cursor: "pointer",
            gridColumn: "1/ span 1",
            gridRow: "1",
            backgroundColor: this.props.change?"black":"red",
            opacity: (this.props.change && this.props.amount == 0)?1:0.1,
            borderRadius: (this.props.type == "coin") ? (this.state.height + "px 00% 000% " + this.state.height + "px") : ""
          }} />

          <div onClick={()=>this.props.increment()} style={{
            height: this.state.height,
            cursor: "pointer",
            gridColumn: "2",
            gridRow: "1",
            backgroundColor: this.props.change?"black":"green",
            opacity: (this.props.change && this.props.amount == 0)?1:0.1,
            borderRadius: (this.props.type == "coin") ? ("0px " + this.state.height + "px " + this.state.height + "px 10px") : ""
          }} />

          <div style={{
            color: "#FFFFFF",
            pointerEvents: "none",
            fontWeight: "bold",
            zIndex: 1,
            fontFamily: "Noto Sans",
            WebkitTextStroke: "1px black",
            display: "flex",
            gridColumn: "1/ span 2",
            gridRow: "1",
            fontSize:  ( this.props.amount > 0)?48:24,
            justifyContent: "center",
            alignItems: "center"
  }}>{this.props.amount}x</div>

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