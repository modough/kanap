let product = []
//-------------------------------------------
// retrieve data from LS
let elementFromLocalStorage = JSON.parse(localStorage.getItem("element"))
console.log(elementFromLocalStorage)

const displayCartElement = async() => {
    if(elementFromLocalStorage){
        await elementFromLocalStorage
        for(let i in elementFromLocalStorage){
            //------------------------------------------------
            // creating elements
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
            cartQuantityInput.setAttribute("data-color", elementFromLocalStorage[i].color)
            cartContentSettingQuantityDiv.className = "cart__item__content__settings__quantity"
            cartContentSettingDeleteDiv.append(cartDeleteButton)
            cartContentSettingDeleteDiv.className = "cart__item__content__settings__delete"
            cartDeleteButton.className = "deleteItem"
            cartDeleteButton.innerHTML = "Supprimer"
            cartDeleteButton.setAttribute("data-id", elementFromLocalStorage[i]._id)
            cartDeleteButton.setAttribute("data-color", elementFromLocalStorage[i].color)
            //------------------------------------------------
            // set elements on matched div
            cartElementImage.src = elementFromLocalStorage[i].imageUrl
            cartElementName.textContent = elementFromLocalStorage[i].name
            cartElementColor.innerHTML = elementFromLocalStorage[i].color
            cartElementPrice.innerHTML= elementFromLocalStorage[i].price + " "+"€"
            cartQuantityInput.value = elementFromLocalStorage[i].quantity      
        }
        changeQuantity() 
        removeArticle()
        return
    }
}
displayCartElement()
//---------------------------------------------------------------
// add or dim articles's quantity using up and down input arrow
const changeQuantity = () =>{
    let addQuantityButton = document.querySelectorAll(".itemQuantity");
    addQuantityButton.forEach( (moreQuantity, index) => {
        moreQuantity.addEventListener("change", (changeQuantity))    
        elementFromLocalStorage[index].quantity = moreQuantity.value     
        localStorage.setItem("element",JSON.stringify(elementFromLocalStorage))
        grandTotal()     
    })
}
//---------------------------------
// display total articles in cart
const grandTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    for (item of elementFromLocalStorage) {
      totalQuantity += parseInt(item.quantity)
      totalPrice += item.price * item.quantity
    }
    document.querySelector("#totalQuantity").innerHTML = totalQuantity
    document.querySelector("#totalPrice").innerHTML = totalPrice    
}
//-----------------------------------------
//remove articles from cart
const removeArticle = () =>{
    let removeArticleButton = document.querySelectorAll(".deleteItem")
    console.log(removeArticleButton)
    removeArticleButton.forEach((article)=>{
        article.addEventListener("click", ()=>{
            console.log(article)
            let articleToRemove = elementFromLocalStorage.length
            console.log(articleToRemove)
            if(articleToRemove == 1) {
                return product.splice(0,1),
                localStorage.setItem("element", JSON.stringify(product)),

                console.log("remove all")
            }else{
                product = elementFromLocalStorage.filter(element => {
                    if(article.dataset.id != element._id || article.dataset.color != element.color){
                        return true   
                    }
                })
                console.log(product) 
                localStorage.setItem("element", JSON.stringify(product)) 
                product = JSON.parse(localStorage.getItem("element"))
                product = document.querySelectorAll(".cart__item")
                console.log("remove the clicked article")    
            }        
        })  
    })
    return
}    

    














   


   















