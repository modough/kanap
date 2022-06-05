const fetchItems = (Url) => {
    fetch("http://localhost:3000/api/order")
    .then((res) => res.json())
    .then((data) => {
       displayItems(data);       
    })    
}
const orderId = document.getElementById("orderId")
let elementId = window.location.search.replace("?id=", "")
orderId.textContent = elementId

localStorage.clear()