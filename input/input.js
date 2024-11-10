// Select the color input and petal elements
const colorPicker = document.getElementById('colorPicker');
const petals = document.querySelectorAll('.petal');

// this updates petal colors based on the chosen color
colorPicker.addEventListener('input', (event) => {
  const selectedColor = event.target.value;
  petals.forEach((petal) => {
    petal.style.backgroundColor = selectedColor;
  });
});

// selecting flower
const flower = document.querySelector('.flower');

// this duplicates the flower when clicked
flower.addEventListener('click', () => {
  // first, clone the flower element
  const flowerClone = flower.cloneNode(true);
  
  // then, get the current petal color
  const currentPetals = flower.querySelectorAll('.petal');
  
  // make sure that the same petal color is the cloned flower
  const clonedPetals = flowerClone.querySelectorAll('.petal');
  clonedPetals.forEach((petal, index) => {
    petal.style.backgroundColor = currentPetals[index].style.backgroundColor;
  });

  // set flowerClone to absolute position for random placement
  flowerClone.style.position = 'absolute';
  
  // Get random values for top and left positions for random placement
  const randomTop = Math.random() * (window.innerHeight - 100); // Subtract flower height to avoid overflow
  const randomLeft = Math.random() * (window.innerWidth - 100); // Subtract flower width to avoid overflow
  
  // Apply the random positions to the cloned flower
  flowerClone.style.top = `${randomTop}px`;
  flowerClone.style.left = `${randomLeft}px`;

  // Append the cloned flower to the body
  document.body.appendChild(flowerClone);
});
