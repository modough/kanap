
const fetchItems = async (Url) => {
    await fetch(Url)
    .then((res) => res.json())
    .then((data) => {
       displayItems(data);
           
    })    
};

const displayItems = (itemsData) => {
  
    
    for (let i = 0; i < itemsData.length; i++) {
        let myItemId = document.createElement("a");
        let myItemArticle = document.createElement("article");
        let myItemImage = document.createElement("img");
        let myItemName = document.createElement("h3");
        let myItemParagraph = document.createElement("p");

        let items = document.getElementById("items");
        items.append(myItemId);
        myItemId.append(myItemArticle);
        myItemArticle.append(myItemImage, myItemName, myItemParagraph);

        myItemId.href = `./product.html?id=${itemsData[i]._id}`;
        myItemImage.src = itemsData[i].imageUrl;
        myItemName.textContent = itemsData[i].name;
        myItemName.className = 'productName';
        myItemParagraph.textContent = itemsData[i].description;
        myItemParagraph.className = 'productDescription';
    }    
};

fetchItems("http://localhost:3000/api/products");