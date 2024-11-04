
var font_size = 100

document.body.onkeydown = function(keypress_event){
  var key = keypress_event.key;
  
  //shows the key pressed 

  var new_element = document.createElement("span")
  new_element.innerHTML = key;
  font_size = font_size + 10;
  new_element.style.fontSize = font_size + "px";
  document.body.appendChild(new_element);

  //changes the background image

  if (key == "p") {
    document.body.style.backgroundColor = "purple";
  } else if (key == "g") {
    document.body.style.backgroundColor = "green";
  } else {
    document.body.style.backgroundColor = "yellow";
  }

  //changes the SRC 

  var image = document.getElementById("myImage");
  if (key === "a") {
    image.src = "https://www.calgiant.com/wp-content/uploads/2021/08/berry-iso-straw-1-878x1024.png"; 
  } else if (key === "b") {
    image.src = "https://community.cloudflare.steamstatic.com/economy/image/a5HYp9Sw61Iks7TiNF57DFqT0e-WtnR84yvwcWpNrTTcGA/360fx360f"; 
  } else if (key === "o") {
    image.src = "https://png.pngtree.com/png-vector/20231014/ourmid/pngtree-fresh-orange-png-png-image_10159570.png";
  } else {
    image.src = "https://www.dole.com/-/media/project/dole/produce-images/fruit/kiwi_cut_web.png?rev=3f6f290b193348dd9d0be9d8c47058a0&hash=7FA9F1090DB28C6EFDA311D473CAF3F3"; 
  }

  //hide the hide element
  var hideElement = document.getElementById("hideMe");
  if (key === "h") {
    hideElement.style.display = "none";
  }

  //make the hide element appear again
  if (key >= 'i' && key <= 'z') {
    hideElement.style.display = "block";
  }

  //element that can be removed
  var removeElement = document.getElementById("removeMe");
  if (key === "x") {
    removeElement.remove(); 
  }

  //target all elements in the same clasds

  if (key === "e") {
    var targetElements = document.getElementsByClassName("targetClass");
    for (var i = 0; i < targetElements.length; i++) {
      targetElements[i].style.backgroundColor = "blue"; 
    }
  }

  //target all elements of a certain tag-- in this case a div

  if (key === "d") {
    var divElements = document.getElementsByTagName("div");
    for (var i = 0; i < divElements.length; i++) {
      divElements[i].style.textAlign = "center" ; 
    }
  }

   // Change multiple CSS properties of all <div> elements if the "f" key is pressed
   if (key === "f") {
    var divElements = document.getElementsByTagName("div");
    for (var i = 0; i < divElements.length; i++) {
      divElements[i].style.color = "blue"; 
      divElements[i].style.backgroundColor = "lightyellow"; 
      divElements[i].style.fontSize = "20px"; 
      divElements[i].style.border = "2px solid red"; 
      divElements[i].style.padding = "10px"; 
      divElements[i].style.margin = "10px";
    }
  }

};
