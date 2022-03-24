const fetchElement = async (Url) => {
    await fetch(Url)
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
    let myElementcolor = document.getElementById("colors");
    let myElementQuantity = document.getElementById("quantity");
    
    let myImgDiv = document.querySelector(".item__img");
    let myTitleDiv = document.querySelector(".item__content__titlePrice");
    let myDescriptionDiv = document.querySelector(".item__content__description");
    let myColorDiv =document.querySelector(".item__content .item__content__settings .item__content__settings__color")
    let myQuantityDiv = document.querySelector(".item__content .item__content__settings .item__content__settings__quantity");

    myImgDiv.appendChild(myElementImage);
    myTitleDiv.appendChild(myElementTitle, myElementPrice);
    myDescriptionDiv.appendChild(myElementDescription);
    myColorDiv.appendChild(myElementcolor);
    myQuantityDiv.appendChild(myElementQuantity);

    myElementImage.src = elementData.imageUrl;
    myElementTitle.textContent = elementData.name;
    myElementPrice.textContent = elementData.price;
    myElementDescription.textContent = elementData.description;   
    
    elementData.colors.forEach((color) => {
        let myColorOption = document.createElement("option");
        myColorOption.innerHTML = `${color}`;
        myColorOption.value = `${color}`;
        myElementcolor.appendChild(myColorOption);
        
    });
};

fetchElement(`http://localhost:3000/api/products/${elementId}`);
