import React from "react"
import Currency from "../components/Currency"
import { Component } from 'react';
import { Helmet } from "react-helmet"

const defaultState = {
    cost: "",
    total: 0,
    statusColor: "black",
    quantity: {
        coin: {
            1: 0,
            5: 0,
            10: 0,
            25: 0,
        },
        dollar: {
            1: 0,
            5: 0,
            10: 0,
            20: 0,
            50: 0,
            100: 0,
        }
    },
    enteringCost: true,
    status: "Enter Cash: ",
    calculated: false
}
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { ...defaultState, quantity: { coin: { ...defaultState.quantity.coin }, dollar: { ...defaultState.quantity.dollar } } }
        this.inputRef = React.createRef();
    }
    componentDidMount() {
        // document.documentElement.requestFullscreen()
        // document.documentElement.webkitRequestFullscreen()
    }

    render() {
        console.log("LOGGING STATE")
        console.log(this.state)
        return (
            <div style={{ display: "flex" }}>
                <Helmet>
                    <meta name="mobile-web-app-capable" content="yes" />
                </Helmet>
                <div id="LeftSide" style={{ flexGrow: 8, flexBasis: "0" }}>

                    <div id="TitleBar" style={{
                        height: 60,
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        display: "flex",
                        justifyContent: "Center"
                    }}><div style={{
                        alignSelf: "center",
                        fontFamily: "Noto Sans",
                        fontWeight: "bold",
                        fontSize: 24
                    }}>Change Calculator</div></div>
                    <div style={{
                        display: "flex",
                        justifyContent: "Center",
                        fontFamily: "Noto Sans",
                        fontWeight: "bold",
                        fontSize: 36,
                        height: 80,
                        textAlign: "center"
                    }}>
                        <div style={{ color: this.state.statusColor, alignSelf: "center" }}>
                            {this.state.status}
                        </div>
                    </div>

                    <div id="MainBody" style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        "height": "calc(100vh - (60px + 80px))",
                        // backgroundColor: "lightBlue",
                        flexFlow: "column wrap",
                        // transition: "1s",
                        visibility: (this.state.enteringCost) ? "hidden" : "",
                        opacity: (this.state.enteringCost) ? "0" : "1"
                    }}>
                        {/* Code For Body */}
                        {/* [ 10, 20], [50, 100],[53, 100] */}
                        {[[1, 5], [10, 20], [50, 100]].map((bills) => {
                            return (
                                <div id="Row" key={bills} style={{
                                    flexGrow: 1,
                                    margin: "2.5px 0px 2.5px 0px",
                                    // backgroundColor: "red",
                                    display: "flex",
                                    // border: "1px solid black",
                                    alignItems: "center",
                                    justifyContent: "space-evenly"
                                }}>
                                    {bills.map(bill => {
                                        return (<div key={bill} style={{
                                            // border: "1px solid Blue",
                                            height: "100%",
                                            flexGrow: 1,
                                            // backgroundColor: "Green"
                                        }}>

                                            {/* <div style={{height:"100%", width:"100%", backgroundColor:"green"}}> */}
                                            {/* <Dollar /> */}
                                            <Currency type="dollar"
                                                increment={() => {
                                                    if (!this.state.calculated) {
                                                        let state = { ...this.state }
                                                        state.quantity.dollar[bill] = this.state.quantity.dollar[bill] + 1
                                                        state.total = state.total + bill
                                                        this.setState({
                                                            ...state
                                                        })
                                                    }
                                                }}
                                                decrement={() => {
                                                    let state = { ...this.state }
                                                    if (state.quantity.dollar[bill] > 0 && !this.state.calculated) {
                                                        state.quantity.dollar[bill] = this.state.quantity.dollar[bill] - 1
                                                        state.total = state.total - bill
                                                        this.setState({
                                                            ...state
                                                        })
                                                    }
                                                }}
                                                amount={bill}
                                                quantity={this.state.quantity.dollar[bill]} change={this.state.calculated} />
                                            {/* </div> */}


                                        </div>)
                                    })}

                                </div>
                            )
                        })}

                        {[[1, 5, 10, 25]].map((coins) => {
                            return (
                                <div id="Row" key={coins} style={{
                                    flexGrow: 1,
                                    margin: "2.5px 0px 2.5px 0px",
                                    // backgroundColor: "red",
                                    display: "flex",
                                    // border: "1px solid black",
                                    alignItems: "center",
                                    justifyContent: "space-evenly"
                                }}>
                                    {coins.map(coin => {
                                        return (<div key={coin} style={{
                                            // border: "1px solid Blue",
                                            height: "100%",
                                            flexGrow: 1,
                                            // backgroundColor: "Green"
                                        }}>

                                            {/* <div style={{height:"100%", width:"100%", backgroundColor:"green"}}> */}
                                            {/* <Dollar /> */}
                                            <Currency increment={() => {
                                                if (!this.state.calculated) {
                                                    let state = { ...this.state }
                                                    state.quantity.coin[coin] = this.state.quantity.coin[coin] + 1
                                                    state.total = state.total + (coin / 100)
                                                    this.setState({
                                                        ...state
                                                    })
                                                }
                                            }}
                                                decrement={() => {
                                                    let state = { ...this.state }
                                                    if (state.quantity.coin[coin] > 0 && !this.state.calculated) {
                                                        state.quantity.coin[coin] = this.state.quantity.coin[coin] - 1
                                                        state.total = state.total - (coin / 100)
                                                        this.setState({
                                                            ...state
                                                        })
                                                    }
                                                }} type="coin" change={this.state.calculated} quantity={this.state.quantity.coin[coin]} amount={coin} />
                                            {/* </div> */}


                                        </div>)
                                    })}

                                </div>
                            )
                        })}





                    </div>
                </div>




                {/* Code For Sidebar width:300*/}
                <div id="RightSide" style={{ flexGrow: 1, flexDirection: "column", display: "flex", backgroundColor: "#EEEEEE" }}>
                    <div id="inputs" style={{ display: "flex", flexGrow: 1, justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
                        <div>
                            <div style={{ fontFamily: "Noto Sans", fontSize: 32, fontWeight: 600, textAlign: "center", marginBottom: 30 }}>Cost</div>
                            <input type="number" ref={this.inputRef} onClick={()=>this.setState({enteringCost:true})} onKeyPress={event => {
                                if (event.key === "Enter") {
                                    this.inputRef.current.blur();
                                    this.setState({enteringCost:false})
                                }
                            }} style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", backgroundColor: "FFFF", border: "none", width: 155, height: 45, textAlign: "center", fontSize: 24, fontWeight: "bold" }} value={this.state.cost} onChange={(e) => this.setState({ cost: e.target.value })} />
                        </div>
                        <div style={{ opacity: (this.state.enteringCost) ? "0" : "1", visibility: (this.state.enteringCost) ? "hidden" : "" }}>
                            <div style={{ fontFamily: "Noto Sans", fontSize: 32, fontWeight: 600, textAlign: "center", marginBottom: 30 }}>Recieved</div>
                            <div style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", cursor: "pointer", fontFamily: "Noto Sans", border: "2px solid #5FA9FF", borderRadius: 10, backgroundColor: "white", width: 155, height: 45, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 24, fontWeight: "bold" }}>$ {this.state.total.toFixed(2)}</div>
                        </div>

                        <div style={{ opacity: (this.state.enteringCost) ? "0" : "1", visibility: (this.state.enteringCost) ? "hidden" : "" }} onClick={() => {
                            let remaining = this.state.cost - this.state.total;
                            console.log("REMAINING: " + remaining)
                            if (remaining == 0) {
                                this.setState({ calculated: true, statusColor: "green", status: "PAID", quantity: { coin: { ...defaultState.quantity.coin }, dollar: { ...defaultState.quantity.dollar } } })
                            } else if (remaining > 0) {
                                this.setState({ status: "ERROR: Not Enough Money", statusColor: "red", cost: remaining, total: 0, quantity: { coin: { ...defaultState.quantity.coin }, dollar: { ...defaultState.quantity.dollar } } })

                            } else {
                                remaining *= -1;
                                let dollarObj = {
                                    1: 0,
                                    5: 0,
                                    10: 0,
                                    20: 0,
                                }
                                //Since arrays do not have an order, we must also use an array to map
                                let dollarArr = [20, 10, 5, 1];
                                dollarArr.map(function (amount) {
                                    dollarObj[amount] = Math.floor(remaining / amount)
                                    remaining -= Math.floor(remaining / amount) * amount
                                })

                                let coinObj = {
                                    1: 0,
                                    5: 0,
                                    10: 0,
                                    25: 0,
                                }
                                //Since arrays do not have an order, we must also use an array to map
                                let coinArr = [25, 10, 5, 1];
                                coinArr.map(function (amount) {
                                    console.log(amount)
                                    amount = amount / 100
                                    coinObj[amount * 100] = Math.floor(remaining.toFixed(2) / amount)
                                    remaining -= Math.floor(remaining / amount) * amount
                                })
                                console.log(dollarObj)
                                console.log(coinObj)
                                console.log(remaining.toFixed(2))
                                this.setState({
                                    calculated: true, statusColor: "green", status: "Give Change",
                                    quantity: { coin: { ...defaultState.quantity.coin, ...coinObj }, dollar: { ...defaultState.quantity.dollar, ...dollarObj } }
                                })
                            }
                        }} style={{ backgroundColor: "#5BFF61", opacity: (this.state.enteringCost) ? "0" : "1", visibility: (this.state.enteringCost) ? "hidden" : "", height: 65, width: 175, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontFamily: "Noto Sans", fontSize: 24, fontWeight: "600", borderRadius: 25 }}>
                            Calculate
            </div>

                    </div>

                    <div id="spacer" style={{ flexGrow: 1 }} />
                    <div style={{textAlign:"center",visibility: (this.state.calculated == 0) ? "hidden" : "", fontFamily:"Noto Sans"}}>Change: $ {(this.state.total- this.state.cost).toFixed(2)}</div>
                    <div style={{ display: "flex", opacity: (!this.state.calculated) ? "0.2" : "1", justifyContent: "center", alignItems: "center" }}>
                        <div id="reset" onClick={() => this.setState({ ...defaultState, quantity: { coin: { ...defaultState.quantity.coin }, dollar: { ...defaultState.quantity.dollar } } }
                        )} style={{ display: "flex", height: 65, marginBottom: 25, borderRadius: 25, width: 175, justifyContent: 'center', alignItems: "center", fontSize: 24, fontWeight: "bold", fontFamily: "Noto Sans", cursor: "pointer", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", backgroundColor: "#FF5B6E" }}>Reset</div>
                    </div>

                </div>
            </div>
        )
    }
}