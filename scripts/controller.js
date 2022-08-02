function compute(){
    console.log('inside compute')
    let basicSalary = document.querySelector('#salaryInput').value
    let paras = document.getElementsByTagName('p')
    paras[0].innerText = salaryOperations.da(basicSalary)
    paras[1].innerText = salaryOperations.hra(basicSalary)
    paras[2].innerText = salaryOperations.ta(basicSalary)
}

function bindEvents(){
    let btn = document.querySelector('#calculateButton')
    btn.addEventListener("click",compute) // DOUBT : using compute() instead of compute gets called automaticaly without btn being clicked....  
}

window.addEventListener("load",bindEvents())
