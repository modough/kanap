let itemsData = [];

const fetchItems = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        itemsData = promise;
           
    })    
};

const displayItems = async () => {
    await fetchItems();
    
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
        myItemParagraph.textContent = itemsData[i].description
    }    
};

displayItems();