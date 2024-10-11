import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Santanomics";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const text = document.createElement("h2");
text.innerHTML =
  "For this upcoming Christmas, Santa Claus wants to introduce a new form of present for the kids around the world: Santa Bucks. But he needs help get his new enterprise off the ground!";
app.append(text);

let counter = 0;
let growthRate = 0;
let lastTime = performance.now();

class UpgradeItem {
  name: string;
  price: number;
  growthRate: number;
  count: number;
  button: HTMLButtonElement;

  constructor(name: string, price: number, growthRate: number) {
    this.name = name;
    this.price = price;
    this.growthRate = growthRate;
    this.count = 0;
    this.button = this.createButton();
  }

  createButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerHTML = this.displayItemCost();
    button.addEventListener("click", () => this.purchase());
    app.append(button);
    return button;
  }

  purchase() {
    if (counter >= this.price) {
      counter -= this.price;
      growthRate += this.growthRate;
      this.count++;
      this.price *= 1.15;
      this.button.innerHTML = this.displayItemCost();
      this.updateStatus();
    }
  }

  displayItemCost(): string {
    return `Buy ${this.name} (${this.price.toFixed(2)} Santa Bucks)`;
  }

  updateStatus() {
    checkUpgradeStatus();
    displayStatus();
  }
}

const availableItems: UpgradeItem[] = [
  new UpgradeItem("Manual Elf Labor 🧝", 10, 0.1),
  new UpgradeItem("Elf Carts 🛒🧝", 100, 2.0),
  new UpgradeItem("Racing Reindeer 🦌", 1000, 50),
];

const mainButton = document.createElement("button");
mainButton.innerHTML = "Start by clicking to generate a Santa Buck 🎅";
mainButton.addEventListener("click", () => {
  counter++;
  mainButton.innerHTML = getButtonText();
});
app.append(mainButton);

const statusText = document.createElement("div");
app.append(statusText);

function getButtonText() {
  return `${counter.toFixed(4)} Santa Bucks have been produced 🎅`;
}

function displayStatus() {
  const growthText = `Current Growth Rate: ${growthRate.toFixed(2)} Santa Bucks/sec`;
  const itemCounts = availableItems
    .map((item) => `${item.name}: ${item.count}`)
    .join(", ");
  statusText.innerHTML = `${growthText}<br><br>Items purchased: ${itemCounts}`;
}

function animate() {
  const currentTime = performance.now();
  const elapsed = currentTime - lastTime;
  lastTime = currentTime;
  upgradeAutoGrowth(elapsed);
  checkUpgradeStatus();
  requestAnimationFrame(animate);
}

function checkUpgradeStatus() {
  availableItems.forEach((item) => {
    item.button.disabled = counter < item.price;
  });
}

function upgradeAutoGrowth(elapsed: number) {
  counter += (growthRate * elapsed) / 1000;
  mainButton.innerHTML = getButtonText();
}

requestAnimationFrame(animate);
