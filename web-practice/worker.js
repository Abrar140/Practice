
let count = 0;

function incrementCount() {
  count++;
  postMessage(count);
}

setInterval(incrementCount, 1000);
