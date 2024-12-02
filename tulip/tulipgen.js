// Generate a random bright pastel color
function getRandomBrightPastelColor() {
  const min = 200; // Brighter pastels
  const max = 255;
  const r = Math.floor(Math.random() * (max - min + 1)) + min;
  const g = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;

  return `rgb(${r}, ${g}, ${b})`;
}

// Update the border color of the container and the button background color
function updateBorderColor() {
  const container = document.querySelector('.image-container');
  const button = document.getElementById('change-color-button');

  container.style.borderColor = getRandomBrightPastelColor();
  button.style.backgroundColor = getRandomBrightPastelColor(); 
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
      console.log(`Slider value changed to: ${newCount}`);
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
    const { tulipsPerEdge } = this.options;
    const dimension = isHorizontal
      ? this.container.offsetWidth
      : this.container.offsetHeight;
    const step = dimension / tulipsPerEdge;
  
    // Center each tulip within its segment
    return Array.from(
      { length: tulipsPerEdge },
      (_, i) => step * i + step / 2 // Remove unnecessary offsets
    );
  }  

  render() {
    this.destroy(); // Clear existing tulips
  
    const fragment = document.createDocumentFragment();
    const { tulipOffset } = this.options;
  
    const containerRect = this.container.getBoundingClientRect();
    const borderWidth = parseFloat(getComputedStyle(this.container).borderWidth) || 0;
  
    const width = containerRect.width - borderWidth * 2;
    const height = containerRect.height - borderWidth * 2;
  
    // Recalculate positions
    const horizontalPositions = this.generateEdgePositions(true);
    const verticalPositions = this.generateEdgePositions(false);
  
    const edges = [
      ...horizontalPositions.map((x) => ({
        x: x + borderWidth, // Adjusted for left border
        y: borderWidth - tulipOffset, // Top edge
        rotation: 0,
      })),
      ...horizontalPositions.map((x) => ({
        x: x + borderWidth,
        y: height + borderWidth + tulipOffset, // Bottom edge
        rotation: 180,
      })),
      ...verticalPositions.map((y) => ({
        x: borderWidth - tulipOffset, // Left edge
        y: y + borderWidth,
        rotation: 90,
      })),
      ...verticalPositions.map((y) => ({
        x: width + borderWidth + tulipOffset, // Right edge
        y: y + borderWidth,
        rotation: 270,
      })),
    ];
  
    // Add tulip images
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
