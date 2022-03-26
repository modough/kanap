let elementFromLocalStorage = JSON.parse(localStorage.getItem("element"))
console.log(elementFromLocalStorage)

const displayCartElement = async () => {
    console.log("hello")
    if(elementFromLocalStorage){
        await elementFromLocalStorage
        console.log("coucou")

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
        cartElementContentDiv.append(cartElementContentDescriptionDiv)
        cartElementContentDiv.className = "cart__item__content"
        cartElementContentDescriptionDiv.append(cartElementName, cartElementColor, cartElementPrice)
        cartElementContentDescriptionDiv.className = "cart__item__content__description"
        cartContentSettingDiv.append(cartContentSettingQuantityDiv, cartContentSettingDeleteDiv)
        cartContentSettingDiv.className ="cart__item__content__settings"
        cartContentSettingQuantityDiv.append(cartQuantityText, cartQuantityInput)
        cartContentSettingQuantityDiv.className = "cart__item__content__settings__quantity"
        cartContentSettingDeleteDiv.append(cartDeleteButton)
        cartContentSettingDeleteDiv.className = "cart__item__content__settings__delete"
        cartDeleteButton.className = "deleteItem"

        cartElementImage.src = elementFromLocalStorage.imageUrl
        cartElementName.textContent = elementFromLocalStorage.name
        cartElementColor.textContent = elementFromLocalStorage.colorSelected 
        cartElementPrice.textContent = elementFromLocalStorage.cartElementPrice
        cartQuantityInput.textContent = elementFromLocalStorage.quantity



    }else{
        document.getElementById("addToCart").addEventListener("click",()=>{
            alert("Veuillez ajoutez des produits au panier")

        })
    }
}
displayCartElement()

