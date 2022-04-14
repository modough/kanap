//-------------------------------------------
// retrieve data from LS
const displayCartElement = () => {
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
        moreQuantity.addEventListener("change", ()=>{
            const articlesFromLocalStorage = JSON.parse(localStorage.getItem("element"))
            articlesFromLocalStorage[index].quantity = moreQuantity.value     
            localStorage.setItem("element",JSON.stringify(articlesFromLocalStorage))
            grandTotal(articlesFromLocalStorage)
        })                   
    })
}
//---------------------------------
// Display total articles in cart
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
//Remove articles from cart
let product = []
const removeArticle =  () =>{
    let removeArticleButton = document.querySelectorAll(".deleteItem")
    console.log(removeArticleButton)
    removeArticleButton.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            alert("Article supprimé")
            console.log(btn)
            
            const articlesFromLocalStorage = JSON.parse(localStorage.getItem("element"))
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

//----------------------------------------------
/* Form  */
function Form() {

    let inputs = document.querySelectorAll("input");
    //---------------------------------------------------------
    // Errors
    const errorMessage = (tag, message, valid) => {
      const showErrorMessage = document.querySelector("#" + tag + "ErrorMsg");
      if (!valid) {
        showErrorMessage.textContent = message;
      } else {
        showErrorMessage.textContent = "";
      }
    };
    //------------------------------------------------------
    // Validation 
    const firstNameInput = (value) => {
      if (value.length > 0 && (value.length < 2 || value.length > 20)) {
        errorMessage(
          "firstName",
          "Non valide"
        );
        firstName = null;
      } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
        errorMessage(
          "firstName",
          "Non valide"
        );
        firstName = null;
      } else {
        errorMessage("firstName", "", true);
        firstName = value;
      }
    };
  
    const lastNameInput = (value) => {
      if (value.length > 0 && (value.length < 2 || value.length > 20)) {
        errorMessage(
          "lastName",
          "Non valide"
        );
        lastName = null;
      } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
        errorMessage(
          "lastName",
          "Non valide"
        );
        lastName = null;
      } else {
        errorMessage("lastName", "", true);
        lastName = value;
      }
    };
  
    const addressInput = (value) => {
      if (value.length > 0 && (value.length < 2 || value.length > 50)) {
        errorMessage(
          "address",
          "Non valide"
        );
        address = null
      }else {
        errorMessage("address", "", true)
        address = value
      }
    }
  
    const cityInput = (value) => {
      if (value.length > 0 && (value.length < 2 || value.length > 20)) {
        errorMessage(
          "city",
          "Non valide"
        );
        city = null
      } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
        errorMessage(
          "city",
          "Non valide"
        );
        city = null;
      } else {
        errorMessage("city", "", true);
        city = value;
      }
    };
  
    const emailInput = (value) => {
      if (!value.match(/^[\w._-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorMessage("email", "Le mail n'est pas valide");
        email = null;
      } else {
        errorMessage("email", "", true);
        email = value;
      }
    };
    //--------------------------------------------------
    // Listening inputs 
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            for (let i in inputs){
                firstNameInput[i] = firstName.value
                lastNameInput[i] = lastName.value
                addressInput[i] = address.value
                cityInput[i] = city.value
                emailInput[i] = email.value
            }
        })
    })
}
Form()
 //------------------------------------------------- 
// Starting sending Process   
const sendForm = () => {
   const orderBtn = document.getElementById("order")
    orderBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (product !== null) {
            let orderProducts = []
            for (let i in product) {
                orderProducts.push(product[i].userProductId)
            }
            //------------------------------------------------------
            // Construction des elements à envoyer
            let contact = {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                email: email
            }
            let products = orderProducts
            //----------------------------------------------------
            // Requête POST
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
                // Renvoi de l'orderID dans l'URL
                document.location.href = "confirmation.html?id=" + data.orderId;
            })
            .catch()
        }
    })
}
sendForm();



/*let form = document.querySelector(".cart__order__form")

form.firstName.addEventListener('change', ()=>{
    validFirstName()
    
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
form.email.addEventListener('change', (e)=>{
    validEmail(this) 
    
        
})



let firstNameInput = document.getElementById("firstName").value
const validFirstName = (firstNameInput)=>{
    let errorMessage = document.getElementById("firstNameErrorMsg")
    firstNameInput = document.getElementById("firstName").value
    if(!isNaN(firstNameInput)){
        errorMessage.innerHTML = "Non valide"
        console.log(firstNameInput)
    }else{
        errorMessage.innerHTML = ""
    }
    console.log(firstNameInput)
}
let lastNameInput = document.getElementById("lastName").value
const validlastName = (lastNameInput)=>{
    lastNameInput = document.getElementById("lastName").value
    let errorMessage = document.getElementById("lastNameErrorMsg")
    if(!isNaN(lastNameInput)){
        errorMessage.innerHTML = "Non valide"
    }else{
        errorMessage.innerHTML = ""    
    }
}
let addressInput = document.getElementById("address").value
const validAddress = (addressInput)=>{
    addressInput = document.getElementById("address").value
    let errorMessage = document.getElementById("addressErrorMsg")
    if(addressInput.length > 10){
        errorMessage.innerHTML = ""
    }else{
        errorMessage.innerHTML = "Veuillez renseigner une adresse valide"
    }
}
let cityInput = document.getElementById("city").value
const validCity = (cityInput)=>{
    cityInput = document.getElementById("city").value
    let errorMessage = document.getElementById("cityErrorMsg")
    
    if(cityInput.length <= 1){
        errorMessage.innerHTML = "Non valide"
        console.log(cityInput)
    }else{
        errorMessage.innerHTML = ""
    }
}
let emailInput = document.getElementById("email").value
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

let contact = {
    firstName: firstNameInput,
    lastName: lastNameInput,
    address: addressInput,
    city: cityInput,
    email: emailInput
}



let orderBtn = document.getElementById("order").addEventListener("click", (e)=>{
    e.preventDefault()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify({contact, products}),
        Headers: {"content-type": "application/json"}   
    })
    .then((res)=>res.json())  
    .then((data)=>{
        
        document.location.href = "confirmation.html?id=" + data.orderId
    })  

})*/


/*let orderId = undefined
let order = document.getElementById("order")
order.addEventListener("click", ()=>{
    order.textContent = "Commande validée"
    order.style.color = "lightgreen"
    document.getElementById("orderId").innerHTML = orderId
    orderId = window.location.search.replace("?", "")
    fetch("http://localhost:3000/api/products/order",{
            method: "POST",
            body: JSON.stringify({contact, products}),
            Headers: {"content-type": "application/json"}
        }) 
        .then((res)=>res.json())  
        .then((data)=>{
            return orderId = data.order
        })  
    console.log(contact)
    alert("Commande envoyée")
    localStorage.clear()

    location.href = "confirmation.html?" + orderId + "#orderId"  
})*/
















   

    














   


   















