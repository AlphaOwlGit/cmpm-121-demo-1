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

let santaBuckCounter: number = 0;
let buckGrowthRate: number = 0;
let lastTime:number = performance.now();

const mainButton = document.createElement("button");
mainButton.innerHTML = "Start by clicking to generate a Santa Buck 🎅";
mainButton.addEventListener("click", () => {
  santaBuckCounter++;
  mainButton.innerHTML = getButtonText();
});
app.append(mainButton);

class ItemUpgrade {
  name: string;
  price: number;
  buckGrowthRate: number;
  count: number;
  description: string;
  button: HTMLButtonElement;

  constructor(
    name: string,
    price: number,
    buckGrowthRate: number,
    description: string,
  ) {
    this.name = name;
    this.price = price;
    this.buckGrowthRate = buckGrowthRate;
    this.count = 0;
    this.description = description;
    this.button = this.createButton();
  }

  createButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerHTML = this.displayItemCost();
    button.title = this.description;
    button.addEventListener("click", () => this.purchase());
    app.append(button);
    return button;
  }

  purchase() {
    if (santaBuckCounter >= this.price) {
      santaBuckCounter -= this.price;
      buckGrowthRate += this.buckGrowthRate;
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

const availableItems: ItemUpgrade[] = [
  new ItemUpgrade(
    "Manual Elf Labor 🧝",
    10,
    0.1,
    "What's better than using your already-working indentured employees?",
  ),
  new ItemUpgrade(
    "Elf Carts 🛒🧝",
    100,
    2.0,
    "The key to their work success? DOTA 2 Techies guides.",
  ),
  new ItemUpgrade("Racing Reindeers 🦌", 500, 10, "Runs on carrots-on-sticks!"),
  new ItemUpgrade(
    "Repurposed Workshops 🧱",
    1000,
    25,
    "Turning the toy build stage into a stock exchange.",
  ),
  new ItemUpgrade(
    "Snowman Special Deliveries ☃️",
    2500,
    50,
    "If you use Frosty's Fast Service, it'll cost an additional $4.99.",
  ),
];

const statusText = document.createElement("div");
app.append(statusText);

function displayStatus() {
  const growthText = `Current Growth Rate: ${buckGrowthRate.toFixed(2)} Santa Bucks/sec`;
  const itemCounts = availableItems
    .map((item) => `${item.name}: ${item.count}`)
    .join(", ");
  statusText.innerHTML = `${growthText}<br><br>Items purchased: ${itemCounts}`;
}

function checkUpgradeStatus() {
  availableItems.forEach((item) => {
    item.button.disabled = santaBuckCounter < item.price;
  });
}

function upgradeAutoGrowth(elapsed: number) {
  santaBuckCounter += (buckGrowthRate * elapsed) / 1000;
  mainButton.innerHTML = getButtonText();
}

function getButtonText() {
  return `${santaBuckCounter.toFixed(4)} Santa Bucks have been produced 🎅`;
}

function animate() {
  const currentTime = performance.now();
  const elapsed = currentTime - lastTime;
  lastTime = currentTime;
  upgradeAutoGrowth(elapsed);
  checkUpgradeStatus();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
