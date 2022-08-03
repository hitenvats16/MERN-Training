import { questionsObjectsArray } from "../models/models.js"

export function saveLocally(){
    let stringifiedVersion = JSON.stringify(questionsObjectsArray)
    localStorage.setItem('questionsObjectArray',stringifiedVersion)
    console.log(questionsObjectsArray)
}

export function loadLoacally(){
    let savedResult = localStorage.getItem('questionsObjectArray') 
    let parsedResult = JSON.parse(savedResult)
    questionsObjectsArray = []
    for(let index in parsedResult){
        questionsObjectsArray.push(parsedResult[index])
    }
    console.log(questionsObjectsArray)
}