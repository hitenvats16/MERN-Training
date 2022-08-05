export const questionOperations = {
  questions: [],
  questionID:1,
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
    if(this.countTotal()===0){
      this.questionID = 1;
      return;
    }
    this.questionID = this.questions[this.questions.length-1]['questionID'] + 1;
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
  }
};

