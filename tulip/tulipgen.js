

// Function to generate a random color within a specified range
function getRandomBrightPastelColor() {
    const min = 200;  // RGB values, brighter pastels
    const max = 255;  // Maximum RGB value
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;

    return `rgb(${r}, ${g}, ${b})`;
}

// update the border color 
function updateBorderColor() {
    const container = document.querySelector('.image-container');
    container.style.borderColor = getRandomBrightPastelColor();
}

// Set the initial random border color on page load
window.onload = updateBorderColor;
