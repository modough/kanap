const fetchElement = async () => {
    await fetch(`http://localhost:3000/api/products/${elementId}`)
    .then((res) => res.json())
    .then((data) => {
       displayElement(data);       
    })    
};

let elementId = window.location.search.replace("?id=", "");

const displayElement = (elementData) => {
    
    let myElementImage = document.createElement("img");
    let myElementTitle = document.getElementById("title");
    let myElementPrice = document.getElementById("price")
    let myElementDescription = document.getElementById("description");
    let myElementColor = document.createElement("option");
    
    let myImgDiv = document.querySelector(".item__img");
    myImgDiv.appendChild(myElementImage);
    let myTitleDiv = document.querySelector(".item__content__titlePrice");
    myTitleDiv.appendChild(myElementTitle, myElementPrice);
    let myDescriptionDiv = document.querySelector(".item__content__description");
    myDescriptionDiv.appendChild(myElementDescription);
    let colorSelect = document.getElementById("colors");
    colorSelect.appendChild(myElementColor);
    
    myElementImage.src = elementData.imageUrl;
    myElementTitle.textContent = elementData.name;
    myElementPrice.textContent = elementData.price;
    myElementDescription.textContent = elementData.description;  
    myElementColor.textContent = elementData.colors;     
};

fetchElement();
