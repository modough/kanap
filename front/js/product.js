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
    let myElementQuantity = document.getElementById("quantity");
    let myImgDiv = document.querySelector(".item__img");
    let myTitleDiv = document.querySelector(".item__content__titlePrice");
    let myDescriptionDiv = document.querySelector(".item__content__description");
    let colorSelect = document.getElementById("colors");
    for(let i in elementData.colors){
        colorSelect.innerHTML += `<option>${elementData.colors[i]}</option>`;
    };
    let colorSelectDiv = document.querySelector(".item__content__settings__color");
    let myColorAndQuantityDiv = document.querySelector(".item__content__settings");

    myImgDiv.appendChild(myElementImage);
    myTitleDiv.appendChild(myElementTitle, myElementPrice);
    myDescriptionDiv.appendChild(myElementDescription);
    myColorAndQuantityDiv.appendChild(colorSelectDiv, myElementQuantity);
    myElementImage.src = elementData.imageUrl;
    myElementTitle.textContent = elementData.name;
    myElementPrice.textContent = elementData.price;
    myElementDescription.textContent = elementData.description;  
       
};

fetchElement();
