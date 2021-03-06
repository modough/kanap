



//-------------------------------------------
// retrieve data from LS
const displayCartElement = async () => {
    
    const elementFromLocalStorage = JSON.parse(localStorage.getItem("element"))
    
    if(elementFromLocalStorage){
        
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
            cartQuantityText.innerHTML = "Qt?? :"
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
            cartQuantityInput.value = elementFromLocalStorage[i].quantity
            
            
            const elementData = await fetchPrice(elementFromLocalStorage[i]._id)
            cartElementPrice.innerHTML= elementData.price + " ???"
            elementFromLocalStorage[i].price = elementData.price
                  
        } 
        grandTotal(elementFromLocalStorage)   
        changeQuantity(elementFromLocalStorage) 
        removeArticle(elementFromLocalStorage) 
         
    }   
}

//-----------------------
// retrieve data from DB and pick the id
const fetchPrice = async (id) =>{
    const Url = "http://localhost:3000/api/products/"+ id
    const dataFromApi = await fetch(Url)
    .then((res) => res.json())
    .then((data) => {
        return data   
    })
    return dataFromApi
}

//---------------------------------------------------------------
// add or dim articles's quantity using up and down input arrow
const changeQuantity = (articles) =>{
    let addQuantityButton = document.querySelectorAll(".itemQuantity")
    //-----------------------
    // foreach execute la fonction callback 1fois pour chaque article
    addQuantityButton.forEach((moreQuantity, index) => {
        moreQuantity.addEventListener("change", ()=>{
            articles[index].quantity = moreQuantity.value   
            grandTotal(articles)
        })                   
    })
}
//---------------------------------
// Display total articles in cart
const grandTotal = (articles) => {
    let totalQuantity = 0
    let totalPrice = 0
    for (item of articles) {
      totalQuantity += Number(item.quantity)
      totalPrice += item.price * item.quantity
    }
    document.querySelector("#totalQuantity").innerHTML = totalQuantity
    document.querySelector("#totalPrice").innerHTML = totalPrice         
}
//-----------------------------------------
//Remove articles from cart
let _products = []
const removeArticle = () =>{
    let removeArticleButton = document.querySelectorAll(".deleteItem")
    removeArticleButton.forEach((btn)=>{
        btn.addEventListener("click", async ()=>{
            articlesInLocalStorage = JSON.parse(localStorage.getItem("element"))
            //------------------
            // filter() nous retourne un nouveau tableau avec tous les elements du tableau d'origine
            _products = articlesInLocalStorage.filter(element => {
                if(btn.dataset.id != element._id || btn.dataset.color != element.color){
                    return true   
                }
            })   
            btn.closest("article").remove()
            localStorage.setItem("element", JSON.stringify(_products))
            changeQuantity()

            for (product of _products) {
                const productFromApi = await fetchPrice(product._id)
                product.price = productFromApi.price
            }
            grandTotal(_products)                 
        })       
    })
    return

}

displayCartElement()

//----------------------------------------------
/* Form  */
const Form = () => {
    let form = document.querySelector(".cart__order__form")

    form.firstName.addEventListener('change', ()=>{
        validFirstName(this)    
    })
    form.lastName.addEventListener('change', ()=>{
        validlastName(this)     
    })
    form.address.addEventListener('change', ()=>{
        validAddress(this)    
    })
    form.city.addEventListener('change', ()=>{
        validCity(this)   
    })
    form.email.addEventListener('change', ()=>{
        validEmail(this)        
    })
    const validFirstName = (firstNameInput)=>{
        let errorMessage = document.getElementById("firstNameErrorMsg")
        firstNameInput = document.getElementById("firstName").value
        let regexFirstName = new RegExp("^[a-zA-Z]+$").test(firstNameInput)
        if(!(regexFirstName)){
            errorMessage.innerHTML = "Non valide"    
        }else{
            errorMessage.innerHTML = ""
        }    
    }
    const validlastName = (lastNameInput)=>{
        lastNameInput = document.getElementById("lastName").value
        let errorMessage = document.getElementById("lastNameErrorMsg")
        let regexLastName = new RegExp("^[a-zA-Z]+$").test(lastNameInput) 
        if(!(regexLastName)){
            errorMessage.innerHTML = "Non valide"
        }else{
            errorMessage.innerHTML = ""    
        }
        
    }
    const validAddress = (addressInput)=>{
        addressInput = document.getElementById("address").value
        let errorMessage = document.getElementById("addressErrorMsg")
        if(addressInput.length > 10){
            errorMessage.innerHTML = ""
        }else{
            errorMessage.innerHTML = "Non valide"
        }
    }
    const validCity = (cityInput)=>{
        cityInput = document.getElementById("city").value
        let errorMessage = document.getElementById("cityErrorMsg")
        if(!isNaN(cityInput) && cityInput.length <= 2){
            errorMessage.innerHTML = "Non valide"
        }else{
            errorMessage.innerHTML = ""
        }
    }
    const validEmail = (emailInput)=>{
        emailInput = document.getElementById("email").value
        let regexEmailInput = new RegExp(/\S+@\S+\.\S+/).test(emailInput)
        let errorMessage = document.getElementById("emailErrorMsg")
        if(regexEmailInput){
            errorMessage.innerHTML = ""
        }else{
            errorMessage.innerHTML = "Non valide"
        }
    }    
}
Form()
//------------------------------------------------- 
// Start sending Process   
const sendForm = () => {
   const orderBtn = document.getElementById("order")
    orderBtn.addEventListener("click", (e) => {
        e.preventDefault();
        //-----------------------------
        // build bought articles as data
        const products = JSON.parse(localStorage.getItem("element")).map((product) => product._id)
        
        //------------------------------------------------------
        // build contact to send as data
        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        }
        //----------------------------------------------------
        //  sending elements
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify({contact, products}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => { 
            //---------------------------------
            // add orderId in url
            document.location.href = "confirmation.html?id=" + data.orderId
        })
        .catch()
        
    })
}
sendForm();
















   

    














   


   















