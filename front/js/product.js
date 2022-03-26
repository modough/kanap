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
    let myAddToCartButton = document.getElementById("addToCart")
    
    let myImgDiv = document.querySelector(".item__img");
    let myTitleDiv = document.querySelector(".item__content__titlePrice");
    let myDescriptionDiv = document.querySelector(".item__content__description");
    let myColorDiv =document.querySelector(".item__content .item__content__settings .item__content__settings__color")
    let myQuantityDiv = document.querySelector(".item__content .item__content__settings .item__content__settings__quantity");
    let myButtonDiv = document.querySelector(".item__content__addButton")

    myImgDiv.appendChild(myElementImage);
    myTitleDiv.appendChild(myElementTitle, myElementPrice);
    myDescriptionDiv.appendChild(myElementDescription);
    myColorDiv.appendChild(myElementcolor);
    myQuantityDiv.appendChild(myElementQuantity);
    myButtonDiv.appendChild(myAddToCartButton)

    myElementImage.src = elementData.imageUrl;
    myElementTitle.textContent = elementData.name;
    myElementPrice.textContent = elementData.price;
    myElementDescription.textContent = elementData.description; 
    myAddToCartButton.id = elementData._id  
    
    elementData.colors.forEach((color) => {
        let myColorOption = document.createElement("option");
        myColorOption.innerHTML = `${color}`;
        myColorOption.value = `${color}`;
        myElementcolor.appendChild(myColorOption);
        
    });
   
    const addToCart = () => {
        myAddToCartButton.addEventListener("click", ()=>{
            let elementArray = JSON.parse(localStorage.getItem("element"))
            let select = document.getElementById("colors")
            console.log(select)
            console.log(elementArray)

            const colorAndQuantitySelected = Object.assign({}, elementData,{
                colorSelected: `${select.value}`,
                quantity: 1
            })
            console.log(colorAndQuantitySelected)

            if(elementArray == null){
                elementArray = []
                elementArray.push(elementData)
                console.log(elementArray)
                localStorage.setItem("element",JSON.stringify(colorAndQuantitySelected))

            }else if (elementArray != null){
                for(let i in elementArray){
                    console.log("test")
                    
                    if(elementArray[i]._id == elementData._id && 
                        elementArray[i].colorSelected == select.value

                        ){return(
                            // on change juste la quantite
                            elementArray[i].quantity++,
                            console.log("quant"),
                            localStorage.setItem("element", JSON.stringify(elementArray)),
                            (elementArray = JSON.parse(localStorage.getItem("element")))
                            
                        )
                    }
                }

            }
        })
        return (elementArray = JSON.parse(localStorage.getItem("element")))
    }
   addToCart(elementData)  
};

fetchElement(`http://localhost:3000/api/products/${elementId}`);


