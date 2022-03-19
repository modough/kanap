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
    myCartItemArticle.appendChild(myCartItemImage, myCartItemName, myCartItemColor, myCartItemPrice, myCartItemQuantity, myCartItemdeleted);


    myCartItemImage.src = cartData[i].imageUrl;
    mycartItemName.textContent = cartData[i].name;
    myCartItemColor.textContent = cartData[i].colors;
    myCartItemPrice.textContent = cartData[i].price;


};

