function add(){
    let totalSum = 0
    for(let i =0; i<arguments.length; i++){
        if(typeof arguments[i]=='function'){
            arguments[i] = arguments[i]()
        }
        if(typeof arguments[i] =='object'){
            let res = 0
            for(let j=0; j<arguments[i].length; j++){
                res = res + add(arguments[i][j])
            }
            arguments[i] = res
        }
        let parsed = parseInt(arguments[i])
        if(isNaN(parsed)===false){
            totalSum = totalSum+parsed
        }
    }
    return totalSum
}
