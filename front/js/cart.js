const fetchItems = async (Url) => {
    await fetch(Url)
    .then((res) => res.json())
    .then((data) => {
       displayItemsInCart(data);
           
    })    
};

fetchItems("http://localhost:3000/api/products");

const displayItemsInCart = (cartData) => {
    let i=0; i<cartData.length; i++;
    let myCartItemArticle = document.createElement("article");
    let myCartItemImage = document.createElement("img");
    let myCartItemName = document.createElement("h2");
    let myCartItemColor = document.createElement("p");
    let myCartItemPrice = document.createElement("p");
    let myCartItemQuantity = document.createElement("p");
    let myCartItemdeleted = document.createElement("p");

    let myCartSection = document.getElementById("cart__items");
    myCartSection.appendChild(myCartItemArticle);
    let myCartItemImageDiv = document.createElement("div");
    
    let myCartItemNameColorDiv = document.createElement("div");
    myCartItemArticle.appendChild(myCartItemImageDiv, myCartItemNameColorDiv, myCartItemQuantity, myCartItemdeleted);
    myCartItemImageDiv.appendChild(myCartItemImage);
   
    myCartItemNameColorDiv.appendChild(myCartItemName, myCartItemColor, myCartItemPrice);


    myCartItemImage.src = cartData[i].imageUrl;
    myCartItemName.textContent = cartData[i].name;
    myCartItemColor.textContent = cartData[i].colors;
    myCartItemPrice.textContent = cartData[i].price;
    myCartItemArticle.className = "cart__item";
    myCartItemImageDiv.className = "cart__item__img";
    
    myCartItemNameColorDiv.className = "cart__item__content__description";


};

