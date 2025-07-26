let cheese = "Cheddar";

if (cheese) {
  console.log("Yay! Cheese available for making cheese on toast.");
} else {
  console.log("No cheese on toast for you today.");
}
let temp=86;
if(temp>86){
    parseFloat.textContent=   "It is nice and sunny outside today. Wear shorts! Go to the beach, or the park, and get an ice cream.";
}


const select1= document.querySelector('select');
const para= document.querySelector('p');
select1.addEventListener("change", weather)

function weather(){
    const choice = select1.value;

  if (choice === "sunny") {
    para.textContent =
      "It is nice and sunny outside today. Wear shorts! Go to the beach, or the park, and get an ice cream.";
  } else if (choice === "rain") {
    para.textContent =
      "Rain is falling outside; take a rain coat and an umbrella, and don't stay out for too long.";
  } else if (choice === "cloudy") {
    para.textContent =
      "The snow is coming down — it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.";
  } else if (choice === "dizzling") {
    para.textContent =
      "It isn't raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.";
  } else {
    para.textContent = "";
  }
}

var button1 = document.getElementById('firstbutton');
var h1s = document.getElementById('h1');

button1.addEventListener('click', function() {
    if (h1s.innerText.trim() === "i am abrar") {
        h1s.innerText = "h1 calling";
    } else {
        h1s.innerText = "h1 not calling";
    }
});