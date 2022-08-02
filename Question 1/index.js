var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
document.write(today);
var check=prompt("enter your birthday in ddmm");
var dd1= check.slice(0,2);
var mm1=check.slice(2,5);
const func=()=>{
    
    if(dd==dd1  && mm==mm1){
        alert("happy birthday");
    }
}
func();
const func2 =()=>{
    var check2=prompt("enter your age");
    var month=check2*52;
    alert(month);
}
func2();