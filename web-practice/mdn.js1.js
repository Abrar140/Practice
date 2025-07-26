/*amnnonymus function
arow function                       use varaiavle to assign value
in variable a function
function fastclass function   func =variale
call by variable name
*/
const myheading= document.querySelector("h1");
myheading.textContent="abrar";
console.log("you got me")

document.querySelector('h1').addEventListener("click",function(){
    alert("oh you caught me")
});

document.querySelector('h2').addEventListener("click",()=>{
    alert("oh you caught me")
});

const button= document.querySelector("button");
button.addEventListener("click" , updatename());
 function updatename(){
const name=prompt('enter new name')
button.textContent='player1  ${name}'
}

const btn1 = document.querySelector(".btn");
btn1.addEventListener("click", (event) => {
    const name = prompt("Enter your name");
    if (name) {
        btn1.textContent = `My name is ${name}`;
       
    }
});