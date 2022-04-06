let product = []
//-------------------------------------------
// retrieve data from LS
const displayCartElement = async() => {
    const elementFromLocalStorage = JSON.parse(localStorage.getItem("element"))
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
            cartElementArticle.id = "cart__item"
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
        grandTotal(elementFromLocalStorage)   
        changeQuantity(elementFromLocalStorage) 
        removeArticle(elementFromLocalStorage)  
    }   
}
//---------------------------------------------------------------
// add or dim articles's quantity using up and down input arrow
const changeQuantity = () =>{
    let addQuantityButton = document.querySelectorAll(".itemQuantity")
    addQuantityButton.forEach( (moreQuantity, index) => {
        moreQuantity.addEventListener("change", async()=>{
            const articlesFromLocalStorage = await JSON.parse(localStorage.getItem("element"))
            articlesFromLocalStorage[index].quantity = moreQuantity.value     
            localStorage.setItem("element",JSON.stringify(articlesFromLocalStorage))
            grandTotal(articlesFromLocalStorage)
        })                   
    })
}
//---------------------------------
// display total articles in cart
const grandTotal = (articles) => {
    let totalQuantity = 0
    let totalPrice = 0
    for (item of articles) {
      totalQuantity += parseInt(item.quantity)
      totalPrice += item.price * item.quantity
    }
    document.querySelector("#totalQuantity").innerHTML = totalQuantity
    document.querySelector("#totalPrice").innerHTML = totalPrice         
}
//-----------------------------------------
//remove articles from cart
const removeArticle =  () =>{
    let removeArticleButton = document.querySelectorAll(".deleteItem")
    console.log(removeArticleButton)
    removeArticleButton.forEach((btn)=>{
        btn.addEventListener("click", async ()=>{
            alert("Article supprimé")
            console.log(btn)
            
            const articlesFromLocalStorage = await JSON.parse(localStorage.getItem("element"))
            product = articlesFromLocalStorage.filter(element => {
                if(btn.dataset.id != element._id || btn.dataset.color != element.color){
                    return true   
                }
            })
            console.log(product)  
            console.log("remove the clicked article")   
            btn.closest("article").remove()
            localStorage.setItem("element", JSON.stringify(product))
            
            changeQuantity()
            grandTotal(product)           
        })       
    })
    return 
}
displayCartElement()











   

    














   


   















