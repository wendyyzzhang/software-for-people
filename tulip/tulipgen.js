// Generate a random bright pastel color
function getRandomBrightPastelColor() {
  const min = 200; // Brighter pastels
  const max = 255;
  const r = Math.floor(Math.random() * (max - min + 1)) + min;
  const g = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;

  return `rgb(${r}, ${g}, ${b})`;
}

// Update the border color of the container
function updateBorderColor() {
  const container = document.querySelector('.image-container');
  container.style.borderColor = getRandomBrightPastelColor();
}

// Initialize TulipBorder, attach event listeners after DOM content loads
document.addEventListener("DOMContentLoaded", function () {
  const randomTulipBorder = new TulipBorder("container", {
    randomizeIndividually: true,
  });
  randomTulipBorder.render();

  // Set initial border color
  updateBorderColor();

  // Attach the click event listener to the button
  const changeColorButton = document.getElementById("change-color-button");
  if (changeColorButton) {
    changeColorButton.addEventListener("click", updateBorderColor);
  }

  // Set up a slider to update the number of tulips on the border
  const tulipCount = document.getElementById("tulip-count");
  if (tulipCount) {
    tulipCount.addEventListener("input", (e) => {
      const newCount = parseInt(e.target.value, 10);
      randomTulipBorder.updateTulipCount(newCount);
    });
  }
});

// TulipBorder class definition remains unchanged
class TulipBorder {
  static TULIP_IMAGES = [];

  static TULIP_PATH = "tulips/";
  static TULIP_IMAGE_COUNT = 16;

  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);

    this.options = {
      tulipSize: options.tulipSize || 30,
      tulipsPerEdge: options.tulipsPerEdge || 10,
      tulipOffset: options.tulipOffset || 15,
      className: options.className || "tulip",
      randomizeIndividually: options.randomizeIndividually || false,
    };

    if (!this.container) {
      throw new Error(`Container with id "${containerId}" not found.`);
    }

    for (let i = 0; i < TulipBorder.TULIP_IMAGE_COUNT; i++) {
      let imgPath = `${TulipBorder.TULIP_PATH}tulip_${i + 1}.png`;
      TulipBorder.TULIP_IMAGES.push(imgPath);
    }
  }

  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  createTulip(x, y, rotation = 0) {
    const tulip = document.createElement("img");
    const { className, tulipSize } = this.options;

    tulip.src = this.getRandomItem(TulipBorder.TULIP_IMAGES);
    tulip.className = className;

    Object.assign(tulip.style, {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      width: `${tulipSize}px`,
      height: `${tulipSize}px`,
      transform: `rotate(${rotation}deg)`,
      transformOrigin: "center center",
    });

    return tulip;
  }

  generateEdgePositions(isHorizontal) {
    const { tulipsPerEdge, tulipOffset } = this.options;
    const dimension = isHorizontal
      ? this.container.offsetWidth
      : this.container.offsetHeight;
    const step = dimension / tulipsPerEdge;

    return Array.from(
      { length: tulipsPerEdge },
      (_, i) => step * i + step / 2 - tulipOffset
    );
  }

  render() {
    const fragment = document.createDocumentFragment();
    const { tulipOffset } = this.options;
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    const horizontalPositions = this.generateEdgePositions(true);
    const verticalPositions = this.generateEdgePositions(false);

    const edges = [
      ...horizontalPositions.map((x) => ({ x, y: -tulipOffset + 50, rotation: 0 })),
      ...horizontalPositions.map((x) => ({
        x,
        y: height - tulipOffset,
        rotation: 180,
      })),
      ...verticalPositions.map((y) => ({ x: -tulipOffset + 10, y, rotation: 90 })),
      ...verticalPositions.map((y) => ({
        x: width - tulipOffset,
        y,
        rotation: 270,
      })),
    ];

    edges.forEach(({ x, y, rotation }) => {
      fragment.appendChild(this.createTulip(x, y, rotation));
    });

    this.container.appendChild(fragment);
  }

  destroy() {
    const tulips = this.container.getElementsByClassName(this.options.className);
    while (tulips.length > 0) {
      tulips[0].remove();
    }
  }

  updateTulipCount(newCount) {
    this.options.tulipsPerEdge = newCount;
    this.destroy();
    this.render();
  }
}
