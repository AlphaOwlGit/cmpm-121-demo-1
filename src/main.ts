import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My frickin' sweet demo";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter = 0;
let incTrue = false;
let lastTime = performance.now();
const button = document.createElement("button");
button.innerHTML = "Click this to make Christmas come faster 🎅";
button.addEventListener("click", () => {
  counter++;
  if (!incTrue) {
    requestAnimationFrame(animate);
    incTrue = true;
  }
  button.innerHTML =
    counter + " seconds have passed since you said you wanted Christmas to come faster 🎅";
});

function animate() {
  const currentTime = performance.now();
  const elapsed = currentTime - lastTime;
  lastTime = currentTime;
  const increaseAmount = elapsed / 1000;
  counter += increaseAmount;

  requestAnimationFrame(animate);
  button.innerHTML =
    counter + " seconds have passed since you said you wanted Christmas to come faster 🎅";
}

app.append(button);
