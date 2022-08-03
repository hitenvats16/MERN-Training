import {salaryOperations, netSalary} from './model.js'

function compute() {
    console.log('inside compute')
    let basicSalary = document.querySelector('#salaryInput').value
    for(let key in salaryOperations){
        document.getElementById(key).innerText = salaryOperations[key](basicSalary)
    }
    document.querySelector('#netBox').innerText = netSalary(basicSalary)
}

function bindEvents() {
    let btn = document.querySelector('#calculateButton')
    btn.addEventListener("click", compute)
}

window.addEventListener("load", bindEvents())
