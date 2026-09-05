
if(!localStorage.getItem("username")){
    window.location = "login.html";
}
const allProducts = document.querySelector(".productsc");
const favSection = document.querySelector("#favorite-section");
let cartProducts =

JSON.parse( localStorage.getItem("ProductsInCart")) || [];

let favProducts = JSON.parse( localStorage.getItem("ProductsInFav")) || [];

function drawCartProducts(){
    if(cartProducts.length === 0){
        allProducts.innerHTML = "<h4 style='color:white'>Your Carts Is Empty!</h4>";
    } else {
        allProducts.innerHTML = cartProducts.map(item => {
            if (!item.quantity) item.quantity = 1;
            let itemTotalPrice = item.price * item.quantity;

            return `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <img src="${item.imageUrl}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h2>${item.title}</h2>
                        <span>${item.p}</span>
                        <p class="cart-price">Price: ${itemTotalPrice} EGP</p>
                        <p style="color:#aaa; font-size:13px; margin-top:5px;">Qty: ${item.quantity}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center; margin-right: 15px;">
                    <button onclick="changeCartQty(${item.id}, 1)" style="background:#c5a880; border:none; color:#000; font-weight:bold; cursor:pointer; width:26px; height:26px; border-radius:4px; font-size:15px;">+</button>
                    <button onclick="changeCartQty(${item.id}, -1)" style="background:#e74c3c; border:none; color:#fff; font-weight:bold; cursor:pointer; width:26px; height:26px; border-radius:4px; font-size:15px;">-</button>
                </div>
                <button class="btn2 btn20 btn-remove-cart" onclick="removeFromCart(${item.id})">
                    Remove From Cart
                </button>
            </div>
            `;
        }).join("");
    }
    updateTotalPrice();
    updateCartBadge();
}
function changeCartQty(id, change) {
    let item = cartProducts.find((p) => p.id === id);
    if (item) {
        if (!item.quantity) item.quantity = 1;
        item.quantity += change;
               if (item.quantity <= 0) {
            cartProducts = cartProducts.filter((p) => p.id !== id);
        }
        
        localStorage.setItem("ProductsInCart", JSON.stringify(cartProducts));
        drawCartProducts();
    }
}

function updateTotalPrice(){
    let total = cartProducts.reduce((sum, item)=>{
        let qty = item.quantity || 1;
        return sum + (item.price * qty);
    }, 0);

    document.querySelector("#totalPrice").innerHTML = `Total Price : ${total} EGP`;
}


function removeFromCart(id){
    
    cartProducts =
    cartProducts.filter(item =>
    item.id !== id);
    localStorage.setItem(
    "ProductsInCart",
    JSON.stringify(cartProducts)
    );

    drawCartProducts();
}

drawCartProducts();

function updateCartBadge() {
    let badge = document.querySelector(".badge");
    if (badge) {
        if (cartProducts.length > 0) {
            badge.style.display = "block";
            badge.innerHTML = cartProducts.reduce((sum, item) => sum + (item.quantity || 1), 0);
        } else {
            badge.style.display = "none";
        }
    }
}
updateCartBadge();
