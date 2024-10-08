import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Santanomics";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const text = document.createElement("h2");
text.innerHTML =
  "For this upcoming Christmas. Santa Claus wants to introduce a new form of present for the kids around the world: Santa Bucks. But he needs help get his new enterprise off the ground!";
app.append(text);

let counter = 0;
let growthRate = 0;
let lastTime = performance.now();
const button = document.createElement("button");
button.innerHTML = "Start by clicking to generate a Santa Buck 🎅";
button.addEventListener("click", () => {
  counter++;
  button.innerHTML = counter.toFixed(4) + " Santa Bucks has been produced 🎅";
  checkUpgradeStatus();
});
app.append(button);

const upgrade = document.createElement("button");
upgrade.innerHTML = "Manual Elf Labor 🧝";
upgrade.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    checkUpgradeStatus();
  }

  button.innerHTML = counter.toFixed(4) + " Santa Bucks has been produced 🎅";
});
app.append(upgrade);

requestAnimationFrame(animate);

function animate() {
  const currentTime = performance.now();
  const elapsed = currentTime - lastTime;
  lastTime = currentTime;
  upgradeAutoGrowth(elapsed);
  checkUpgradeStatus();

  requestAnimationFrame(animate);
}

function checkUpgradeStatus() {
  upgrade.disabled = counter < 10;
}

function upgradeAutoGrowth(elapsed: number) {
  counter += (growthRate * elapsed) / 1000;
  button.innerHTML = counter.toFixed(4) + " Santa Bucks has been produced 🎅";
}
