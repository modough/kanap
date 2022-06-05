//---------------------------
// retrieve data from main page
const fetchElement = (Url) => {
   fetch(Url)
    .then((res) => res.json())
    .then((data) => {
       displayElement(data)
             
    })    
}
//--------------------------------------
// insert selected article details on page
let elementId = window.location.search.replace("?id=", "")
//-------------------------------------------------
const displayElement = (elementData) => {
    let myElementImage = document.createElement("img")
    let myElementTitle = document.getElementById("title")
    let myElementPrice = document.getElementById("price")
    let myElementDescription = document.getElementById("description")
    let myElementColor = document.getElementById("colors")
    let myElementQuantity = document.getElementById("quantity")
    let myAddToCartButton = document.getElementById("addToCart")
    
    let myImgDiv = document.querySelector(".item__img")
    let myTitleDiv = document.querySelector(".item__content__titlePrice")
    let myDescriptionDiv = document.querySelector(".item__content__description")
    let myColorDiv =document.querySelector(".item__content__settings__color")
    let myQuantityDiv = document.querySelector(".item__content__settings__quantity")
    let myButtonDiv = document.querySelector(".item__content__addButton")

    myImgDiv.appendChild(myElementImage)
    myTitleDiv.appendChild(myElementTitle, myElementPrice)
    myDescriptionDiv.appendChild(myElementDescription)
    myColorDiv.appendChild(myElementColor)
    myQuantityDiv.appendChild(myElementQuantity)
    myButtonDiv.appendChild(myAddToCartButton)
    myElementQuantity.value = "1"
    myElementImage.src = elementData.imageUrl
    myElementImage.alt = elementData.altTxt
    myElementTitle.textContent = elementData.name
    myElementPrice.textContent = elementData.price
    myElementDescription.textContent = elementData.description
    myAddToCartButton.id = elementData._id 
    //-----------------------------
    // select color
    elementData.colors.forEach((color) => {
        let myColorOption = document.createElement("option")
        myColorOption.innerHTML = `${color}`
        myColorOption.value = `${color}`
        myElementColor.appendChild(myColorOption)    
    })
   
    const addToCart = () => {
        myAddToCartButton.addEventListener("click", ()=>{
            
            myAddToCartButton.innerHTML = "Article ajouté"    
            myAddToCartButton.style.color = "lightgreen"
            //--------------------------
            // translate data of the new table in LS
            let elementArray = JSON.parse(localStorage.getItem("element"))
            
            myElementColor = document.getElementById("colors")
            
            //--------------------------------
            // add color and quantity value
            const colorAndQuantitySelected = Object.assign({}, elementData,{
                color: `${myElementColor.value}`,
                quantity:`${myElementQuantity.value}`    
            })
            
            //------------------------
            // Si couleur non selectionnée ou quantite inferieur ou égale à zéro ou même vide rien ne sera pushé dans le LS
            if(colorAndQuantitySelected.color == "" || 
            colorAndQuantitySelected.quantity <= 0 || colorAndQuantitySelected.quantity == ""){
                myAddToCartButton.innerHTML = "Choisir options"  
                myAddToCartButton.style.color = "grey"  
            }
            //---------------
            // si LS vide pusher les nouvelles données dans la nouvelle table du LS
            else if(elementArray == null){
                elementArray = []
                elementArray.push(colorAndQuantitySelected)
                //--------------------
                //translate data into json characters for lighter storage
                localStorage.setItem("element",JSON.stringify(elementArray))   
            }

            // ---------------------------
            // produit ajouté dans le panier avec la même couleur, nombre d’exemplaires ajusté.
            else if (elementArray != null){
                for(let i in elementArray){
                    
                    if(elementArray[i]._id == elementData._id && 
                        elementArray[i].color == myElementColor.value){   
                        return(
                        //--------------------------
                        // quantity incremented
                        elementArray[i].quantity+= myElementQuantity.value,
                        localStorage.setItem("element", JSON.stringify(elementArray)),
                        elementArray = JSON.parse(localStorage.getItem("element"))    
                        )
                    }
                }
                // -------------------------------
                // produit ajouté plusieurs fois mais avec des couleurs différentes, apparition en plusieurs lignes distinctes
                for(let i in elementArray){
                    if(elementArray[i]._id == elementData._id && 
                        elementArray[i].color != myElementColor.value || 
                        elementArray[i]._id != elementData._id){
                        return(
                            elementArray.push(colorAndQuantitySelected),
                            localStorage.setItem("element",JSON.stringify(elementArray)),
                            elementArray = JSON.parse(localStorage.getItem("element"))    
                        )
                    }
                }
            }       
        })
        return (
            elementArray = JSON.parse(localStorage.getItem("element"))   
        )   
    }
    addToCart(elementData)       
}
fetchElement(`http://localhost:3000/api/products/${elementId}`)



