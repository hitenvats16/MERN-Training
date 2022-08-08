import { questions } from "../services/questionOperations.js";
window.addEventListener("load", init);

function init() {
  try {
    questions.init().then(() => {
      updateCards(questions.questions);
    });
  } catch (e) {
    console.error(e);
  }
}

function updateCards(arr) {
  arr.forEach(appendToBody);
}

function appendToBody(obj) {
  document.querySelector("#body").append(createCard(obj, checkOnlyOne));
}

function createCard(question, fn) {
  let input1 = createInputDiv(
    question["questionID"],
    question["option1"],
    "option1",
    checkOnlyOne
  );
  let input2 = createInputDiv(
    question["questionID"],
    question["option2"],
    "option2",
    checkOnlyOne
  );
  let input3 = createInputDiv(
    question["questionID"],
    question["option3"],
    "option3",
    checkOnlyOne
  );
  let input4 = createInputDiv(
    question["questionID"],
    question["option4"],
    "option4",
    checkOnlyOne
  );
  let containerInput = createDivWithClassAndChild(
    "container col-11",
    input1,
    input2,
    input3,
    input4
  );
  let divCol = createDivWithClassAndChild("col-1");
  let opti = createDivWithClassAndChild("row", divCol, containerInput);
  let questionid = document.createElement("h1");
  questionid.innerText = question["questionID"];
  questionid.className = "display-4";
  let divForCol1 = createDivWithClassAndChild("col-1", questionid);
  let ques = document.createElement("p");
  ques.innerText = question["question"];
  ques.className = "lead";
  let divForCol11 = createDivWithClassAndChild("col-11", ques);
  let divForRow = createDivWithClassAndChild("row", divForCol1, divForCol11);
  let cont = createDivWithClassAndChild("container", divForRow, opti);
  let contOut = createDivWithClassAndChild(
    "container shadow-sm p-3 mb-5 bg-body rounded mt-2",
    cont
  );
  contOut.id = `containerForQues${question['questionID']}`;
  return createDivWithClassAndChild(
    "ontainer-fluid d-flex justify-content-center flex-column",
    contOut
  );
}

function checkOnlyOne() {
  // functionalu=ity yet to be finished
  let div = this.parentNode.parentNode;
  let arr = div.children
  let currentID = this.id;
  for(let key in arr){
    let id = arr[key].children[0].id;
    if(id !== currentID){
      arr[key].children[0].checked = false;
    }
  }
}

function createDivWithClassAndChild(className, ...childs) {
  let div = document.createElement("div");
  div.className = className;
  for (let key in childs) {
    div.append(childs[key]);
  }
  return div;
}

function createInputDiv(id, option, key, fn) {
  let container = document.createElement("div");
  container.classList.add("mb-2");
  let input = document.createElement("input");
  input.addEventListener("click", fn);
  input.classList.add("form-check-input");
  input.type = "checkbox";
  input.id = key;
  input.value = key;
  input.name = `check${id}`;
  input.setAttribute("qid", id);
  let label = document.createElement("label");
  label.classList.add("form-check-label");
  label.classList.add("ms-2");
  label.innerText = option;
  container.appendChild(input);
  container.appendChild(label);
  return container;
}

