let Url = new URL(window.location.href)
let elementId = Url.searchParams.get("id")
const orderId = document.getElementById("orderId")
orderId.textContent = elementId

localStorage.clear()