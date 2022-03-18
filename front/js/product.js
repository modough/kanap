const fetchElement = async (Url) => {
    await fetch(Url)
    .then((res) => res.json())
    .then((data) => {
       displayElement(data);
       
           
    })    
};

const displayElement = (elementData) => {
   // for (let i = 0; i < elementData.length; i ++){
        let i = 0; i < elementData.length; i ++;

        
        
        let myElementImage = document.createElement("img");
        let myElementTitle = document.createElement("h1");
        let myElementPrice = document.createElement("span")
        let myElementDescription = document.createElement("p");
        let myElementColor = document.createElement("option");
        let myElementQuantity = document.createElement("input");

        let myImgDiv = document.querySelector("div.item__img");
        myImgDiv.appendChild(myElementImage);

        let myTitleDiv = document.querySelector("div.item__content__titlePrice");
        
        let myPriceParagraph = document.querySelector("p");
        myTitleDiv.appendChild(myElementTitle, myPriceParagraph);
        myPriceParagraph.appendChild(myElementPrice);
        let myDescriptionDiv = document.querySelector("div.item__content__description");
        myDescriptionDiv.appendChild(myElementDescription);
        
        
       
        
        
        myElementImage.src = elementData[i].imageUrl;
        myElementTitle.textContent = elementData[i].name;
        myElementPrice.textContent = elementData[i].price;
        myElementDescription.textContent = elementData[i].description;
        myElementColor.textContent = elementData[i].colors;
        

        
    //}
};
fetchElement("http://localhost:3000/api/products");
