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
  const saveButton = document.getElementById('save-button');
  const sliderContainer = document.querySelector('.slider-container');

  container.style.borderColor = getRandomBrightPastelColor();
  button.style.backgroundColor = getRandomBrightPastelColor(); 
  saveButton.style.backgroundColor = getRandomBrightPastelColor();
  sliderContainer.style.backgroundColor = getRandomBrightPastelColor();

}

// Function to capture the content and save as an image
async function saveImage() {
  const container = document.querySelector('.image-container');

  // Log the container to ensure it exists and has visible content
  console.log('Container:', container);

  try {
    // Capture the content of the container with html2canvas
    const canvas = await html2canvas(container, { useCORS: true });

    console.log(canvas); // Check the canvas object

    // Ensure canvas is valid
    if (canvas instanceof HTMLCanvasElement) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png'); // Get the base64 data URL for the image
      link.download = 'tulips_screenshot.png'; // Set the file name for the image
      link.click(); // Trigger the download
    } else {
      console.error("The rendered object is not a canvas.");
    }
  } catch (error) {
    console.error('Error capturing the image:', error);
  }
}


// Initialize TulipBorder, attach event listeners after DOM content loads
document.addEventListener("DOMContentLoaded", function () {
  const randomTulipBorder = new TulipBorder("container", {
    randomizeIndividually: true,
  });
  randomTulipBorder.render(); // Initial rendering of tulips

  // Set initial border color
  updateBorderColor();

  // Attach the click event listener to the "Sprout" button
  const changeColorButton = document.getElementById("change-color-button");
  if (changeColorButton) {
    changeColorButton.addEventListener("click", function() {
      // Update border colors
      updateBorderColor();

      // Regenerate the tulips when the button is clicked
      randomTulipBorder.render();  // Call render again to regenerate tulips
    });
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

  // Attach the click event listener to the "Save" button
  const saveButton = document.getElementById("save-button");
  if (saveButton) {
    saveButton.addEventListener("click", saveImage); // Capture and save the image when clicked
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
  
    // Adjust the width and height calculation by including the borderWidth
    const width = containerRect.width - borderWidth * 2;  // Subtract double the borderWidth
    const height = containerRect.height - borderWidth * 2;
  
    // Adjust vertical positions by adding a custom vertical offset
    const verticalOffset = borderWidth * 6;  // You can tweak this value to adjust the shift
  
    // Recalculate positions
    const horizontalPositions = this.generateEdgePositions(true);
    const verticalPositions = this.generateEdgePositions(false);
  
    const edges = [
      // Top edge tulips (shift them down)
      ...horizontalPositions.map((x) => ({
        x: x + borderWidth - 10, // Adjusted for left border
        y: borderWidth + verticalOffset - tulipOffset, // Shifted down
        rotation: 0,
      })),
      // Bottom edge tulips (shift them down)
      ...horizontalPositions.map((x) => ({
        x: x + borderWidth - 10,
        y: height + borderWidth + verticalOffset + tulipOffset, // Shifted down
        rotation: 0,
      })),
      // Left edge tulips
      ...verticalPositions.map((y) => ({
        x: borderWidth - tulipOffset, // Left edge
        y: y + 5*borderWidth,
        rotation: 90,
      })),
      // Right edge tulips
      ...verticalPositions.map((y) => ({
        x: width + borderWidth + tulipOffset, // Right edge
        y: y + 5*borderWidth,
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


document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("save-button");
  const contentWrapper = document.querySelector(".content-wrapper");

  
  const saveMessage = document.createElement("div");
  saveMessage.textContent = "Take a screenshot!";
  saveMessage.style.display = "none"; 
  saveMessage.style.position = "absolute";
  saveMessage.style.top = "60px";
  saveMessage.style.right = "20px";
  saveMessage.style.padding = "10px 15px";
  saveMessage.style.backgroundColor = "rgb(248, 216, 173)";
  saveMessage.style.borderRadius = "8px";
  saveMessage.style.fontFamily = "Strawberry";
  saveMessage.style.fontSize = "16px";
  saveMessage.style.zIndex = "100";
  saveMessage.style.color = "black";
  saveMessage.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

 
  contentWrapper.appendChild(saveMessage);

 
  saveButton.addEventListener("click", () => {
      if (saveMessage.style.display === "none") {
          saveMessage.style.display = "block";
      } else {
          saveMessage.style.display = "none";
      }
  });
});

