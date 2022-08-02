function sandwitchCalc() {
    if (arguments.length === 1) {
        let bread = arguments[0]
        console.log("Number of Sandwitches: ", parseInt(bread / 2))
        return parseInt(bread / 2)
    }
    let bread = arguments[0]
    let cheese = arguments[1]
    let breadRequiredForOneSandwich = parseInt(bread/2)
    console.log("Number of Sandwiches: ",Math.min(cheese,breadRequiredForOneSandwich))
    return Math.min(cheese,breadRequiredForOneSandwich)
}