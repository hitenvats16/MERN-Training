import { questionsObjectsArray } from "../models/models.js";
import { saveLocally, loadLoacally } from "../services/service.js";

function updateTable() {
  // might be cumbersome for the machine
  // painful to read and complex to maintain as well
  let tbody = document.querySelector("#tableBody");
  tbody.innerHTML = "";
  for (let index in questionsObjectsArray) {
    let tbody_contents = "<tr>";
    let questionObject = questionsObjectsArray[index];
    tbody_contents += `
        <td>${questionObject["questionId"]}</td>      
        <td>${questionObject["question"]}</td>
        <td>${questionObject["options"][1]}</td>
        <td>${questionObject["options"][2]}</td>
        <td>${questionObject["options"][3]}</td>        
        <td>${questionObject["options"][4]}</td>
        <td>${questionObject["correctOption"]}</td>
        <td>${questionObject["scoreSlider"]}</td>
        <td>
            <button type="button" class="btn btn-outline-danger">Delete</button>
        </td>
        `;
    tbody_contents += "</tr>";
    tbody.innerHTML += tbody_contents;
  }
}

function takeInput() {
  let questionId = document.querySelector("#questionID").value;
  let question = document.querySelector("#question").value;
  let options = {};
  for (let i = 1; i <= 4; i++) {
    let val = document.querySelector(`#option${i}`).value;
    options[i] = val;
  }

  let select = document.getElementById("correctOption");
  let option = select.options[select.selectedIndex];
  let correctOption = option.value;

  let scoreSlider = document.querySelector("#scoreSlider").value;
  let questionObject = {
    questionId,
    question,
    options,
    correctOption,
    scoreSlider,
  };
  questionsObjectsArray.push(questionObject);
  updateTable();
}

function bindEvents() {
  document.querySelector("#add").addEventListener("click", takeInput);
  document.querySelector("#save").addEventListener("click", saveLocally);
  document.querySelector("#load").addEventListener("click", loadLoacally);
}

window.addEventListener("load", bindEvents);
