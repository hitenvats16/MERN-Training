const SAVE_URL = "http://127.0.0.1:8001/api/test-engine/save/";
const LOAD_URL = "http://127.0.0.1:8001/api/test-engine/load/";

export const questionOperations = {
  questions: [],
  questionID:1,
  isLoading:false,
  add(questionObject) {
    questionObject['delete']=false;
    questionObject['questionID'] = this.questionID++;
    this.questions.push(questionObject);
  },
  toggle(id) {
    let object_in_array = this.searchById(id);
    if(object_in_array !== -1){
        let val = object_in_array['delete'];
        object_in_array['delete'] = !val;
    }
  },
  searchById(id) {
    return this.questions.find((elem) => elem['questionID']==id)
  },
  countMarked(){
    return this.questions.filter((elem)=>elem['delete']).length;
  },
  countUnmarked(){
    return this.questions.length-this.countMarked();
  },
  countTotal(){
    return this.questions.length;
  },
  delete(){
    this.questions = this.questions.filter((elem) => !elem['delete'])
    this.questionsAboutToDelete = 0;
    if(this.questions.length===0)
      this.updateID();
  },
  saveToLocal(){
    localStorage.setItem('questions',JSON.stringify(this.questions))
  },
  loadFromLocal(){
    this.questions = JSON.parse(localStorage.getItem('questions'))
    this.updateID();
  },
  update(updatedObject){
    let obj = this.searchById(updatedObject['questionID']);
    for(let key in updatedObject){
      obj[key]=updatedObject[key];
    }
    return obj;
  },
  sort(field){
    this.questions.sort((q1,q2)=>{
      let arg1 = q1[field];
      let arg2 = q2[field];
      if(arg1<arg2) return -1;
      if(arg1>arg2) return 1;
      return 0;
    })
  },
  updateID(){
    let number = 0;
    this.questions.forEach((obj)=>{
      let id = obj['questionID']
      number = Math.max(id,number);
    })
    this.questionID = number+1;
  },
  searchByKeyWord(keyWord){
    return this.questions.filter((elem)=>{
      let flag = false;
      for(let key in elem){
        let innerFlag = false;
        if(typeof elem[key] == 'string'){
          innerFlag = elem[key].toLowerCase().includes(keyWord.toLowerCase());
        } else if (typeof elem[key] == 'number'){
          innerFlag = elem[key]==keyWord;
        }
        flag = flag || innerFlag;
      }
      return flag;
    })
  },
  saveToServer(){
    this.questions.forEach((elem)=>{
      const xhr = new XMLHttpRequest();
      xhr.open("POST",SAVE_URL,true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(elem));
    })
    console.log(this.questions)
  },
  async loadFromServer(){
    let obj = await fetchAsync(LOAD_URL)
    this.questions = obj;
    this.updateID();
  }
};

async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

