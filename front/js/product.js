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
    let myAddToCartButton = document.getElementById("addToCart");
    
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

    for ( let i = 0; i < myElementQuantity.length; i+=1){
        let input = myElementQuantity[i];
        input.addEventlistener('change', quantityChanged);   
    };

    function quantityChanged(e) {
        let input = e.target;
        
        if(isNaN(input.value) || input.value <= 0 || input.value > 100){
            input.value = 1;
            console.log(input.value)
        }
    };
    
    for (let i =0 ;i < myAddToCartButton; i+=1) {
        let button = myAddToCartButton[i]
        button.addEventlistener('click', addToCart)
    }
    function addToCart(e){
        let button = e.target
    }
    

    
};

fetchElement(`http://localhost:3000/api/products/${elementId}`);
