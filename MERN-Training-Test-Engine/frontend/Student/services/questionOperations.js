const LOAD_URL = "http://127.0.0.1:8001/api/test-engine/load/";

export const questions = {
    questions:[],
    async init(){
        let obj = await fetchQuestions(LOAD_URL);
        this.questions = obj;
        this.sortById();
    },
    sortById(){
        this.questions.sort((q1,q2)=>{
            let arg1 = q1['questionID'];
            let arg2 = q2['questionID'];
            if(arg1<arg2) return -1;
            if(arg1>arg2) return 1;
            return 0;
          })
    },
    searchById(id){
        return this.questions.find((elem) => elem['questionID']==id)
    }
}

async function fetchQuestions(url){
    let data = await fetch(url);
    return data.json();
}