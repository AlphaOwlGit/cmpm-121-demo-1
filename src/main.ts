import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My frickin' sweet demo";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter = 0;
let incTrue = false;
const button = document.createElement("button");
button.innerHTML = "Click this to make Christmas come faster 🎅";
button.addEventListener("click", () => {
  counter++;
  if (!incTrue) {
    setInterval(increase, 1000);
    incTrue = true;
  }
  button.innerHTML =
    "You want Christmas to come faster " + counter + " times 🎅";
});

function increase() {
  counter++;
  button.innerHTML =
    "You want Christmas to come faster " + counter + " times 🎅";
}

app.append(button);
