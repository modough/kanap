let elementFromLocalStorage = JSON.parse(localStorage.getItem("element"))
console.log(elementFromLocalStorage)

const displayCartElement = async() => {
    
    if(elementFromLocalStorage){
        await elementFromLocalStorage
        console.log(elementFromLocalStorage)
        for(let i in elementFromLocalStorage){
            let cartElementArticle = document.createElement("article")
            let cartElementImage = document.createElement("img")
            let cartElementName = document.createElement("h2")
            let cartElementColor = document.createElement("p")
            let cartElementPrice = document.createElement("p")
            let cartQuantityText = document.createElement("p")
            let cartQuantityInput = document.createElement("input")
            let cartDeleteButton = document.createElement("p")
            let cartElementImageDiv = document.createElement("div")
            let cartElementContentDiv = document.createElement("div")
            let cartElementContentDescriptionDiv = document.createElement("div")
            let cartContentSettingDiv = document.createElement("div")
            let cartContentSettingQuantityDiv = document.createElement("div")
            let cartContentSettingDeleteDiv = document.createElement("div")

            let cartElementSection = document.getElementById("cart__items")

            cartElementSection.appendChild(cartElementArticle)
            cartElementArticle.append(cartElementImageDiv, cartElementContentDiv, cartContentSettingDiv)
            cartElementArticle.className = "cart__item"
            
            cartElementImageDiv.appendChild(cartElementImage)
            cartElementImageDiv.className = "cart__item__img"
            cartElementContentDiv.append(cartElementContentDescriptionDiv, cartContentSettingDiv)
            cartElementContentDiv.className = "cart__item__content"
            cartElementContentDescriptionDiv.append(cartElementName, cartElementColor, cartElementPrice)
            cartElementContentDescriptionDiv.className = "cart__item__content__description"
            cartElementPrice.className = "cart__item__price"
            cartContentSettingDiv.append(cartContentSettingQuantityDiv, cartContentSettingDeleteDiv)
            cartContentSettingDiv.className ="cart__item__content__settings"
            cartContentSettingQuantityDiv.append(cartQuantityText, cartQuantityInput)
            cartQuantityText.innerHTML = "Qté :"
            cartQuantityInput.className = "itemQuantity"
            cartQuantityInput.name = "itemQuantity"
            cartQuantityInput.min = "1"
            cartQuantityInput.max = "100"
            cartQuantityInput.value = "1"
            cartQuantityInput.type = "number"
            cartQuantityInput.setAttribute("data-id", elementFromLocalStorage[i]._id)
            cartQuantityInput.setAttribute("data-color", elementFromLocalStorage[i].colorSelected)
            cartContentSettingQuantityDiv.className = "cart__item__content__settings__quantity"
            cartContentSettingDeleteDiv.append(cartDeleteButton)
            cartContentSettingDeleteDiv.className = "cart__item__content__settings__delete"
            cartDeleteButton.className = "deleteItem"
            cartDeleteButton.innerHTML = "Supprimer"

            cartElementImage.src = elementFromLocalStorage[i].imageUrl
            cartElementName.textContent = elementFromLocalStorage[i].name
            cartElementColor.textContent = elementFromLocalStorage[i].colorSelected 
            cartElementPrice.innerHTML= elementFromLocalStorage[i].price * elementFromLocalStorage[i].quantity + " "+"€"
            cartQuantityInput.value = elementFromLocalStorage[i].quantity    

           

           
        }
        changeQuantity()
        return
    }else{
        document.getElementById("addToCart").addEventListener("click",()=>{
            alert("Vous n'avez aucun article dans votre panier !")
        })
    }
}
displayCartElement()



const changeQuantity = () =>{
    let addQuantityButton = document.querySelectorAll(".itemQuantity");
    addQuantityButton.forEach( (moreQuantity, index) => {
        moreQuantity.addEventListener("change", (event) => {
          event.preventDefault();
          if(elementFromLocalStorage[index]._id === moreQuantity.dataset.id 
             && elementFromLocalStorage[index].colorSelected === moreQuantity.dataset.color)  
          {
            return( elementFromLocalStorage[index].quantity = moreQuantity.value,
            
            localStorage.setItem("element",JSON.stringify(elementFromLocalStorage)),
            document.querySelectorAll(".itemQuantity")[index].value = elementFromLocalStorage[index].quantity),
            document.getElementById("totalQuantity").innerHTML += elementFromLocalStorage.quantity
           
          }
         
        })
    })
}
function recalc() {
    let cart = JSON.parse(localStorage.getItem("element"));
    let quantity = 0;
    let total = 0;
    for (article of cart) {
      quantity += parseInt(article.quantity);
      total += parseFloat(article.price) * parseInt(article.quantity);
    }
    localStorage.setItem("element",JSON.stringify(cart)),
    document.getElementById("totalQuantity").innerHTML = quantity;
}
recalc()   


   















