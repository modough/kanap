const fetchElement = async (Url) => {
    await fetch(Url)
    .then((res) => res.json())
    .then((data) => {
       displayElement(data);
       console.log(data)
       
           
    })    
};

const displayElement = (elementData) => {
  
    let i = 0; i < elementData.length; i ++;
    let myElementId = document.createElement("a");
    let myElementImage = document.createElement("img");
    let myElementTitle = document.getElementById("title");
    let myElementPrice = document.getElementById("price")
    let myElementDescription = document.getElementById("description");
    let myElementColor = document.createElement("option");
   
    

    let myImgDiv = document.querySelector("div.item__img");
    myImgDiv.appendChild(myElementImage);
    let myTitleDiv = document.querySelector("div.item__content__titlePrice");
    let myPriceParagraph = document.querySelector("p");
    myTitleDiv.appendChild(myElementTitle, myPriceParagraph);
    myPriceParagraph.appendChild(myElementPrice);
    let myDescriptionDiv = document.querySelector("div.item__content__description");
    myDescriptionDiv.appendChild(myElementDescription);
    let colorSelect = document.getElementById("colors");
    colorSelect.appendChild(myElementColor);
    
    
    myElementImage.src = elementData[i].imageUrl;
    myElementTitle.textContent = elementData[i].name;
    myElementPrice.textContent = elementData[i].price;
    myElementDescription.textContent = elementData[i].description;  
    myElementColor.textContent = elementData[i].colors;  
    myElementId.href = elementData[i]._id;
};




fetchElement("http://localhost:3000/api/products");
