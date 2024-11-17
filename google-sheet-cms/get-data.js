var AppScriptUrl = 'https://script.google.com/macros/s/AKfycbwTAXu5FLo9lm7MZXSeEfHIlv1AodT22zMhPDV9YwcuQYp3i-Gn8byfNnO0PdxMmjx7/exec';

function getData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Request was successful
        var response = JSON.parse(xhr.responseText);
        // Handle the response data here
         handleData(response);
         console.log(response);
      } else {
        // Request failed
        console.error('Request failed:', xhr.status);
      }
    }
  };
  xhr.send();
}

// This function prints the data to the HTML page as an unordered list.
function handleData(response) {
  var sheetDataElement = document.getElementById("sheetData");

  // Create a <ul> element to hold all the <li> items
  var ulElement = document.createElement("ul");

  response.forEach(function(item) {
    // Create a new <li> element
    var listItem = document.createElement("li");

    // Iterate over the keys of the object
    Object.keys(item).forEach(function(key) {
      // Create a new <div> element for each key-value pair
      var divKeyValue = document.createElement("div");
      // Set class name as the key
      divKeyValue.className = key;
      // Set innerHTML as the value
      divKeyValue.innerHTML = item[key];
      // Append the <div> element for the key-value pair to the <li> item
      listItem.appendChild(divKeyValue);
    });

    // Append the <li> element to the <ul> element
    ulElement.appendChild(listItem);
  });

  // Append the <ul> element to the "sheetData" element
  sheetDataElement.appendChild(ulElement);
}



// Example usage:
getData(AppScriptUrl);


